import chokidar from 'chokidar'

import { cosmiconfig } from '../caches.js'
import { detectPropUsage } from '../usage.js'
import { generateComponentsCommand } from './generateComponentsCommand.js'
import { generateComponents } from '../generators/generateComponents.js'
import { getUserConfig } from '../utils/getUserConfig.js'

jest.mock('../caches.js')
jest.mock('../usage.js')
jest.mock('../generators/generateComponents.js')
jest.mock('../utils/getUserConfig.js')

generateComponents.mockImplementation(() => {
  return []
})

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

  await expect(generateComponentsCommand()).rejects.toMatchInlineSnapshot(
    `[Error: Failed to read config file at a.json]`
  )
})

test('throws if components path is unspecified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(generateComponentsCommand({})).rejects.toMatchInlineSnapshot(
    `[Error: Required output path is not specified]`
  )
})

// config

test('outputs components to path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'a',
    },
  }))

  await generateComponentsCommand({ output: 'b' })

  expect(generateComponents).toHaveBeenCalledWith({
    outputPath: 'b',
  })
})

test('outputs components to path specified in config', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'a',
    },
  }))

  await generateComponentsCommand({})

  expect(generateComponents).toHaveBeenCalledWith({
    outputPath: 'a',
  })
})

// optimize mode

test('optimize mode - throws if project path is unspecified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(
    generateComponentsCommand({
      output: 'a',
      componentsPath: 'a',
      optimize: true,
    })
  ).rejects.toMatchInlineSnapshot(
    `[Error: Optimize mode requires the project path to be specified]`
  )
})

test('optimize mode - updates usage cache', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      theme: 'c',
    },
  }))

  await generateComponentsCommand({
    output: 'a',
    componentsPath: 'a',
    projectPath: 'b',
    optimize: true,
  })

  expect(detectPropUsage).toHaveBeenCalledWith({
    componentsPath: 'a',
    projectPath: 'b',
    theme: 'c',
  })
})

test('optimize mode - passes flag to generator', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      theme: 'c',
    },
  }))

  await generateComponentsCommand({
    output: 'a',
    componentsPath: 'a',
    projectPath: 'b',
    optimize: true,
  })

  expect(generateComponents).toHaveBeenCalledWith(
    expect.objectContaining({
      optimize: true,
    })
  )
})

// watch mode

test('watch mode - watches config file changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateComponentsCommand({
    output: 'a',
    watch: true,
  })

  expect(chokidar.watch).toHaveBeenCalledWith('a', { ignoreInitial: true })
})

test('watch mode - reloads config on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateComponentsCommand({
    output: 'a',
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

  await generateComponentsCommand({
    output: 'a',
    watch: true,
  })

  expect(generateComponents).toHaveBeenCalledTimes(2)
})

test('watch mode - clears console on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateComponentsCommand({
    output: 'a',
    watch: true,
  })

  expect(console.clear).toHaveBeenCalled()
})
