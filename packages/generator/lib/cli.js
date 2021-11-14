#!/usr/bin/env node

import { relative, resolve } from 'path'

import chalk from 'chalk'
import { cosmiconfigSync } from 'cosmiconfig'
import sade from 'sade'

import { generateComponents } from './generate.js'

const cli = sade('svelte-sytem', true)

cli
  .option('-c --config', 'Path to config file')
  .option('-o --output', 'Path to output generated components')

cli.action((options) => {
  const explorer = cosmiconfigSync('svelte-system')

  const explorerResult = options.config
    ? explorer.load(options.config)
    : explorer.search()

  if (explorerResult === null) {
    throw new Error(
      'Could not find required configuration, see README for details'
    )
  }

  const userConfig = explorerResult.config
  const outputPath = options.output || userConfig.outputPath

  const components = generateComponents({
    outputPath,
    theme: userConfig.theme,
  })

  const relativeOutputPath = relative(resolve('..'), outputPath)

  console.log(
    chalk.green(
      `✔ ${components.length} components generated and saved to ${relativeOutputPath}`
    )
  )
})

cli.parse(process.argv)
