import readline from 'readline'
import { relative, resolve } from 'path'

import { buildDocs } from '@svelte-system/docs'

import chokidar from 'chokidar'

import { logger } from './logger.js'
import { cosmiconfig } from '../caches.js'
import { detectPropUsage } from '../usage.js'
import { getUserConfig } from '../utils/getUserConfig.js'

import {
  generateComponents,
  generateDocs,
  generateStylesheet,
} from '../generators/index.js'

const isTest = process.env.NODE_ENV === 'test'

/**
 * @typedef { import('@svelte-system/types').Config } UserConfig
 * @typedef { import('@svelte-system/types/cli').GenerateCommandOptions } GenerateCommandOptions
 */

/**
 * @param {GenerateCommandOptions} cmdOptions
 * @param {UserConfig} userConfig
 */
async function generate(cmdOptions, userConfig) {
  const componentsPath = cmdOptions.componentsPath || userConfig.componentsPath
  const docsPath = cmdOptions.docsPath || userConfig.docsPath
  const projectPath = cmdOptions.projectPath || userConfig.projectPath
  const stylesheetPath = cmdOptions.stylesheetPath || userConfig.stylesheetPath
  const theme = userConfig.theme

  if (cmdOptions.optimize && !projectPath) {
    throw new Error('Optimize mode requires the project path to be specified')
  }

  if (cmdOptions.optimize) {
    await detectPropUsage({
      componentsPath,
      projectPath,
      theme: userConfig.theme,
    })
  }

  if (componentsPath) {
    const generatedComponents = generateComponents({
      theme,
      optimize: cmdOptions.optimize,
      outputPath: componentsPath,
      typescript: userConfig.typescript,
    })

    const relativeOutputPath = relative(resolve('..'), componentsPath)
    logger.success(
      `${generatedComponents.length} components generated and saved to ${relativeOutputPath}`
    )
  }

  if (docsPath) {
    const componentDocs = generateDocs({
      componentsPath,
      theme,
    })

    buildDocs({
      components: componentDocs,
      outputPath: docsPath,
    })

    const relativeOutputPath = relative(resolve('..'), docsPath)
    logger.success(
      `component docs generated and saved to ${relativeOutputPath}`
    )
  }

  if (stylesheetPath) {
    generateStylesheet({
      theme,
      optimize: cmdOptions.optimize,
      outputPath: stylesheetPath,
    })

    const relativeOutputPath = relative(resolve('..'), stylesheetPath)
    logger.success(`stylesheet generated and saved to ${relativeOutputPath}`)
  }

  return Promise.resolve()
}

/**
 * @param {GenerateCommandOptions} cmdOptions
 * @returns {Promise<void>}
 */
export async function generateCommand(cmdOptions) {
  const { userConfig, userConfigPath } = getUserConfig(cmdOptions)

  if (userConfig === null) {
    throw new Error(`Failed to read config file at ${userConfigPath}`)
  }

  await generate(cmdOptions, userConfig)

  if (!isTest && cmdOptions.watch) {
    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.on('keypress', (_, key) => {
      if (
        key.name === 'q' ||
        (key.ctrl === true && key.name === 'c') // SIGINT is not emitted in raw mode
      ) {
        process.exit()
      }
    })
  }

  if (cmdOptions.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        console.clear()
        cosmiconfig.clearCaches()
        const { userConfig: refreshedUserConfig } = getUserConfig(cmdOptions)
        await generate(cmdOptions, refreshedUserConfig)
        logger.wait('watching for changes')
      })
  }
}
