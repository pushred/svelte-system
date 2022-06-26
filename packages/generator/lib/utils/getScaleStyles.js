import isPlainObject from 'lodash.isplainobject'
import kebabCase from 'lodash.kebabcase'

import { getPropValueUsage } from './getPropValueUsage.js'
import { transformValue } from './transformValue.js'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Style } Style
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 */

/**
 * @param {object} params
 * @param {Prop} params.prop
 * @param {ThemeScale} params.scale
 * @param {string} [params.nestedClassPrefix]
 * @param {string} [params.nestedScaleKeyPrefix]
 * @returns {Style[]}
 */
export function getScaleStyles({
  nestedClassPrefix,
  nestedScaleKeyPrefix,
  prop,
  scale,
}) {
  const classPrefix = nestedClassPrefix || prop.alias || prop.name
  const propValueUsage = getPropValueUsage(prop.name)
  const aliasPropValueUsage = getPropValueUsage(prop.alias)

  /** @type Style[] */
  const styles = []

  /** @type {{ [key: string]: (string|number)[] }} */
  const keysByValue = {}

  for (const [key, scaleValue] of Object.entries(scale)) {
    if (scaleValue === undefined || scaleValue === false) {
      continue
    }

    if (Array.isArray(scaleValue) || isPlainObject(scaleValue)) {
      const nestedStyles = getScaleStyles({
        prop,
        nestedClassPrefix: `${classPrefix}-${key}`,
        nestedScaleKeyPrefix: nestedScaleKeyPrefix
          ? `${nestedScaleKeyPrefix}.${key}`
          : key,
        scale: scaleValue,
      })

      styles.push(...nestedStyles)
    } else if (Array.isArray(keysByValue[scaleValue])) {
      // collect aliases of array values
      keysByValue[scaleValue].push(key)
    } else {
      keysByValue[scaleValue] = [key]
    }
  }

  for (const [scaleValue, keys] of Object.entries(keysByValue)) {
    styles.push({
      cssProps: prop.cssProps || [kebabCase(prop.name)],
      breakpoints: new Set([
        ...(propValueUsage?.[keys[0]] || new Set()),
        ...(aliasPropValueUsage?.[keys[0]] || new Set()),
      ]),
      className: kebabCase(`${classPrefix}-${keys[0]}`),
      value: transformValue(scaleValue, prop.transform),
    })
  }

  return styles
}
