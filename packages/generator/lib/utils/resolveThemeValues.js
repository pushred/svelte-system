import { flatten, unflatten } from 'flat'
import get from 'lodash.get'

import { defaultTheme } from '../defaultTheme.js'
import { propsByAlias, propsByName } from '../props/index.js'

const THEME_KEYS = Object.keys(defaultTheme)

/**
 * @typedef { import('@svelte-system/types').Theme } Theme
 */

function isStyle(key) {
  return THEME_KEYS.includes(key.split('.')[0]) === false
}

function getProp(maybePropName) {
  return propsByName[maybePropName] || propsByAlias[maybePropName]
}

/**
 *
 * @param {Theme} theme
 * @returns
 */

export function resolveThemeValues(theme) {
  const flatTheme = flatten(theme)
  const themeKeys = Object.keys(theme)

  for (const [key, value] of Object.entries(flatTheme)) {
    // dynamic values are only supported for keys matching a supported prop's name
    const prop = getProp(key.split('.').pop())

    if (!prop) {
      // drop unknown props for style objects
      if (isStyle(key)) delete flatTheme[key]
      continue
    }

    const valueParts = value.toString().split('.')
    const maybeThemeKey = valueParts[0]

    if (themeKeys.includes(maybeThemeKey)) {
      // if value starts with a top-level theme key, assume it is a path
      const resolvedValue = get(theme, value)

      if (resolvedValue) {
        // if value references a prop it is likely a partial path
        const prop = getProp(value.split('.').pop())

        if (prop) {
          const scaleValue = get(theme, `${prop.scale}.${resolvedValue}`)
          flatTheme[key] = scaleValue || null
        } else {
          // likely an exact path, assume valid value
          flatTheme[key] = resolvedValue
        }
      }
    } else {
      // all other values are assumed to be values in their prop's scale
      const scaleValue = get(theme, `${prop.scale}.${value}`)
      flatTheme[key] = scaleValue || null
    }
  }

  return unflatten(flatTheme)
}
