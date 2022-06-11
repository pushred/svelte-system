import { relative, resolve } from 'path'

import chokidar from 'chokidar'

import { buildDocs } from '@svelte-system/docs'

import { logger } from './logger.js'
import { generateDocs } from '../generators/generateDocs.js'
import { getUserConfig } from '../utils/getUserConfig.js'

export async function generateDocsCommand(options, disableWatch = false) {
  const { userConfig, userConfigPath } = getUserConfig(options)
  if (!userConfig) return

  const componentsPath = options.componentsPath || userConfig.componentsPath
  const docsPath = options.output || options.docsPath || userConfig.docsPath

  const relativeOutputPath = relative(resolve('..'), docsPath)

  const componentDocs = await generateDocs({
    componentsPath,
    theme: userConfig.theme,
  })

  await buildDocs({
    components: componentDocs,
    outputPath: docsPath,
  })

  logger.success(`component docs generated and saved to ${relativeOutputPath}`)

  if (disableWatch === false && options.watch) {
    logger.wait('watching for changes')
    chokidar
      .watch(userConfigPath, { ignoreInitial: true })
      .on('all', async () => {
        await generateDocs(options)
      })
  }
}
