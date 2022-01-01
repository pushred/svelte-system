import { join } from 'path'

import { Config } from '@svelte-system/types/validation.js'
import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import { cosmiconfigSync } from 'cosmiconfig'
import del from 'del'
import { assert, StructError } from 'superstruct'

import {
  generateComponents,
  generateDerivedComponents,
  getComponentDocs,
} from './generate.js'

const mockConfig = cosmiconfigSync().search().config

jest.mock('@svelte-system/docs', () => {
  return {
    buildDocs: () => Promise.resolve(),
  }
})

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
  generateDerivedComponents({
    outputPath: mockConfig.outputPath,
    theme: mockConfig.theme,
  })
})

afterAll(async () => del(mockConfig.outputPath))

describe('component generation', () => {
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

  test('derived components', async () => {
    const Flex = await import(join(mockConfig.outputPath, 'Flex.svelte'))

    const { getByTestId } = render(Flex, {
      marginBottom: '1',
      testId: 'a',
    })

    const el = getByTestId('a')
    expect(el).toHaveClass('d-flex')
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
})

describe('doc generation', () => {
  let content

  beforeAll(async () => {
    content = await getComponentDocs({
      componentsPath: mockConfig.outputPath,
      outputPath: mockConfig.outputPath,
      theme: mockConfig.theme,
    })
  })

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
})
