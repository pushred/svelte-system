import { writeFileSync } from 'fs'
import { join } from 'path'

import { propsByCategory } from '@svelte-system/props'
import makeDir from 'make-dir'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { eventUsageCache, generatedComponentsCache } from '../caches.js'

import { events } from '../consts.js'
import { getPropValueUsage } from '../utils/getPropValueUsage.js'
import { getScaleClassProps } from '../utils/getScaleClassProps.js'
import { getValueClassProps } from '../utils/getValueClassProps.js'

import { components as standardComponents } from './components.js'

/**
 * @typedef { import('@svelte-system/types').ComponentDoc } ComponentDoc
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 * @typedef {{ [key: string]: Prop }} PropsByName
 */

/**
 * @param {object} params
 * @param {boolean} params.optimize
 * @param {Prop} params.prop
 * @param {Theme} params.theme
 */
function generateClassProps({ optimize, prop, theme }) {
  const breakpoints = theme?.breakpoints

  if (prop.scale && theme[prop.scale]) {
    return getScaleClassProps({
      breakpoints,
      optimize,
      prop,
      scale: theme[prop.scale],
    })
  }

  if (prop.values) {
    return getValueClassProps({ breakpoints, optimize, prop })
  }

  return []
}

/**
 * @param {{ optimize: boolean, outputPath: string, theme: Theme }} options
 */
export function generateComponents({ optimize, outputPath, theme }) {
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
    const generatedClassProps = []

    /** @type string[] */
    const generatedProps = []

    component.props.forEach((category) => {
      const props = propsByCategory[category]
      const defaultProps = (theme.components || {})[component.name]

      props.forEach((prop) => {
        const propAliasValueUsage = getPropValueUsage(prop.alias)
        const propNameValueUsage = getPropValueUsage(prop.name)

        if (optimize && !propAliasValueUsage && !propNameValueUsage) return

        const defaultValue =
          defaultProps && defaultProps[prop.name]
            ? `'${defaultProps[prop.name]}'`
            : 'undefined'

        if (!optimize || propNameValueUsage) {
          exports.push(`export let ${prop.name} = ${defaultValue}`)
          generatedProps.push(prop.name)
        }

        if (prop.alias && (!optimize || propAliasValueUsage)) {
          exports.push(`export let ${prop.alias} = ${defaultValue}`)
          generatedProps.push(prop.alias)
        }

        generatedClassProps.push(
          ...generateClassProps({ optimize, prop, theme })
        )
      })
    })

    const eventForwardingAttributes = events
      .filter((event) => {
        if (!optimize) return true
        const eventUsage = eventUsageCache.get(component.name)
        return Boolean(eventUsage?.has(event))
      })
      .map((event) => `on:${event}`)

    generatedComponentsCache.set(component.name, { generatedProps })

    const tagName = (theme.components || {})[component.name]?.as || 'div'

    const template = `
      <script>
        export let as = '${tagName}'
        export let testId = undefined
        ${exports.join('\n')}
      </script>

      <svelte:element
        this={as}
        {...$$restProps}
        ${generatedClassProps.join('\n')}
        data-testid={testId}
        ${eventForwardingAttributes.join(' ')}
      >
        <slot />
      </svelte:element>
    `

    writeFileSync(
      join(outputPath, component.filename),
      // TODO: wrap this in a try/catch once we can use native ESM in Jest
      prettier.format(template, { filepath: component.filename })
    )
  })

  const indexTemplate = componentsToGenerate
    .map(
      (component) =>
        `export { default as ${component.name} } from './${component.name}.svelte'`
    )
    .join('\n')

  writeFileSync(
    join(outputPath, 'index.js'),
    // TODO: wrap this in a try/catch once we can use native ESM in Jest
    prettier.format(indexTemplate, { filepath: 'index.js' })
  )

  // return config for logging purposes
  return componentsToGenerate
}
