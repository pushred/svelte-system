import chokidar from 'chokidar'

import { buildDocs } from '@svelte-system/docs'

import { cosmiconfig } from '../caches.js'
import { detectPropUsage } from '../usage.js'
import { generateDocsCommand } from './generateDocsCommand.js'
import { generateDocs } from '../generators/generateDocs.js'
import { getUserConfig } from '../utils/getUserConfig.js'

jest.mock('../caches.js')
jest.mock('../generators/generateDocs.js')
jest.mock('../utils/getUserConfig.js')

jest.spyOn(console, 'clear').mockImplementation(() => {})
jest.spyOn(console, 'info').mockImplementation(() => {})

beforeEach(() => {
  jest.clearAllMocks()
})

// exception path

test('throws if user config is falsey', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: null,
    userConfigPath: 'a.json',
  }))

  await expect(generateDocsCommand()).rejects.toMatchInlineSnapshot(
    `[Error: Failed to read config file at a.json]`
  )
})

test('throws if components path is unspecified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(
    generateDocsCommand({ output: 'a' })
  ).rejects.toMatchInlineSnapshot(
    `[Error: Required components path is not specified]`
  )
})

test('throws if output path is unspecified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(
    generateDocsCommand({ componentsPath: 'a' })
  ).rejects.toMatchInlineSnapshot(
    `[Error: Required output path is not specified]`
  )
})

// config

test('generates docs for components in path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'a',
    },
  }))

  await generateDocsCommand({ output: 'b' })

  expect(generateDocs).toHaveBeenCalledWith({ componentsPath: 'a' })
})

test('generates docs for components in path specified in config', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'c',
      outputPath: 'a',
    },
  }))

  await generateDocsCommand({ output: 'b' })

  expect(generateDocs).toHaveBeenCalledWith({
    componentsPath: 'c',
  })
})

test('outputs docs to path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'c',
      docsPath: 'a',
    },
  }))

  await generateDocsCommand({ output: 'b' })

  expect(buildDocs).toHaveBeenCalledWith({
    outputPath: 'b',
  })
})

test('outputs docs to path specified in config', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'c',
      docsPath: 'a',
    },
  }))

  await generateDocsCommand({})

  expect(buildDocs).toHaveBeenCalledWith({
    outputPath: 'a',
  })
})

// watch mode

test('watch mode - watches config file changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateDocsCommand({
    componentsPath: 'c',
    output: 'b',
    watch: true,
  })

  expect(chokidar.watch).toHaveBeenCalledWith('a', { ignoreInitial: true })
})

test('watch mode - reloads config on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateDocsCommand({
    componentsPath: 'c',
    output: 'b',
    watch: true,
  })

  expect(cosmiconfig.clearCaches).toHaveBeenCalled()
  expect(getUserConfig).toHaveBeenCalledTimes(2)
})

test('watch mode - generates on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateDocsCommand({
    componentsPath: 'c',
    output: 'b',
    watch: true,
  })

  expect(generateDocs).toHaveBeenCalledTimes(2)
})

test('watch mode - clears console on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateDocsCommand({
    componentsPath: 'c',
    output: 'b',
    watch: true,
  })

  expect(console.clear).toHaveBeenCalled()
})
