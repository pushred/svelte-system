/**
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeBreakpoints } ThemeBreakpoints
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 */

/**
 * @param {object} params
 * @param {number} [params.breakpointIndex]
 * @param {string} [params.breakpointKey]
 * @param {boolean} [params.hasPropAliasUsage]
 * @param {boolean} [params.hasPropNameUsage]
 * @param {boolean} params.optimize
 * @param {Prop} params.prop
 * @param {string} params.propValue
 * @param {string} [params.propValuePrefix]
 * @return {string[]}
 */
export function getClassConditions({
  breakpointIndex,
  breakpointKey,
  hasPropAliasUsage,
  hasPropNameUsage,
  optimize,
  prop,
  propValue,
  propValuePrefix,
}) {
  const isNumberValue = Number.isNaN(parseFloat(propValue)) === false
  const isResponsive =
    breakpointIndex !== undefined && breakpointKey !== undefined

  /** @type {[string, '===', string][]} */
  const conditions = []

  let value = propValue
  if (propValuePrefix) value = `${propValuePrefix}.${propValue}`

  if (isResponsive && (!optimize || hasPropNameUsage)) {
    conditions.push([`${prop.name}?.${breakpointKey}`, '===', `'${value}'`])
    conditions.push([`${prop.name}?.[${breakpointIndex}]`, '===', `'${value}'`])
  }

  if (isResponsive && prop.alias && (!optimize || hasPropAliasUsage)) {
    conditions.push([`${prop.alias}?.${breakpointKey}`, '===', `'${value}'`])
    conditions.push([
      `${prop.alias}?.[${breakpointIndex}]`,
      '===',
      `'${value}'`,
    ])
  }

  if (!isResponsive && (!optimize || hasPropNameUsage)) {
    conditions.push([`${prop.name}`, '===', `'${value}'`])
  }

  if (!isResponsive && prop.alias && (!optimize || hasPropAliasUsage)) {
    conditions.push([`${prop.alias}`, '===', `'${value}'`])
  }

  return isNumberValue && !propValuePrefix
    ? conditions.map(
        ([key, operator, value]) => `String(${key}) ${operator} ${value}`
      )
    : conditions.map((condition) => condition.join(' '))
}
