import isPlainObject from 'lodash.isplainobject'
import kebabCase from 'lodash.kebabcase'

import { propUsageCache } from '../caches.js'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 */

/**
 * @param {object} params
 * @param {string} [params.nestedClassPrefix]
 * @param {string} [params.nestedScaleKeyPrefix]
 * @param {boolean} params.optimize
 * @param {Prop} params.prop
 * @param {ThemeScale} params.scale
 */

function generateClassesFromScale({
  nestedClassPrefix,
  nestedScaleKeyPrefix,
  optimize,
  prop,
  scale,
}) {
  const classPrefix = nestedClassPrefix || prop.alias || prop.name
  const valuesInUse = propUsageCache.get(prop.name) || new Set()

  /** @type {string[]} */
  const classes = []

  /** @type {{ [key: string]: (string|number)[] }} */
  const keysByValue = {}

  for (const [key, scaleValue] of Object.entries(scale)) {
    if (
      scaleValue === undefined ||
      scaleValue === false ||
      (optimize && !valuesInUse.has(key))
    ) {
      continue
    }

    if (Array.isArray(scaleValue) || isPlainObject(scaleValue)) {
      const nestedClasses = generateClassesFromScale({
        optimize,
        prop,
        nestedClassPrefix: `${classPrefix}-${key}`,
        nestedScaleKeyPrefix: nestedScaleKeyPrefix
          ? `${nestedScaleKeyPrefix}.${key}`
          : key,
        scale: scaleValue,
      })

      classes.push(...nestedClasses)
    } else if (Array.isArray(keysByValue[scaleValue])) {
      // collect aliases of array values
      keysByValue[scaleValue].push(key)
    } else {
      keysByValue[scaleValue] = [key]
    }
  }

  for (const keys of Object.values(keysByValue)) {
    const classKey = keys[0].toString()

    const conditions = keys.map((key) =>
      nestedScaleKeyPrefix
        ? `${prop.name} === '${nestedScaleKeyPrefix}.${key}'`
        : `${prop.name} === '${key}'`
    )

    if (prop.alias) {
      conditions.push(...keys.map((key) => `${prop.alias} === '${key}'`))
    }

    classes.push(`'${classPrefix}-${classKey}': ${conditions.join(' || ')}`)
  }

  return classes
}

/**
 * @param {object} params
 * @param {boolean} params.optimize
 * @param {Prop} params.prop
 */

function generateClassesFromValues({ optimize, prop }) {
  const classPrefix = prop.alias || prop.name
  const valuesInUse = propUsageCache.get(prop.name) || new Set()

  /** @type string[] */
  const classes = []

  prop.values.forEach((value) => {
    if (optimize && !valuesInUse.has(value.toString())) {
      return
    }

    /** @type string[] */
    const conditions = []

    conditions.push(`${prop.name} === '${value}'`)
    if (prop.alias) conditions.push(`${prop.alias} === '${value}'`)

    const className = kebabCase(`${classPrefix}-${value}`)

    classes.push(`'${className}': ${conditions.join(' || ')}`)
  })

  return classes
}

/**
 * @param {object} params
 * @param {boolean} params.optimize
 * @param {Prop} params.prop
 * @param {Theme} params.theme
 */

export function generateClasses({
  // TODO: component usage
  optimize,
  prop,
  theme,
}) {
  if (prop.scale && theme[prop.scale]) {
    return generateClassesFromScale({
      optimize,
      prop,
      scale: theme[prop.scale],
    })
  }

  if (prop.values) return generateClassesFromValues({ optimize, prop })

  return []
}
