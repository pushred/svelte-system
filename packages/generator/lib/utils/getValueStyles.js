import kebabCase from 'lodash.kebabcase'

import { propUsageCache } from '../caches.js'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

/**
 * @param {Object} params
 * @param {Boolean} params.optimize
 * @param {Prop} params.prop
 * @param {string[]} params.values
 */

export function getValueStyles({ optimize, prop, values }) {
  const classPrefix = prop.alias || prop.name
  const cssProp = kebabCase(prop.name)
  const valuesInUse = propUsageCache.get(prop.name) || new Set()

  /** @type string[] */
  const styles = []

  values.forEach((value) => {
    if (optimize && !valuesInUse.has(value.toString())) {
      return
    }

    /** @type string[] */
    const conditions = []

    conditions.push(`${prop.name} === '${value}'`)
    if (prop.alias) conditions.push(`${prop.alias} === '${value}'`)

    const className = kebabCase(`${classPrefix}-${value}`)

    styles.push(`.${className} { ${cssProp}: ${value} }`)
  })

  return styles
}
