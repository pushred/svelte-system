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

const isTest = process.env.NODE_ENV === 'test'

/** @type {ComponentSpec[]} */
const componentsToGenerate = [
  {
    filename: 'Box.svelte',
    name: 'Box',
    props: [
      'borders',
      'colors',
      'flex',
      'layout',
      'radii',
      'sizes',
      'space',
      'typography',
    ],
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

const voidElementTags = ['img', 'input']

// static list temporary till https://github.com/sveltejs/svelte/pull/6898
const tags = [
  ...voidElementTags,
  'a',
  'abbr',
  'blockquote',
  'button',
  'code',
  'del',
  'div',
  'dfn',
  'em',
  'figcaption',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'ins',
  'kbd',
  'label',
  'li',
  'main',
  'mark',
  'nav',
  'ol',
  'p',
  'pre',
  'q',
  'section',
  'select',
  'small',
  'span',
  'strong',
  'table',
  'td',
  'time',
  'tr',
  'ul',
  'var',
  'video',
]

/**
 * @param {{
 *  attributes: string[],
 *  index: number,
 *  isLast: boolean,
 *  tagName: string
 * }} options
 */
function generateTags({ attributes, index, isLast, tagName }) {
  let output = ''

  if (index === 0) {
    output += `{#if as === '${tagName}'}\n`
  } else {
    output += `{:else if as === '${tagName}'}\n`
  }

  if (voidElementTags.includes(tagName)) {
    output += `<${tagName}
      class={className}
      ${attributes.join(' ')}
    />`
  } else {
    output += `<${tagName}
      class={className}
      ${attributes.join(' ')}
    >
      <slot />
    </${tagName}>`
  }

  if (isLast) output += '{/if}'
  return output
}

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

    // handle babel vs. rollup/vite ESM difference
    const clsxImport = isTest
      ? `import * as clsx from 'clsx'`
      : `import clsx from 'clsx'`

    // peer dependency on clsx temporary till https://github.com/sveltejs/svelte/pull/6898
    const template = `
      <script>
        ${clsxImport}

        export let as = 'div'
        export let testId = undefined
        ${exports.join('\n')}

        const className = clsx({ ${classes.join(', ')} })
      </script>

      ${tags
        .map((tagName, index) =>
          generateTags({
            index,
            isLast: index === tags.length - 1,
            tagName,
            attributes: ['data-testid={testId}'],
          })
        )
        .join('\n')}

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
 * @param {{ outputPath: string, theme: Theme }} options
 */
export function generateDerivedComponents({ outputPath, theme }) {
  const derivedComponents = derivedComponentsToGenerate.concat(
    Object.keys(theme.components || {}).map((name) => ({
      name,
      defaultProps: theme.components[name],
      filename: `${name}.svelte`,
      sourceComponent: 'Box',
    }))
  )

  derivedComponents.forEach((component) => {
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
  return derivedComponents
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
