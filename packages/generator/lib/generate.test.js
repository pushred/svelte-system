import { join } from 'path'

import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import { cosmiconfigSync } from 'cosmiconfig'
import del from 'del'

import { generateComponents, getComponentDocs } from './generate.js'

const mockConfig = cosmiconfigSync().search().config

jest.mock('@svelte-system/docs', () => {
  return {
    buildDocs: () => Promise.resolve(),
  }
})

beforeAll(() => {
  generateComponents({
    outputPath: mockConfig.outputPath,
    theme: mockConfig.theme,
  })
})

afterAll(async () => del(mockConfig.outputPath))

describe('component generation', () => {
  test('space styles', async () => {
    const Box = await import(join(mockConfig.outputPath, 'Box.svelte'))

    const { getByTestId } = render(Box, {
      marginBottom: '1',
      testId: 'a',
    })

    const el = getByTestId('a')
    expect(el).toHaveClass('margin-bottom-1')
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

    expect(marginBottomProp.type).toEqual('integer')

    expect(marginBottomProp.oneOf).toEqual(
      expect.arrayContaining(Object.keys(mockConfig.theme.space))
    )
  })
})
