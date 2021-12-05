import isPlainObject from 'lodash.isplainobject'
import kebabCase from 'lodash.kebabcase'

import { transformValue } from './transformValue.js'

/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 */

/**
 * @param {Object} params
 * @param {Prop} params.prop
 * @param {ThemeScale} params.scale
 * @param {string} [params.nestedClassPrefix]
 * @param {string} [params.nestedScaleKeyPrefix]
 */

export function getScaleStyles({
  nestedClassPrefix,
  nestedScaleKeyPrefix,
  prop,
  scale,
}) {
  const classPrefix = nestedClassPrefix || prop.alias || prop.name
  const cssProp = kebabCase(prop.name)

  /** @type string[] */
  const classes = []

  /** @type string[] */
  const styles = []

  /** @type {{ [key: string]: (string|number)[] }} */
  const keysByValue = {}

  for (const [key, scaleValue] of Object.entries(scale)) {
    if (scaleValue === undefined || scaleValue === false) {
      return {
        classes,
        styles,
      }
    }

    if (Array.isArray(scaleValue) || isPlainObject(scaleValue)) {
      const nestedStyles = getScaleStyles({
        prop,
        nestedClassPrefix: `${classPrefix}-${key}`,
        nestedScaleKeyPrefix: nestedScaleKeyPrefix
          ? `${nestedScaleKeyPrefix}.${key}`
          : key,
        scale: scaleValue,
      })

      classes.push(...nestedStyles.classes)
      styles.push(...nestedStyles.styles)
    } else if (Array.isArray(keysByValue[scaleValue])) {
      // collect aliases of array values
      keysByValue[scaleValue].push(key)
    } else {
      keysByValue[scaleValue] = [key]
    }
  }

  /** @type {{ [key: string]: { conditions: string[], classKey: string } }} */
  const classesToCreate = {}

  for (const [scaleValue, keys] of Object.entries(keysByValue)) {
    classesToCreate[scaleValue] = {
      classKey: keys[0].toString(),
      conditions: keys.map((key) =>
        nestedScaleKeyPrefix
          ? `${prop.name} === '${nestedScaleKeyPrefix}.${key}'`
          : `${prop.name} === '${key}'`
      ),
    }

    if (prop.alias) {
      classesToCreate[scaleValue].conditions.push(
        ...keys.map((key) => `${prop.alias} === '${key}'`)
      )
    }
  }

  for (const [scaleValue, classToCreate] of Object.entries(classesToCreate)) {
    const value = transformValue(scaleValue)
    const { classKey, conditions } = classToCreate
    const className = kebabCase(`${classPrefix}-${classKey}`)

    classes.push(`class:${className}={${conditions.join(' || ')}}`)
    styles.push(`.${className} { ${cssProp}: ${value} }`)
  }

  return {
    classes,
    styles,
  }
}
