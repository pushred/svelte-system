#!/usr/bin/env node

import { relative, resolve } from 'path'

import chalk from 'chalk'
import { cosmiconfigSync } from 'cosmiconfig'
import sade from 'sade'

import { generateComponents, generateDocs } from './generate.js'

function getUserConfig(options) {
  const explorer = cosmiconfigSync('svelte-system')

  const explorerResult = options.config
    ? explorer.load(options.config)
    : explorer.search()

  if (explorerResult === null) {
    throw new Error(
      'Could not find required configuration, see README for details'
    )
  }

  return explorerResult.config
}

const cli = sade('svelte-system')

cli.option('-c --config', 'Path to config file')

cli
  .command('generate-components')
  .option('-o --output', 'Path to output generated components')
  .action((options) => {
    const userConfig = getUserConfig(options)
    const outputPath = options.output || userConfig.componentsPath
    const relativeOutputPath = relative(resolve('..'), outputPath)

    const components = generateComponents({
      outputPath,
      theme: userConfig.theme,
    })

    console.log(
      chalk.green('✔'),
      `${components.length} components generated and saved to ${relativeOutputPath}`
    )
  })

cli
  .command('generate-docs [componentsPath]')
  .option('-o --output', 'Path to output generated docs')
  .action(async (componentsPathArg, options) => {
    const userConfig = getUserConfig(options)

    const componentsPath = componentsPathArg
      ? resolve(process.cwd(), componentsPathArg)
      : options.componentsPath || userConfig.componentsPath

    const outputPath = options.output || userConfig.docsPath
    const relativeOutputPath = relative(resolve('..'), outputPath)

    await generateDocs({
      componentsPath,
      outputPath,
      theme: userConfig.theme,
    })

    console.log(
      chalk.green('✔'),
      `Component docs generated and saved to ${relativeOutputPath}`
    )
  })

cli.parse(process.argv)
