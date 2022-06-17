import { relative, resolve } from 'path'

import chokidar from 'chokidar'

import { logger } from './logger.js'
import { cosmiconfig } from '../caches.js'
import { generateComponents } from '../generators/generateComponents.js'
import { detectPropUsage } from '../usage.js'
import { getUserConfig } from '../utils/getUserConfig.js'

/**
 * @typedef { import('@svelte-system/types/cli').GenerateComponentsCommandOptions } GenerateComponentsCommandOptions
 */

/**
 * @param {GenerateComponentsCommandOptions} cmdOptions
 * @returns {Promise<void>}
 */
export async function generateComponentsCommand(cmdOptions) {
  const { userConfig, userConfigPath } = getUserConfig(cmdOptions)

  if (userConfig === null) {
    throw new Error(`Failed to read config file at ${userConfigPath}`)
  }

  const componentsPath = cmdOptions.output || userConfig.componentsPath
  const projectPath = cmdOptions.projectPath || userConfig.projectPath

  if (!componentsPath) {
    throw new Error('Required output path is not specified')
  }

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

  const generatorOptions = {
    optimize: cmdOptions.optimize,
    outputPath: componentsPath,
    theme: userConfig.theme,
  }

  const components = generateComponents(generatorOptions)
  const relativeOutputPath = relative(resolve('..'), componentsPath)

  logger.success(
    `${components.length} components generated and saved to ${relativeOutputPath}`
  )

  if (cmdOptions.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        console.clear()
        cosmiconfig.clearCaches()
        const { userConfig: refreshedUserConfig } = getUserConfig(cmdOptions)
        generateComponents({
          ...generatorOptions,
          theme: refreshedUserConfig.theme,
        })
      })
  }
}
