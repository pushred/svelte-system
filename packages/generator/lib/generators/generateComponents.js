import { writeFileSync } from 'fs'
import { join } from 'path'

import { propsByCategory } from '@svelte-system/props'
import makeDir from 'make-dir'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import {
  eventUsageCache,
  generatedComponentsCache,
  propUsageCache,
} from '../caches.js'

import { events } from '../consts.js'
import { components as standardComponents } from './components.js'
import { generateClassProps } from './generateClassProps.js'

/**
 * @typedef { import('@svelte-system/types').ComponentDoc } ComponentDoc
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 * @typedef {{ [key: string]: Prop }} PropsByName
 */

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
        const propUsage = propUsageCache.get(prop.name)
        const valuesInUse = propUsage ? propUsage[component.name] : undefined
        if (optimize && !valuesInUse) return

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

        generatedClassProps.push(
          ...generateClassProps({ component, optimize, prop, theme })
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

  // return config for logging purposes
  return componentsToGenerate
}
