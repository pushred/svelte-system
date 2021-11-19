#!/usr/bin/env node

import { relative, resolve } from 'path'

import { buildDocs } from '@svelte-system/docs'
import { Config } from '@svelte-system/types/validation.js'
import chalk from 'chalk'
import { cosmiconfigSync } from 'cosmiconfig'
import sade from 'sade'
import { assert, StructError } from 'superstruct'

import { generateComponents, getComponentDocs } from './generate.js'

/**
 * @typedef { import('@svelte-system/types').CliOptions } CliOptions
 * @typedef { import('@svelte-system/types').Config } UserConfig
 */

function lowerFirst(string = '') {
  return `${string.charAt(0).toLowerCase()}${string.slice(1)}`
}

/**
 * @param { CliOptions } options
 * @returns { UserConfig | null | void }
 */
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

  const userConfig = explorerResult.config

  try {
    assert(userConfig, Config)
  } catch (err) {
    if (!(err instanceof StructError)) return console.error(err)

    console.error(
      chalk.red('✘'),
      `Provided configuration is invalid, ${lowerFirst(err.message)}`
    )

    return null
  }

  return userConfig
}

const cli = sade('svelte-system')

cli.option('-c --config', 'Path to config file')

cli
  .command('generate-components')
  .option('-o --output', 'Path to output generated components')
  .action((options) => {
    const userConfig = getUserConfig(options)
    if (!userConfig) return

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
    if (!userConfig) return

    const componentsPath = componentsPathArg
      ? resolve(process.cwd(), componentsPathArg)
      : options.componentsPath || userConfig.componentsPath

    const outputPath = options.output || userConfig.docsPath
    const relativeOutputPath = relative(resolve('..'), outputPath)

    const componentDocs = await getComponentDocs({
      componentsPath,
      theme: userConfig.theme,
    })

    await buildDocs({ components: componentDocs, outputPath })

    console.log(
      chalk.green('✔'),
      `Component docs generated and saved to ${relativeOutputPath}`
    )
  })

cli.parse(process.argv)
