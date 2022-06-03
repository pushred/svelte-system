// @ts-nocheck
// see: https://github.com/Rich-Harris/estree-walker/issues/28

import { readFileSync } from 'fs'
import { resolve } from 'path'

import { walk } from 'estree-walker'
import { globby } from 'globby'
import { parse } from 'svelte/compiler'

import { accumulateProps, cacheEvent, cachePropValues } from './utils/index.js'

/**
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').PropUsageCatalog } PropUsageCatalog
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
    for (const [propName, propValue] of Object.entries(props)) {
      accumulateProps(defaultProps, {
        componentName,
        propName,
        propValue,
        theme,
      })
    }
  }

  cachePropValues(defaultProps)

  // populate cache with props and event handlers used in project

  paths.forEach((filePath) => {
    const source = readFileSync(filePath, 'utf-8')

    const ast = parse(source)

    walk(ast.html, {
      enter(node) {
        if (node.type !== 'InlineComponent') return

        const componentName = node.name

        /** @type PropUsageCatalog */
        const detectedProps = {}

        node.attributes.forEach((prop) => {
          if (prop.type === 'EventHandler') {
            return cacheEvent({ componentName, event: prop.name })
          }

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
            accumulateProps(detectedProps, {
              componentName,
              propName,
              theme,
              propValue: value.data,
            })
          }

          if (value.type !== 'MustacheTag') return

          if (value.expression.type === 'ConditionalExpression') {
            walk(value, {
              enter(conditionalNode) {
                if (conditionalNode.type === 'Literal') {
                  accumulateProps(detectedProps, {
                    componentName,
                    propName,
                    theme,
                    propValue: conditionalNode.value,
                  })
                }
              },
            })
          }

          if (value.expression.type === 'Literal') {
            accumulateProps(detectedProps, {
              componentName,
              propName,
              theme,
              propValue: value.expression.value,
            })
          }

          if (value.expression.type === 'ArrayExpression') {
            const arrayValue = value.expression.elements
              .map((arrayNode) => {
                if (arrayNode.type === 'Literal') return arrayNode.value
                return null
              })
              .filter(Boolean)

            value.expression.elements.forEach((arrayNode) => {
              if (arrayNode.type === 'Literal') {
                accumulateProps(detectedProps, {
                  componentName,
                  propName,
                  theme,
                  propValue: arrayValue,
                })
              }
            })
          }
        })

        cachePropValues(detectedProps)
      },
    })
  })
}
