import { relative, resolve } from 'path'

import chokidar from 'chokidar'

import { buildDocs } from '@svelte-system/docs'

import { logger } from './logger.js'
import { cosmiconfig } from '../caches.js'
import { generateDocs } from '../generators/generateDocs.js'
import { getUserConfig } from '../utils/getUserConfig.js'

/**
 * @typedef { import('@svelte-system/types/cli').GenerateDocsCommandOptions } GenerateDocsCommandOptions
 */

/**
 * @param {GenerateDocsCommandOptions} cmdOptions
 * @returns {Promise<void>}
 */
export async function generateDocsCommand(cmdOptions) {
  const { userConfig, userConfigPath } = getUserConfig(cmdOptions)

  if (userConfig === null) {
    throw new Error(`Failed to read config file at ${userConfigPath}`)
  }

  const componentsPath = cmdOptions.componentsPath || userConfig.componentsPath
  const docsPath = cmdOptions.output || userConfig.docsPath

  if (!componentsPath) {
    throw new Error('Required components path is not specified')
  }

  if (!docsPath) {
    throw new Error('Required output path is not specified')
  }

  const relativeOutputPath = relative(resolve('..'), docsPath)

  const generatorOptions = {
    componentsPath,
    theme: userConfig.theme,
  }

  const componentDocs = generateDocs(generatorOptions)

  await buildDocs({
    components: componentDocs,
    outputPath: docsPath,
  })

  logger.success(`component docs generated and saved to ${relativeOutputPath}`)

  if (cmdOptions.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        console.clear()
        cosmiconfig.clearCaches()
        const { userConfig: refreshedUserConfig } = getUserConfig(cmdOptions)
        generateDocs({
          ...generatorOptions,
          theme: refreshedUserConfig.theme,
        })
      })
  }
}
