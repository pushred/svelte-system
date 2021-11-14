import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import groupBy from 'lodash.groupby'
import kebabCase from 'lodash.kebabcase'
import makeDir from 'make-dir'
import * as svelte from 'svelte/compiler'
import { buildDocs } from '@svelte-system/docs'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { props } from './config.js'

const propsByCategory = groupBy(props, 'category')

const propsByName = props.reduce((accumulator, prop) => {
  accumulator[prop.name] = prop
  return accumulator
}, {})

const components = [
  {
    filename: 'Box.svelte',
    propCategories: ['space'],
  },
]

export function generateComponents({ outputPath, theme } = {}) {
  if (!outputPath) throw new Error('Missing required `outputPath` argument')
  if (!theme) throw new Error('Missing required `theme` argument')

  makeDir.sync(outputPath)

  components.forEach((component) => {
    const classes = []
    const exports = []
    const styles = []

    component.propCategories.forEach((category) => {
      const propNames = propsByCategory[category].map((prop) => prop.name)

      propNames.forEach((prop) => {
        exports.push(`export let ${prop} = undefined`)

        Object.keys(theme[category]).forEach((key) => {
          const cssProp = kebabCase(prop)
          const className = kebabCase(`${prop}-${key}`)
          const value = theme[category][key]

          classes.push(`class:${className}={${prop} === '${key}'}`)
          styles.push(`.${className} { ${cssProp}: ${value} }`)
        })
      })
    })

    const template = `
      <script>
        export let testId = undefined
        ${exports.join('\n')}
      </script>

      <div ${classes.join(' ')} data-testid={testId}>
        <slot />
      </div>

      <style>
        ${styles.join('\n')}
      </style>
    `

    writeFileSync(
      join(outputPath, component.filename),
      // TODO: wrap this in a try/catch once we can use native ESM in Jest
      prettier.format(template, { filepath: component.filename })
    )
  })

  return components
}

export async function generateDocs({ componentsPath, outputPath, theme } = {}) {
  if (!componentsPath)
    throw new Error('Missing required `componentsPath` argument')
  if (!outputPath) throw new Error('Missing required `outputPath` argument')
  if (!theme) throw new Error('Missing required `theme` argument')

  const componentFiles = readdirSync(componentsPath)
  const components = []

  componentFiles.forEach((filename) => {
    const path = join(componentsPath, filename)
    const source = readFileSync(path, { encoding: 'utf-8' })
    const compilerResult = svelte.compile(source, {})

    components.push({
      name: basename(filename, '.svelte'),
      props: compilerResult.vars
        .map((prop) => propsByName[prop.name])
        .filter(Boolean)
        .map((prop) => {
          if (prop.category === 'any') return prop
          return {
            ...prop,
            oneOf: Object.keys(theme[prop.category]),
          }
        }),
    })
  })

  return buildDocs({ components, outputPath })
}
