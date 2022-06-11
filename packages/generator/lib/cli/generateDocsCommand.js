import { relative, resolve } from 'path'

import chalk from 'chalk'

import { buildDocs } from '@svelte-system/docs'

import { generateDocs } from '../generators/generateDocs.js'
import { getUserConfig } from '../utils/getUserConfig.js'

export async function generateDocsCommand(options) {
  const userConfig = getUserConfig(options)
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

  console.log(
    chalk.green('✔'),
    `component docs generated and saved to ${relativeOutputPath}`
  )
}
