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
 * @param {boolean} params.optimize
 * @param {Prop} params.prop
 */
export function getValueClassProps({ breakpoints, optimize, prop }) {
  const classPrefix = prop.alias || prop.name
  const propNameValueUsage = getPropValueUsage(prop.name)
  const propAliasValueUsage = getPropValueUsage(prop.alias)

  /** @type string[] */
  const classes = []

  prop.values.forEach((value) => {
    const className = kebabCase(`${classPrefix}-${value}`)
    const hasPropAliasUsage = propAliasValueUsage?.[value]?.has('all')
    const hasPropNameUsage = propNameValueUsage?.[value]?.has('all')

    if (!optimize || hasPropNameUsage || hasPropAliasUsage) {
      const conditions = getClassConditions({
        hasPropNameUsage,
        hasPropAliasUsage,
        optimize,
        prop,
        propValue: value,
      })

      classes.push(`class:${className}={${conditions.join(' || ')}}`)
    }

    // responsive classes

    if (!breakpoints) return classes

    Object.keys(breakpoints).forEach((breakpointKey, breakpointIndex) => {
      const hasBreakpointPropAliasUsage = propAliasValueUsage?.[value]?.has(
        breakpointKey
      )
      const hasBreakpointPropNameUsage = propNameValueUsage?.[value]?.has(
        breakpointKey
      )

      if (
        optimize &&
        !hasBreakpointPropAliasUsage &&
        !hasBreakpointPropNameUsage
      ) {
        return
      }

      const conditions = getClassConditions({
        breakpointKey,
        breakpointIndex,
        optimize,
        prop,
        hasPropAliasUsage: hasBreakpointPropAliasUsage,
        hasPropNameUsage: hasBreakpointPropNameUsage,
        propValue: value,
      })

      classes.push(
        `class:${breakpointKey}:${className}={${conditions.join(' || ')}}`
      )
    })
  })

  return classes
}
