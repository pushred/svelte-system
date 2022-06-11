import { relative, resolve } from 'path'

import chokidar from 'chokidar'

import { logger } from './logger.js'
import { generateStylesheet } from '../generators/generateStylesheet.js'
import { detectPropUsage } from '../usage.js'
import { getUserConfig } from '../utils/getUserConfig.js'

export async function generateStylesheetCommand(options, disableWatch = false) {
  const { userConfig, userConfigPath } = getUserConfig(options)
  if (!userConfig) return

  const stylesheetPath =
    options.output || options.stylesheetPath || userConfig.stylesheetPath

  const componentsPath = options.componentsPath || userConfig.componentsPath
  const projectPath = options.projectPath || userConfig.projectPath

  const relativeOutputPath = relative(resolve('..'), stylesheetPath)

  if (options.optimize) {
    await detectPropUsage({
      componentsPath,
      projectPath,
      theme: userConfig.theme,
    })
  }

  generateStylesheet({
    optimize: options.optimize,
    outputPath: stylesheetPath,
    theme: userConfig.theme,
  })

  logger.success(`stylesheet generated and saved to ${relativeOutputPath}`)

  if (disableWatch === false && options.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        await generateStylesheet(options)
      })
  }
}
