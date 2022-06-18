import { readFileSync } from 'fs'
import { basename, join, posix } from 'path'

import { propsByName } from '@svelte-system/props'
import { globbySync } from 'globby'
import * as svelte from 'svelte/compiler'

/**
 * @typedef { import('@svelte-system/types').ComponentDoc } ComponentDoc
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 * @typedef { import('@svelte-system/types').Prop } Prop
 * @typedef { import('@svelte-system/types').Theme } Theme
 * @typedef { import('@svelte-system/types').ThemeScale } ThemeScale
 * @typedef {{ [key: string]: Prop }} PropsByName
 */

/** @param {{ componentsPath: string, theme: Theme }} options */
export function generateDocs({ componentsPath, theme }) {
  const componentFiles = globbySync(posix.join(componentsPath, '*.svelte'))

  /** @type {ComponentDoc[]} */
  const componentDocs = []

  componentFiles.forEach((componentPath) => {
    const source = readFileSync(componentPath, { encoding: 'utf-8' })
    const compilerResult = svelte.compile(source, {})

    componentDocs.push({
      name: basename(componentPath, '.svelte'),
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
