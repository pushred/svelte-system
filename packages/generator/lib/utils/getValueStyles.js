import kebabCase from 'lodash.kebabcase'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

/**
 * @param {{ prop: Prop, values: string[] }}
 */

export function getValueStyles({ prop, values }) {
  const classPrefix = prop.alias || prop.name
  const cssProp = kebabCase(prop.name)

  /** @type string[] */
  const classes = []

  /** @type string[] */
  const styles = []

  values.forEach((value) => {
    /** @type string[] */
    const conditions = []

    conditions.push(`${prop.name} === '${value}'`)
    if (prop.alias) conditions.push(`${prop.alias} === '${value}'`)

    const className = kebabCase(`${classPrefix}-${value}`)

    classes.push(`class:${className}={${conditions.join(' || ')}}`)
    styles.push(`.${className} { ${cssProp}: ${value} }`)
  })

  return {
    classes,
    styles,
  }
}
