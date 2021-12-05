/**
 * @param {number|string} value
 */
export function transformValue(value) {
  const hasUnit = typeof value === 'string' && /[a-z]/.test(value)
  if (hasUnit) return value

  if (typeof value === 'number') {
    return `${value}px`
  }

  const parsedValue = parseFloat(value)

  if (Number.isNaN(parsedValue)) return value // invalid, return as-is to defer error checking
  if (parsedValue === 0) return '0'

  return `${value}px`
}
