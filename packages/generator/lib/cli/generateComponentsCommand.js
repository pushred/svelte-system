import { relative, resolve } from 'path'

import chokidar from 'chokidar'

import { logger } from './logger.js'
import { generateComponents } from '../generators/generateComponents.js'
import { detectPropUsage } from '../usage.js'
import { getUserConfig } from '../utils/getUserConfig.js'

export async function generateComponentsCommand(options, disableWatch = false) {
  const { userConfig, userConfigPath } = getUserConfig(options)
  if (!userConfig) return

  const componentsPath =
    options.output || options.componentsPath || userConfig.componentsPath

  const projectPath = options.projectPath || userConfig.projectPath
  const relativeOutputPath = relative(resolve('..'), componentsPath)

  if (options.optimize) {
    await detectPropUsage({
      componentsPath,
      projectPath,
      theme: userConfig.theme,
    })
  }

  const components = generateComponents({
    optimize: options.optimize,
    outputPath: componentsPath,
    theme: userConfig.theme,
  })

  logger.success(
    `${components.length} components generated and saved to ${relativeOutputPath}`
  )

  if (disableWatch === false && options.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        await generateComponents(options)
      })
  }
}
