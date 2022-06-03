import isPlainObject from 'lodash.isplainobject'
import kebabCase from 'lodash.kebabcase'

import { getClassConditions } from './getClassConditions.js'
import { getPropValueUsage } from './getPropValueUsage.js'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeBreakpoints } ThemeBreakpoints
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 */

/**
 * @param {object} params
 * @param {ThemeBreakpoints} [params.breakpoints]
 * @param {string} [params.nestedClassPrefix]
 * @param {string} [params.nestedScaleKeyPrefix]
 * @param {boolean} params.optimize
 * @param {Prop} params.prop
 * @param {ThemeScale} params.scale
 */
export function getScaleClassProps({
  breakpoints,
  nestedClassPrefix,
  nestedScaleKeyPrefix,
  optimize,
  prop,
  scale,
}) {
  const classPrefix = nestedClassPrefix || prop.alias || prop.name
  const propAliasValueUsage = getPropValueUsage(prop.alias)
  const propNameValueUsage = getPropValueUsage(prop.name)

  /** @type {string[]} */
  const classes = []

  /** @type {{ [key: string]: (string|number)[] }} */
  const keysByValue = {}

  for (const [key, scaleValue] of Object.entries(scale)) {
    if (scaleValue === undefined || scaleValue === false) {
      continue
    }

    if (Array.isArray(scaleValue) || isPlainObject(scaleValue)) {
      const nestedClasses = getScaleClassProps({
        breakpoints,
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
    const className = kebabCase(`${classPrefix}-${classKey}`)

    const usageKey = nestedScaleKeyPrefix
      ? `${nestedScaleKeyPrefix}.${classKey}`
      : classKey

    const hasPropAliasUsage = propAliasValueUsage?.[usageKey]?.has('all')
    const hasPropNameUsage = propNameValueUsage?.[usageKey]?.has('all')

    if (!optimize || hasPropNameUsage || hasPropAliasUsage) {
      const conditions = keys
        .map((key) =>
          getClassConditions({
            prop,
            hasPropNameUsage,
            hasPropAliasUsage,
            optimize,
            propValue: key.toString(),
            propValuePrefix: nestedScaleKeyPrefix,
          })
        )
        .map((condition) => condition.join(' || '))

      classes.push(`class:${className}={${conditions.join(' || ')}}`)
    }

    if (!breakpoints) continue

    Object.keys(breakpoints).forEach((breakpointKey, breakpointIndex) => {
      const hasBreakpointPropAliasUsage = propAliasValueUsage?.[usageKey]?.has(
        breakpointKey
      )
      const hasBreakpointPropNameUsage = propNameValueUsage?.[usageKey]?.has(
        breakpointKey
      )

      if (
        optimize &&
        !hasBreakpointPropAliasUsage &&
        !hasBreakpointPropNameUsage
      ) {
        return
      }

      const conditions = keys
        .map((key) =>
          getClassConditions({
            breakpointIndex,
            breakpointKey,
            optimize,
            prop,
            hasPropAliasUsage: hasBreakpointPropAliasUsage,
            hasPropNameUsage: hasBreakpointPropNameUsage,
            propValue: key.toString(),
            propValuePrefix: nestedScaleKeyPrefix,
          })
        )
        .map((condition) => condition.join(' || '))

      classes.push(
        `class:${breakpointKey}:${className}={${conditions.join(' || ')}}`
      )
    })
  }

  return classes
}
