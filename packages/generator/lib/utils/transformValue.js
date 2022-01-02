/**
 * @typedef { import('@svelte-system/types').ValueTransforms } ValueTransforms
 */

/**
 * @param {number|string} value
 * @param {ValueTransforms} transform
 */
export function transformValue(value, transform = 'pixels') {
  if (transform === 'string') return value.toString()

  const hasUnit = typeof value === 'string' && /[a-z]/.test(value)
  if (hasUnit) return value

  if (typeof value === 'number' && transform === 'pixels') {
    return `${value}px`
  } else if (typeof value === 'number') {
    return value.toString()
  }

  // handle string input
  const parsedValue = parseFloat(value)

  if (Number.isNaN(parsedValue)) return value // invalid, return as-is to defer error checking
  if (parsedValue === 0) return '0'

  return `${value}px`
}
