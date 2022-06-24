import camelCase from 'lodash.camelcase'

export function upperCamelCase(string) {
  const camelCaseString = camelCase(string)
  return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1)
}
