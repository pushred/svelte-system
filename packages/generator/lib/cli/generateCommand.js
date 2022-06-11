import chokidar from 'chokidar'

import {
  generateComponentsCommand as generateComponents,
  generateDocsCommand as generateDocs,
  generateStylesheetCommand as generateStylesheet,
} from './index.js'

import { logger } from './logger.js'
import { getUserConfig } from '../utils/getUserConfig.js'

export async function generateCommand(options) {
  const { userConfig, userConfigPath } = getUserConfig(options)
  if (!userConfig) return

  await generateComponents(options)
  await generateStylesheet(options)
  await generateDocs(options)

  if (options.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        await generateComponents(options, true)
        await generateStylesheet(options, true)
        await generateDocs(options, true)
      })
  }
}
