import { join } from 'path'

import { Config } from '@svelte-system/types/validation.js'
import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import { cosmiconfigSync } from 'cosmiconfig'
import del from 'del'
import { assert, StructError } from 'superstruct'

import { generateComponents } from './generateComponents.js'

const mockConfig = cosmiconfigSync().search().config

beforeAll(() => {
  try {
    assert(mockConfig, Config)
  } catch (err) {
    if (!(err instanceof StructError)) return console.error(err)
    console.error('Mock configuration is invalid')
    console.dir(err, { depth: null })
    return
  }

  generateComponents({
    outputPath: mockConfig.outputPath,
    theme: mockConfig.theme,
  })
})

afterAll(async () => del(mockConfig.outputPath))

test('index file', async () => {
  const index = await import(join(mockConfig.outputPath, 'index.js'))

  expect(Object.keys(index)).toEqual(
    expect.arrayContaining(['Body', 'Box', 'Flex', 'Text'])
  )
})

test('default tag', async () => {
  const Box = await import(join(mockConfig.outputPath, 'Box.svelte'))

  const { getByTestId } = render(Box, {
    testId: 'a',
  })

  const el = getByTestId('a')
  expect(el.tagName).toEqual('DIV')
})

test('tag specified by `as` prop', async () => {
  const Box = await import(join(mockConfig.outputPath, 'Box.svelte'))

  const { getByTestId } = render(Box, {
    as: 'p',
    testId: 'a',
  })

  const el = getByTestId('a')
  expect(el.tagName).toEqual('P')
})

test('space styles', async () => {
  const Box = await import(join(mockConfig.outputPath, 'Box.svelte'))

  const { getByTestId } = render(Box, {
    marginBottom: '1',
    testId: 'a',
  })

  const el = getByTestId('a')
  expect(el).toHaveClass('mb-1')
})

test('specified components', async () => {
  const Body = await import(join(mockConfig.outputPath, 'Body.svelte'))

  const { getByTestId } = render(Body, {
    marginBottom: '1',
    testId: 'a',
  })

  const el = getByTestId('a')
  expect(el).toHaveClass('color-text')
  expect(el).toHaveClass('font-family-body')
  expect(el).toHaveClass('mb-1')
})
