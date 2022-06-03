import { getBreakpointValues } from './getBreakpointValues.js'
import { isResponsiveValue } from './isResponsiveValue.js'

/**
 * @typedef { import('@svelte-system/types').PropUsageCatalog } PropUsageCatalog
 * @typedef { import('@svelte-system/types').Theme } Theme
 */

/**
 * @param {PropUsageCatalog | {}} accumulator
 * @param {object} data
 * @param {string} data.componentName
 * @param {string} data.propName
 * @param {string | number} data.propValue
 * @param {Theme} data.theme
 * @return {PropUsageCatalog}
 */
export function accumulateProps(
  accumulator = {},
  { componentName, propName, propValue, theme }
) {
  if (accumulator[propName] === undefined) {
    accumulator[propName] = {}
  }

  if (accumulator[propName][componentName] === undefined) {
    accumulator[propName][componentName] = {}
  }

  const component = accumulator[propName][componentName]

  if (typeof propValue === 'string' || typeof propValue === 'number') {
    if (component.all === undefined) component.all = new Set()
    component.all.add(propValue.toString())
    return accumulator
  }

  if (!isResponsiveValue(propValue)) return accumulator

  for (const [breakpointKey, breakpointValue] of Object.entries(
    getBreakpointValues({ theme, value: propValue })
  )) {
    if (component[breakpointKey] === undefined)
      component[breakpointKey] = new Set()
    component[breakpointKey].add(breakpointValue)
  }

  return accumulator
}
