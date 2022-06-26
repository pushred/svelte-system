import { dirname, join } from 'node:path'
import { accessSync, constants } from 'node:fs'

import { assert, StructError } from 'superstruct'

import { Config } from '@svelte-system/types/validation.js'

import { cosmiconfig } from '../caches.js'
import { defaultTheme } from '../defaultTheme.js'
import { logger } from '../cli/logger.js'

/**
 * @typedef { import('@svelte-system/types/cli').SharedCommandOptions } CliOptions
 * @typedef { import('@svelte-system/types').Config } UserConfig
 */

function checkTypeScriptProject(userConfigPath) {
  try {
    const rootPath = dirname(userConfigPath)
    accessSync(join(rootPath, 'tsconfig.json'), constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}

function lowerFirst(string = '') {
  return `${string.charAt(0).toLowerCase()}${string.slice(1)}`
}

/**
 * @param { CliOptions } options
 * @returns {{ userConfig: UserConfig | null, userConfigPath: string | null }}
 */
export function getUserConfig(options) {
  const explorerResult = options.config
    ? cosmiconfig.load(options.config)
    : cosmiconfig.search()

  if (explorerResult === null) {
    throw new Error(
      'Could not find required configuration, see README for details'
    )
  }

  const userConfig = explorerResult.config
  const userConfigPath = explorerResult.filepath
  const userTheme = userConfig.theme

  const mergedConfig = {
    ...userConfig,
    theme: {
      ...userTheme, // merge and overwrite to catch unknown props
      breakpoints: userTheme.breakpoints || defaultTheme.breakpoints,
      borders: userTheme.borders || defaultTheme.borders,
      colors: userTheme.colors || defaultTheme.colors,
      components: userTheme.components,
      fonts: userTheme.fonts || defaultTheme.fonts,
      fontSizes: userTheme.fontSizes || defaultTheme.fontSizes,
      fontWeights: userTheme.fontWeights || defaultTheme.fontWeights,
      letterSpacings: userTheme.letterSpacings || defaultTheme.letterSpacings,
      lineHeights: userTheme.lineHeights || defaultTheme.lineHeights,
      radii: userTheme.radii || defaultTheme.radii,
      sizes: userTheme.sizes || defaultTheme.sizes,
      space: userTheme.space || defaultTheme.space,
      flexGrow: userTheme.flexGrow || defaultTheme.flexGrow,
      flexShrink: userTheme.flexShrink || defaultTheme.flexShrink,
      order: userTheme.order || defaultTheme.order,
    },
    typescript:
      userConfig.typescript === undefined
        ? checkTypeScriptProject(userConfigPath)
        : userConfig.typescript,
  }

  try {
    assert(mergedConfig, Config)
  } catch (err) {
    if (!(err instanceof StructError)) {
      logger.error(err)
      return {
        userConfigPath,
        userConfig: null,
      }
    }

    logger.error(
      new Error(`Provided configuration is invalid, ${lowerFirst(err.message)}`)
    )

    logger.object(mergedConfig)

    return {
      userConfigPath,
      userConfig: null,
    }
  }

  return {
    userConfigPath,
    userConfig: mergedConfig,
  }
}
