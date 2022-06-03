import isPlainObject from 'lodash.isplainobject'

/**
 * @typedef { import('@svelte-system/types').Theme } Theme
 */

/**
 * @param {{ theme: Theme, value: number[]|string[] }} options
 * @return {{ [key: string]: string } | {}}
 */
export function getBreakpointValues({ theme, value }) {
  if (!theme.breakpoints || !Object.keys(theme.breakpoints).length) return {}

  const breakpoints = Object.keys(theme.breakpoints)
  const breakpointValues = {}

  if (isPlainObject(value)) {
    breakpoints.forEach((key) => {
      if (value[key] === undefined) return
      breakpointValues[key] = value[key].toString()
    })
  }

  if (Array.isArray(value)) {
    value.forEach((breakpointValue, index) => {
      breakpointValues[breakpoints[index]] = breakpointValue.toString()
    })
  }

  return breakpointValues
}
