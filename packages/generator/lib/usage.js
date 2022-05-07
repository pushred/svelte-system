// @ts-nocheck
// see: https://github.com/Rich-Harris/estree-walker/issues/28

import { readFileSync } from 'fs'
import { resolve } from 'path'

import { walk } from 'estree-walker'
import { globby } from 'globby'
import { parse } from 'svelte/compiler'

import { propUsageCache } from './caches.js'

/**
 * @param {{
 *  [key: string]: { [key:string]: string[] }
 * }} catalog
 */
function cachePropValues(catalog) {
  for (const [propName, componentUsage] of Object.entries(catalog)) {
    for (const [componentName, values] of Object.entries(componentUsage)) {
      const cachedValues = propUsageCache.get(propName) || {}

      propUsageCache.set(propName, {
        ...cachedValues,
        [componentName]: cachedValues[componentName]
          ? new Set([...cachedValues[componentName], ...values])
          : new Set(values),
      })
    }
  }
}

/**
 * @typedef { import('@svelte-system/types').Theme } Theme
 */

/**
 * @param {{ outputPath: string, projectPath: string, theme: Theme }} options
 */
export async function detectPropUsage({ outputPath, projectPath, theme }) {
  const globPath = resolve(projectPath, '**', '*.svelte')
  const paths = await globby([globPath, `!${outputPath}`])

  // populate cache with default props from configured theme components

  const defaultProps = {}

  for (const [componentName, props] of Object.entries(theme.components || {})) {
    for (const [name, value] of Object.entries(props)) {
      if (
        Array.isArray(value) &&
        defaultProps[name] &&
        Array.isArray(defaultProps[name][componentName])
      ) {
        defaultProps[name][componentName].push(
          ...value.map((v) => v.toString())
        )
      } else if (defaultProps[name]) {
        defaultProps[name][componentName] = Array.isArray(value)
          ? value.map((v) => v.toString())
          : [value.toString()]
      } else {
        defaultProps[name] = {
          [componentName]: Array.isArray(value)
            ? value.map((v) => v.toString())
            : [value.toString()],
        }
      }
    }
  }

  cachePropValues(defaultProps)

  // populate cache with props from project file usage

  paths.forEach((filePath) => {
    const source = readFileSync(filePath, 'utf-8')

    const ast = parse(source)

    walk(ast.html, {
      enter(node) {
        if (node.type !== 'InlineComponent') return

        const componentName = node.name
        const detectedProps = {}

        function catalogPropValue(propName, value) {
          if (!detectedProps[propName]) detectedProps[propName] = {}

          if (!detectedProps[propName][componentName]) {
            detectedProps[propName][componentName] = new Set()
          }

          const stringValue = value.toString()
          const prop = detectedProps[propName][componentName]

          if (prop.has(stringValue)) return
          prop.add(stringValue)
        }

        node.attributes.forEach((prop) => {
          if (
            prop.type !== 'Attribute' ||
            !Array.isArray(prop.value) ||
            prop.value.length === 0
          ) {
            return
          }

          const propName = prop.name
          const value = prop.value[0]

          if (value.type === 'Text') {
            catalogPropValue(propName, value.data)
          }

          if (value.type !== 'MustacheTag') return

          if (value.expression.type === 'Literal') {
            catalogPropValue(propName, value.expression.value)
          }

          if (value.expression.type === 'ArrayExpression') {
            value.expression.elements.forEach((arrayNode) => {
              if (arrayNode.type === 'Literal') {
                catalogPropValue(propName, arrayNode.value)
              }
            })
          }
        })

        cachePropValues(detectedProps)
      },
    })
  })
}
