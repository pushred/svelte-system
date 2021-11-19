import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import groupBy from 'lodash.groupby'
import kebabCase from 'lodash.kebabcase'
import makeDir from 'make-dir'
import * as svelte from 'svelte/compiler'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { props } from './config.js'

/**
 * @typedef { import('@svelte-system/types').ComponentDoc } ComponentDoc
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').PropName } PropName
 * @typedef { import('@svelte-system/types').ScaleValues } ScaleValues
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeCategory } ThemeCategory
 * @typedef {{ [key: string]: Prop }} PropsByName
 */

const propsByCategory = groupBy(props, 'category')

/** @type {PropsByName} */
const initialPropsByName = {}

/** @type {PropsByName} */
const propsByName = props.reduce((accumulator, prop) => {
  accumulator[prop.name] = prop
  return accumulator
}, initialPropsByName)

/** @type {ComponentSpec[]} */
const componentsToGenerate = [
  {
    filename: 'Box.svelte',
    propCategories: ['space'],
  },
]

/**
 * @param {{ outputPath: string, theme: Theme }} options
 */
export function generateComponents({ outputPath, theme }) {
  makeDir.sync(outputPath)

  componentsToGenerate.forEach((component) => {
    /** @type string[] */
    const classes = []

    /** @type string[] */
    const exports = []

    /** @type string[] */
    const styles = []

    component.propCategories.forEach((category) => {
      const propNames = propsByCategory[category].map((prop) => prop.name)

      const themeCategory = theme[category]

      propNames.forEach((prop) => {
        exports.push(`export let ${prop} = undefined`)

        Object.keys(themeCategory).forEach((key) => {
          const cssProp = kebabCase(prop)
          const className = kebabCase(`${prop}-${key}`)
          const value = themeCategory[key]

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

  // return config for logging purposes
  return componentsToGenerate
}

/** @param {{ componentsPath: string, theme: Theme }} options */
export async function getComponentDocs({ componentsPath, theme }) {
  const componentFiles = readdirSync(componentsPath)

  /** @type {ComponentDoc[]} */
  const componentDocs = []

  componentFiles.forEach((filename) => {
    const path = join(componentsPath, filename)
    const source = readFileSync(path, { encoding: 'utf-8' })
    const compilerResult = svelte.compile(source, {})

    componentDocs.push({
      name: basename(filename, '.svelte'),
      props: compilerResult.vars
        .map((prop) => propsByName[prop.name])
        .filter(Boolean)
        .map(
          /** @param {Prop} prop */
          (prop) => {
            if (prop.category === 'any') return prop
            // enrich docs with system values
            return {
              ...prop,
              oneOf: Object.keys(theme[prop.category]),
            }
          }
        ),
    })
  })

  return componentDocs
}
