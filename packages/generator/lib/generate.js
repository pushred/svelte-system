import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import makeDir from 'make-dir'
import * as svelte from 'svelte/compiler'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { props as attributeProps } from './props/attributes.js'
import { props as colorProps } from './props/colors.js'
import { props as flexProps } from './props/flex.js'
import { props as layoutProps } from './props/layout.js'
import { props as sizesProps } from './props/sizes.js'
import { props as spaceProps } from './props/space.js'
import { props as typographyProps } from './props/typography.js'

import { getScaleStyles, getValueStyles } from './utils/index.js'

/**
 * @typedef { import('@svelte-system/types').ComponentDoc } ComponentDoc
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 * @typedef {{ [key: string]: Prop }} PropsByName
 */

const props = [
  ...attributeProps,
  ...colorProps,
  ...flexProps,
  ...layoutProps,
  ...sizesProps,
  ...spaceProps,
  ...typographyProps,
]

const propsByCategory = {
  attributes: attributeProps,
  colors: colorProps,
  flex: flexProps,
  layout: layoutProps,
  sizes: sizesProps,
  space: spaceProps,
  typography: typographyProps,
}

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
    props: ['colors', 'flex', 'layout', 'sizes', 'space', 'typography'],
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

    component.props.forEach((category) => {
      const props = propsByCategory[category]

      props.forEach((prop) => {
        let hasStyles = false

        if (prop.scale !== undefined && theme[prop.scale] !== undefined) {
          hasStyles = true

          const generated = getScaleStyles({
            prop,
            scale: theme[prop.scale],
          })
          classes.push(...generated.classes)
          styles.push(...generated.styles)
        }

        if (prop.values) {
          hasStyles = true

          const generated = getValueStyles({
            prop,
            values: prop.values,
          })
          classes.push(...generated.classes)
          styles.push(...generated.styles)
        }

        if (hasStyles) {
          exports.push(`export let ${prop.name} = undefined`)

          if (prop.alias) {
            exports.push(`export let ${prop.alias} = undefined`)
          }
        }
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
            // enrich docs with system values
            const values = []

            if (prop.scale && theme[prop.scale]) {
              values.push(...Object.keys(theme[prop.scale]))
            }

            if (prop.values) values.push(...prop.values)

            return {
              ...prop,
              values,
            }
          }
        ),
    })
  })

  return componentDocs
}
