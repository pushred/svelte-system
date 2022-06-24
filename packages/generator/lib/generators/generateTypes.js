import { getPropValueUsage } from '../utils/getPropValueUsage.js'
import { upperCamelCase } from '../utils/upperCamelCase.js'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScaleName } ThemeScaleName
 */

/**
 * @param {ThemeScaleName} scaleKey
 */
export function getPropScaleTypeName(scaleKey) {
  return `${upperCamelCase(scaleKey)}Values`
}

/**
 * @param {string} propName
 */
export function getPropValuesTypeName(propName) {
  return `${upperCamelCase(propName)}Values`
}

/**
 * @param {object} params
 * @param {boolean} params.optimize
 * @param {Prop[]} params.props
 * @param {Theme} params.theme
 */
export function generateTypes({ optimize = false, props, theme }) {
  return [
    ...props.map((prop) => {
      if (!prop.values) return null

      const usage = getPropValueUsage(prop.name)
      if (optimize && usage === undefined) return null

      const name = getPropValuesTypeName(prop.name)

      const unionValues = prop.values
        .filter((value) => !optimize || usage[value])
        .map((value) => `'${value}'`)
        .join(' | ')

      return `export type ${name} = ${unionValues};`
    }),
    ...Object.keys(theme).map(
      /** @param {ThemeScaleName} scaleKey */
      (scaleKey) => {
        if (!theme[scaleKey]) return null

        const name = getPropScaleTypeName(scaleKey)

        const unionValues = Object.keys(theme[scaleKey])
          .sort()
          .reduce((accumulator, increment) => {
            const maybeNumberValue = parseFloat(increment)

            if (Number.isNaN(maybeNumberValue)) {
              accumulator.push(`'${increment}'`)
            } else {
              // include scale increments as both string and number types
              accumulator.push(`'${increment}'`)
              accumulator.push(maybeNumberValue)
            }

            return accumulator
          }, [])
          .sort((a, b) => {
            // sort number values first to prefer and for scale visibility
            if (typeof a === typeof b) return 0
            if (typeof a === 'string' && typeof b === 'number') return 1
            if (typeof a === 'number' && typeof b === 'string') return -1
          })
          .join(' | ')

        return `export type ${name} = ${unionValues};`
      }
    ),
  ].filter(Boolean)
}
