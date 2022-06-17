import { relative, resolve } from 'path'

import chokidar from 'chokidar'

import { logger } from './logger.js'
import { cosmiconfig } from '../caches.js'
import { generateStylesheet } from '../generators/generateStylesheet.js'
import { detectPropUsage } from '../usage.js'
import { getUserConfig } from '../utils/getUserConfig.js'

/**
 * @typedef { import('@svelte-system/types/cli').GenerateStylesheetCommandOptions } GenerateStylesheetCommandOptions
 */

/**
 * @param {GenerateStylesheetCommandOptions} cmdOptions
 * @returns {Promise<void>}
 */
export async function generateStylesheetCommand(cmdOptions) {
  const { userConfig, userConfigPath } = getUserConfig(cmdOptions)

  if (userConfig === null) {
    throw new Error(`Failed to read config file at ${userConfigPath}`)
  }

  const componentsPath = cmdOptions.componentsPath || userConfig.componentsPath
  const projectPath = cmdOptions.projectPath || userConfig.projectPath
  const stylesheetPath = cmdOptions.output || userConfig.stylesheetPath

  if (!stylesheetPath) {
    throw new Error('Required stylesheet output path is not specified')
  }

  if (cmdOptions.optimize && !componentsPath) {
    throw new Error(
      'Optimize mode requires the components path to be specified'
    )
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
    outputPath: stylesheetPath,
    theme: userConfig.theme,
  }

  generateStylesheet(generatorOptions)

  const relativeOutputPath = relative(resolve('..'), stylesheetPath)

  logger.success(`stylesheet generated and saved to ${relativeOutputPath}`)

  if (cmdOptions.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        console.clear()
        cosmiconfig.clearCaches()
        const { userConfig: refreshedUserConfig } = getUserConfig(cmdOptions)
        generateStylesheet({
          ...generatorOptions,
          theme: refreshedUserConfig.theme,
        })
      })
  }
}
