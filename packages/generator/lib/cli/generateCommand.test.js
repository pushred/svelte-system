import chokidar from 'chokidar'

import { buildDocs } from '@svelte-system/docs'

import { cosmiconfig } from '../caches.js'
import { detectPropUsage } from '../usage.js'
import { generateCommand } from './generateCommand.js'
import { getUserConfig } from '../utils/getUserConfig.js'

import {
  generateComponents,
  generateDocs,
  generateStylesheet,
} from '../generators/index.js'

jest.mock('../caches.js')
jest.mock('../usage.js')
jest.mock('../generators/generateDocs.js')
jest.mock('../generators/generateStylesheet.js')
jest.mock('../utils/getUserConfig.js')

jest.mock('../generators/generateComponents.js', () => ({
  generateComponents: jest.fn(() => []),
}))

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

  await expect(generateCommand()).rejects.toMatchInlineSnapshot(
    `[Error: Failed to read config file at a.json]`
  )
})

// config

test('does not run generators if output path is unspecified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await generateCommand({})

  expect(generateComponents).not.toHaveBeenCalled()
  expect(generateDocs).not.toHaveBeenCalled()
  expect(generateStylesheet).not.toHaveBeenCalled()
})

test('outputs components to path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'a',
    },
  }))

  await generateCommand({ componentsPath: 'b' })

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

  await generateCommand({ componentsPath: 'b' })

  expect(generateComponents).toHaveBeenCalledWith({
    outputPath: 'b',
  })
})

test('generates docs for components in path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'a',
      docsPath: 'b',
    },
  }))

  await generateCommand({ componentsPath: 'b' })

  expect(generateDocs).toHaveBeenCalledWith({ componentsPath: 'b' })
})

test('generates docs for components in path specified in config', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'c',
      docsPath: 'b',
    },
  }))

  await generateCommand({})

  expect(generateDocs).toHaveBeenCalledWith({
    componentsPath: 'c',
  })
})

test('outputs docs to path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'a',
      docsPath: 'a',
    },
  }))

  await generateCommand({ docsPath: 'b' })

  expect(buildDocs).toHaveBeenCalledWith({ outputPath: 'b' })
})

test('outputs docs to path specified in config', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      componentsPath: 'c',
      docsPath: 'a',
    },
  }))

  await generateCommand({})

  expect(buildDocs).toHaveBeenCalledWith({
    outputPath: 'a',
  })
})

test('outputs stylesheet to path specified by CLI', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      stylesheetPath: 'a.css',
    },
  }))

  await generateCommand({ stylesheetPath: 'b.css' })

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

  await generateCommand({})

  expect(generateStylesheet).toHaveBeenCalledWith({
    outputPath: 'a.css',
  })
})

// optimize mode

test('optimize mode - throws if project path is unspecified', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
  }))

  await expect(
    generateCommand({
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

  await generateCommand({
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

test('optimize mode - passes flag to generators', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {
      theme: 'd',
    },
  }))

  await generateCommand({
    componentsPath: 'a',
    projectPath: 'b',
    stylesheetPath: 'c',
    optimize: true,
  })

  expect(generateComponents).toHaveBeenCalledWith(
    expect.objectContaining({
      optimize: true,
    })
  )

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

  await generateCommand({
    componentsPath: 'a',
    stylesheetPath: 'a',
    watch: true,
  })

  expect(chokidar.watch).toHaveBeenCalledTimes(1)
  expect(chokidar.watch).toHaveBeenCalledWith('a', { ignoreInitial: true })
})

test('watch mode - reloads config on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateCommand({
    componentsPath: 'a',
    docsPath: 'a',
    stylesheetPath: 'a',
    watch: true,
  })

  expect(cosmiconfig.clearCaches).toHaveBeenCalledTimes(1)
  expect(getUserConfig).toHaveBeenCalledTimes(2)
})

test('watch mode - generates on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateCommand({
    componentsPath: 'a',
    docsPath: 'a',
    stylesheetPath: 'a',
    watch: true,
  })

  expect(generateComponents).toHaveBeenCalledTimes(2)
  expect(generateDocs).toHaveBeenCalledTimes(2)
  expect(buildDocs).toHaveBeenCalledTimes(2)
  expect(generateStylesheet).toHaveBeenCalledTimes(2)
})

test('watch mode - clears console on changes', async () => {
  getUserConfig.mockImplementation(() => ({
    userConfig: {},
    userConfigPath: 'a',
  }))

  await generateCommand({
    componentsPath: 'a',
    docsPath: 'a',
    stylesheetPath: 'a',
    watch: true,
  })

  expect(console.clear).toHaveBeenCalledTimes(1)
})
