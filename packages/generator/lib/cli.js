#!/usr/bin/env node

import { relative, resolve } from 'path'

import chalk from 'chalk'
import { cosmiconfigSync } from 'cosmiconfig'
import meow from 'meow'

import { generateComponents } from './generate.js'

const HELP = `
  Usage
    $ svelte-system-components

  Options
    --config, -c  Path to config file
    --output, -o  Path to output generated components
`

const cli = meow(HELP, {
  importMeta: import.meta,
})

const explorer = cosmiconfigSync('svelte-system')

const explorerResult = cli.flags.config
  ? explorer.load(cli.flags.config)
  : explorer.search()

if (explorerResult === null) {
  throw new Error(
    'Could not find required configuration, see README for details'
  )
}

const userConfig = explorerResult.config
const outputPath = cli.flags.output || userConfig.outputPath

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
