import { writeFileSync } from 'fs'
import { join } from 'path'

import { allProps, propsByCategory } from '@svelte-system/props'
import makeDir from 'make-dir'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { components as standardComponents } from './components.js'
import { generateTypes } from './generateTypes.js'
import { eventUsageCache, generatedComponentsCache } from '../caches.js'
import { events } from '../consts.js'
import { getPropValueUsage } from '../utils/getPropValueUsage.js'
import { getScaleClassProps } from '../utils/getScaleClassProps.js'
import { getValueClassProps } from '../utils/getValueClassProps.js'

import { getPropScaleTypeName, getPropValuesTypeName } from './generateTypes.js'

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
 * @param {object} params
 * @param {boolean} params.optimize
 * @param {string} params.outputPath
 * @param {Theme} params.theme
 * @param {boolean} params.typescript
 */
export function generateComponents({
  optimize,
  outputPath,
  theme,
  typescript,
}) {
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

    /** @type string[] */
    const generatedPropTypes = []

    /** @type Set<string> */
    const requiredTypes = new Set()

    component.props.forEach((category) => {
      const props = propsByCategory[category]
      const defaultProps = (theme.components || {})[component.name]

      props.forEach((prop) => {
        const hasScaleConfig = prop.scale && theme[prop.scale]
        const propAliasValueUsage = getPropValueUsage(prop.alias)
        const propNameValueUsage = getPropValueUsage(prop.name)

        if (!prop.values && !hasScaleConfig) return
        if (optimize && !propAliasValueUsage && !propNameValueUsage) return

        const defaultValue =
          defaultProps && defaultProps[prop.name]
            ? `'${defaultProps[prop.name]}'`
            : 'undefined'

        const typeName = prop.scale
          ? getPropScaleTypeName(prop.scale)
          : getPropValuesTypeName(prop.name)

        if (!optimize || propNameValueUsage) {
          exports.push(`export let ${prop.name} = ${defaultValue}`)
          generatedProps.push(prop.name)
          generatedPropTypes.push(`${prop.name}?: ${typeName}`)
          requiredTypes.add(typeName)
        }

        if (prop.alias && (!optimize || propAliasValueUsage)) {
          exports.push(`export let ${prop.alias} = ${defaultValue}`)
          generatedProps.push(prop.alias)
          generatedPropTypes.push(`${prop.alias}?: ${typeName}`)
          requiredTypes.add(typeName)
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

    // write component

    const tagName = (theme.components || {})[component.name]?.as || 'div'
    const scriptLang = typescript ? `lang="ts"` : ''

    const componentTemplate = `
      <script ${scriptLang}>
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
      prettier.format(componentTemplate, { filepath: component.filename })
    )

    // write type definitions

    const typeImports = [...requiredTypes].join(', ')

    // prettier-ignore
    const typeDefinitionTemplate = `
      import { SvelteComponentTyped } from 'svelte'
      import { ${typeImports} } from './types'

      export interface ${component.name}Props {
        ${generatedPropTypes.join('\n')}
      }

      export default class ${component.name} extends SvelteComponentTyped<${component.name}Props, {}, {}> {}
    `

    writeFileSync(
      join(outputPath, `${component.filename}.d.ts`),
      // TODO: wrap this in a try/catch once we can use native ESM in Jest
      prettier.format(typeDefinitionTemplate, {
        filepath: `${component.filename}.d.ts`,
      })
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

  const types = generateTypes({ optimize, theme, props: allProps }).join('\n\n')

  writeFileSync(
    join(outputPath, 'types.d.ts'),
    // TODO: wrap this in a try/catch once we can use native ESM in Jest
    prettier.format(types, { filepath: 'types.d.ts' })
  )

  // return config for logging purposes
  return componentsToGenerate
}
