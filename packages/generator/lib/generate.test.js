import { join } from 'path'

import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import { cosmiconfigSync } from 'cosmiconfig'
import del from 'del'

import { generateComponents } from './generate.js'

const mockConfig = cosmiconfigSync().search().config

beforeAll(() => {
  generateComponents({
    outputPath: mockConfig.outputPath,
    theme: mockConfig.theme,
  })
})

afterAll(async () => del(mockConfig.outputPath))

test('space styles', async () => {
  const Box = await import(join(mockConfig.outputPath, 'Box.svelte'))

  const { getByTestId } = render(Box, {
    marginBottom: '1',
    testId: 'a',
  })

  const el = getByTestId('a')
  expect(el).toHaveClass('margin-bottom-1')
})
