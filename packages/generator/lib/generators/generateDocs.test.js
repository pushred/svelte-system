import { Config } from '@svelte-system/types/validation.js'
import '@testing-library/jest-dom'
import { cosmiconfigSync } from 'cosmiconfig'
import del from 'del'
import { assert, StructError } from 'superstruct'

import { generateComponents } from './generateComponents.js'
import { generateDocs } from './generateDocs.js'

const mockConfig = cosmiconfigSync().search().config

jest.mock('@svelte-system/docs', () => {
  return {
    buildDocs: () => Promise.resolve(),
  }
})

let content

beforeAll(async () => {
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

  content = generateDocs({
    componentsPath: mockConfig.outputPath,
    outputPath: mockConfig.outputPath,
    theme: mockConfig.theme,
  })
})

afterAll(async () => del(mockConfig.outputPath))

test('gets content from compiler', () => {
  expect(content.length).not.toEqual(0)

  const component = content[0]

  expect(component.props).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: 'testId',
      }),
    ])
  )
})

test('gets prop values from config', () => {
  const component = content.find((component) => component.name === 'Box')

  const marginBottomProp = component.props.find(
    (prop) => prop.name === 'marginBottom'
  )

  expect(marginBottomProp.values).toEqual(
    expect.arrayContaining(Object.keys(mockConfig.theme.space))
  )
})
