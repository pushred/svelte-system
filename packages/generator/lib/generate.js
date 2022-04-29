import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import { propsByCategory, propsByName } from '@svelte-system/props'
import makeDir from 'make-dir'
import * as svelte from 'svelte/compiler'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { generatedComponentsCache } from './caches.js'
import { events, htmlTags, voidHtmlElementTags } from './consts.js'

/**
 * @typedef { import('@svelte-system/types').ComponentDoc } ComponentDoc
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 * @typedef {{ [key: string]: Prop }} PropsByName
 */

const eventForwardingAttributes = events.map((event) => `on:${event}`)

/** @type {ComponentSpec[]} */
const standardComponents = [
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
  {
    defaultProps: {
      display: 'flex',
    },
    filename: 'Flex.svelte',
    name: 'Flex',
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
  {
    defaultProps: {
      as: 'p',
    },
    filename: 'Text.svelte',
    name: 'Text',
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

  if (voidHtmlElementTags.includes(tagName)) {
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

  /** @type ComponentSpec[] */
  const userComponents = Object.keys(theme.components || {}).map((name) => ({
    name,
    defaultProps: theme.components[name],
    filename: `${name}.svelte`,
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
  }))

  const componentsToGenerate = standardComponents.concat(userComponents)

  componentsToGenerate.forEach((component) => {
    /** @type string[] */
    const exports = []

    /** @type string[] */
    const generatedProps = []

    component.props.forEach((category) => {
      const props = propsByCategory[category]
      const defaultProps = (theme.components || {})[component.name]

      props.forEach((prop) => {
        const defaultValue =
          defaultProps && defaultProps[prop.name]
            ? `'${defaultProps[prop.name]}'`
            : 'undefined'

        exports.push(`export let ${prop.name} = ${defaultValue}`)
        generatedProps.push(prop.name)

        if (prop.alias) {
          exports.push(`export let ${prop.alias} = ${defaultValue}`)
          generatedProps.push(prop.alias)
        }
      })
    })

    generatedComponentsCache.set(component.name, { generatedProps })

    const tagName = (theme.components || {}).as || 'div'

    const template = `
      <script>
        import { getClass } from '@svelte-system/helpers'

        export let as = '${tagName}'
        export let testId = undefined
        ${exports.join('\n')}

        let className;
        $: className = getClass({ ${generatedProps.join(', ')} })
      </script>

      ${htmlTags
        .map((tagName, index) =>
          generateTags({
            index,
            isLast: index === htmlTags.length - 1,
            tagName,
            attributes: [
              ...eventForwardingAttributes,
              'data-testid={testId}',
              '{...$$restProps}',
            ],
          })
        )
        .join('\n')}
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
