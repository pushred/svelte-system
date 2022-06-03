import isPlainObject from 'lodash.isplainobject'

/**
 * @param {number[] | string[] | { [key: string]: number|string }} value
 */
export function isResponsiveValue(value) {
  return Array.isArray(value) || isPlainObject(value)
}
