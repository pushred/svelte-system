import { readFileSync } from 'fs'
import { dirname, join } from 'path'

import { Config } from '@svelte-system/types/validation.js'
import '@testing-library/jest-dom'
import { cosmiconfigSync } from 'cosmiconfig'
import del from 'del'
import { assert, StructError } from 'superstruct'

import { propUsageCache } from '../caches'
import { generateStylesheet } from './generateStylesheet.js'

jest.mock('@svelte-system/props/lib/propsByCategory.js', () => {
  return {
    propsByCategory: {
      flex: [
        {
          alias: 'justify',
          name: 'justifyContent',
          values: ['left', 'right'],
        },
      ],
      space: [
        {
          alias: 'mt',
          name: 'marginTop',
          scale: 'space',
        },
        {
          alias: 'mb',
          name: 'marginBottom',
          scale: 'space',
        },
      ],
    },
  }
})

const mockConfig = cosmiconfigSync().search().config

const stylesheetOutputDir = dirname(mockConfig.stylesheetPath)
const optimizedStylesheetOutputPath = join(stylesheetOutputDir, 'optimized.css')

let generatedStylesheet
let optimizedStylesheet

beforeAll(() => {
  try {
    assert(mockConfig, Config)
  } catch (err) {
    if (!(err instanceof StructError)) return console.error(err)
    console.error('Mock configuration is invalid')
    console.dir(err, { depth: null })
    return
  }

  generateStylesheet({
    outputPath: mockConfig.stylesheetPath,
    theme: mockConfig.theme,
  })

  generatedStylesheet = readFileSync(mockConfig.stylesheetPath, 'utf-8')

  // optimized stylesheet

  propUsageCache.clear()

  propUsageCache.set('justify', {
    componentA: {
      all: new Set(['left']),
    },
  })

  propUsageCache.set('mt', {
    componentA: {
      all: new Set(['1']),
    },
  })

  generateStylesheet({
    optimize: true,
    outputPath: optimizedStylesheetOutputPath,
    theme: mockConfig.theme,
  })

  optimizedStylesheet = readFileSync(optimizedStylesheetOutputPath, 'utf-8')
})

afterAll(async () => {
  await del(stylesheetOutputDir)
})

test('creates a class for each scale increment', () => {
  expect(generatedStylesheet).toEqual(expect.stringContaining('mt-1'))
  expect(generatedStylesheet).toEqual(expect.stringContaining('mt-2'))
})

test('creates a class for each value style', () => {
  expect(generatedStylesheet).toEqual(expect.stringContaining('justify-left'))
  expect(generatedStylesheet).toEqual(expect.stringContaining('justify-right'))
})

test('does not generate classes for unused props', () => {
  expect(optimizedStylesheet).not.toEqual(expect.stringContaining('mb-1'))
})

test('does not generate classes for unused prop values', () => {
  expect(optimizedStylesheet).toEqual(expect.stringContaining('justify-left'))
  expect(optimizedStylesheet).toEqual(expect.stringContaining('mt-1'))
  expect(optimizedStylesheet).not.toEqual(expect.stringContaining('justify-right')) // prettier-ignore
  expect(optimizedStylesheet).not.toEqual(expect.stringContaining('mt-2'))
})

test('creates a min-width media query for each breakpoint', () => {
  for (const minWidth of Object.values(mockConfig.theme.breakpoints)) {
    expect(generatedStylesheet).toEqual(
      expect.stringContaining(`min-width: ${minWidth}`)
    )
  }
})

test('prefixes classes within each breakpoint media query', () => {
  for (const prefix of Object.keys(mockConfig.theme.breakpoints)) {
    expect(generatedStylesheet).toEqual(
      expect.stringContaining(`.${prefix}\\:mt-1`)
    )
  }
})
