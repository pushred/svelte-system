#!/usr/bin/env node

import sade from 'sade'

import {
  generateCommand,
  generateComponentsCommand,
  generateDocsCommand,
  generateStylesheetCommand,
} from './cli/index.js'

/**
 * @typedef { import('@svelte-system/types').Config } UserConfig
 */

const cli = sade('svelte-system')

cli.option('-c --config', 'Path to config file')
cli.option('--watch', 'Watch config file and re-generate on changes')

// prettier-ignore
cli
  .command('generate')
  .option('--optimize', 'Omit unused props and prop values')
  .option('--components-path', 'Path to output generated components')
  .option('--docs-path', 'Path to output generated docs')
  .option('--project-path', 'Root path to project’s Svelte files for usage detection')
  .option('--stylesheet-path', 'Path to output generated stylesheet')
  .action(generateCommand)

// prettier-ignore
cli
  .command('generate-components')
  .option('--optimize', 'Omit unused props and prop values')
  .option('--project-path', 'Root path to project’s Svelte files for usage detection')
  .option('-o --output', 'Path to output generated components')
  .action(generateComponentsCommand)

// prettier-ignore
cli
  .command('generate-docs')
  .option('-o --output', 'Path to output generated docs')
  .action(generateDocsCommand)

// prettier-ignore
cli
  .command('generate-stylesheet')
  .option('-o --output', 'Path to output generated stylesheet')
  .option('--optimize', 'Omit unused props and prop values')
  .option('--components-path', 'Path to output generated components')
  .option('--project-path', 'Root path to project’s Svelte files for usage detection')
  .action(generateStylesheetCommand)

cli.parse(process.argv)
