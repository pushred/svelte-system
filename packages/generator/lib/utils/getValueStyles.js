import kebabCase from 'lodash.kebabcase'

import { getPropValueUsage } from './getPropValueUsage.js'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Style } Style
 */

/**
 * @param {Object} params
 * @param {Prop} params.prop
 * @param {string[]} params.values
 * @returns {Style[]}
 */
export function getValueStyles({ prop, values }) {
  const classPrefix = prop.alias || prop.name
  const propValueUsage = getPropValueUsage(prop.name)
  const aliasPropValueUsage = getPropValueUsage(prop.alias)

  /** @type Style[] */
  const styles = []

  for (const value of values) {
    styles.push({
      value,
      breakpoints: new Set([
        ...(propValueUsage?.[value] || new Set()),
        ...(aliasPropValueUsage?.[value] || new Set()),
      ]),
      className: kebabCase(`${classPrefix}-${value}`),
      cssProp: kebabCase(prop.name),
    })
  }

  return styles
}
