import chokidar from 'chokidar'

import { cosmiconfig } from '../caches.js'
import { detectPropUsage } from '../usage.js'
import { generateStylesheetCommand } from './generateStylesheetCommand.js'
import { generateStylesheet } from '../generators/generateStylesheet.js'
import { getUserConfig } from '../utils/getUserConfig.js'

jest.mock('../caches.js')
jest.mock('../usage.js')
jest.mock('../generators/generateStylesheet.js')
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

  await expect(generateStylesheetCommand()).rejects.toMatchInlineSnapshot(
    `[Error: Failed to read config file at a.json]`
  )
})

test('throws if stylesheet path is unspecified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(generateStylesheetCommand({})).rejects.toMatchInlineSnapshot(
    `[Error: Required stylesheet output path is not specified]`
  )
})

// config

test('outputs stylesheet to path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      stylesheetPath: 'a.css',
    },
  }))

  await generateStylesheetCommand({ output: 'b.css' })

  expect(generateStylesheet).toHaveBeenCalledWith({
    outputPath: 'b.css',
  })
})

test('outputs stylesheet to path specified in config', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      stylesheetPath: 'a.css',
    },
  }))

  await generateStylesheetCommand({})

  expect(generateStylesheet).toHaveBeenCalledWith({
    outputPath: 'a.css',
  })
})

// optimize mode

test('optimize mode - throws if components path is not specified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(
    generateStylesheetCommand({ output: 'a.css', optimize: true })
  ).rejects.toMatchInlineSnapshot(
    `[Error: Optimize mode requires the components path to be specified]`
  )
})

test('optimize mode - throws if project path is not specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(
    generateStylesheetCommand({
      output: 'a.css',
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

  await generateStylesheetCommand({
    output: 'a.css',
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

  await generateStylesheetCommand({
    output: 'a.css',
    componentsPath: 'a',
    projectPath: 'b',
    optimize: true,
  })

  expect(generateStylesheet).toHaveBeenCalledWith(
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

  await generateStylesheetCommand({
    output: 'a.css',
    watch: true,
  })

  expect(chokidar.watch).toHaveBeenCalledWith('a', { ignoreInitial: true })
})

test('watch mode - reloads config on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateStylesheetCommand({
    output: 'a.css',
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

  await generateStylesheetCommand({
    output: 'a.css',
    watch: true,
  })

  expect(generateStylesheet).toHaveBeenCalledTimes(2)
})

test('watch mode - clears console on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateStylesheetCommand({
    output: 'a.css',
    watch: true,
  })

  expect(console.clear).toHaveBeenCalled()
})
