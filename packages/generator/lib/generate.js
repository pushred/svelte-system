import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import { propsByCategory, propsByName } from '@svelte-system/props'
import makeDir from 'make-dir'
import * as svelte from 'svelte/compiler'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { generatedComponentsCache } from './caches.js'
import { getScaleStyles, getValueStyles } from './utils/index.js'

/**
 * @typedef { import('@svelte-system/types').ComponentDoc } ComponentDoc
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').DerivedComponentSpec } DerivedComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 * @typedef {{ [key: string]: Prop }} PropsByName
 */

/** @type {ComponentSpec[]} */
const componentsToGenerate = [
  {
    filename: 'Box.svelte',
    name: 'Box',
    props: ['colors', 'flex', 'layout', 'sizes', 'space', 'typography'],
  },
]

/** @type {DerivedComponentSpec[]} */
const derivedComponentsToGenerate = [
  {
    defaultProps: {
      display: 'flex',
    },
    filename: 'Flex.svelte',
    name: 'Flex',
    sourceComponent: 'Box',
  },
  {
    defaultProps: {
      as: 'p',
    },
    filename: 'Text.svelte',
    name: 'Text',
    sourceComponent: 'Box',
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
    const generatedProps = []

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
          generatedProps.push(prop.name)

          if (prop.alias) {
            exports.push(`export let ${prop.alias} = undefined`)
            generatedProps.push(prop.alias)
          }
        }
      })
    })

    generatedComponentsCache.set(component.name, { generatedProps })

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

/**
 * @param {{ outputPath: string }} options
 */
export function generateDerivedComponents({ outputPath }) {
  derivedComponentsToGenerate.forEach((component) => {
    /** @type string[] */
    const exports = []

    /** @type string[] */
    const props = []

    const { defaultProps, sourceComponent } = component
    const { generatedProps } = generatedComponentsCache.get(sourceComponent)

    if (defaultProps) {
      for (const [prop, value] of Object.entries(defaultProps)) {
        props.push(`${prop}="${value}"`)
      }
    }

    generatedProps.forEach(
      /** @param {string} prop */
      (prop) => {
        if (defaultProps && defaultProps[prop] !== undefined) return
        exports.push(`export let ${prop} = undefined`)
        props.push(`{${prop}}`)
      }
    )

    const template = `
      <script>
        import ${sourceComponent} from './${sourceComponent}.svelte'

        export let testId = undefined
        ${exports.join('\n')}
      </script>

      <${sourceComponent}
        testId={testId}
        ${props.join('\n')}
      >
        <slot />
      </${sourceComponent}>
    `

    writeFileSync(
      join(outputPath, component.filename),
      // TODO: wrap this in a try/catch once we can use native ESM in Jest
      prettier.format(template, { filepath: component.filename })
    )
  })

  // return config for logging purposes
  return derivedComponentsToGenerate
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
