import { relative, resolve } from 'path'

import chalk from 'chalk'

import { generateComponents } from '../generators/generateComponents.js'

import { detectPropUsage } from '../usage.js'
import { getUserConfig } from '../utils/getUserConfig.js'

export async function generateComponentsCommand(options) {
  const userConfig = getUserConfig(options)
  if (!userConfig) return

  const componentsPath =
    options.output || options.componentsPath || userConfig.componentsPath

  const projectPath = options.projectPath || userConfig.projectPath
  const relativeOutputPath = relative(resolve('..'), componentsPath)

  if (options.optimize) {
    await detectPropUsage({
      componentsPath,
      projectPath,
      theme: userConfig.theme,
    })
  }

  const components = generateComponents({
    outputPath: componentsPath,
    optimize: options.optimize,
    theme: userConfig.theme,
  })

  console.log(
    chalk.green('✔'),
    `${components.length} components generated and saved to ${relativeOutputPath}`
  )
}
