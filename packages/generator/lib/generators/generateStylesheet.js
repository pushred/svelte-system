import { writeFileSync } from 'fs'
import { basename, dirname } from 'path'

import { propsByCategory } from '@svelte-system/props'
import makeDir from 'make-dir'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { propUsageCache } from '../caches.js'
import { getScaleStyles, getValueStyles } from '../utils/index.js'

/**
 * @typedef { import('@svelte-system/types').Theme } Theme
 */

/**
 * @param {{ optimize: boolean, outputPath: string, theme: Theme }} options
 */
export function generateStylesheet({ optimize, outputPath, theme }) {
  makeDir.sync(dirname(outputPath))

  const categories = [
    'borders',
    'colors',
    'flex',
    'layout',
    'radii',
    'sizes',
    'space',
    'typography',
  ]

  /** @type string[] */
  const styles = [
    `
      button {
        appearance: none;
        -webkit-appearance: none;
      }
    `,
    `
      table {
        border-collapse: collapse;
      }
    `,
  ]

  categories.forEach((category) => {
    const props = propsByCategory[category]

    props.forEach((prop) => {
      const detectedUsage = propUsageCache.get(prop.name)
      if (optimize && detectedUsage) return

      if (prop.scale !== undefined && theme[prop.scale] !== undefined) {
        const generated = getScaleStyles({
          optimize,
          prop,
          scale: theme[prop.scale],
        })

        styles.push(...generated.styles)
      }

      if (prop.values) {
        const generated = getValueStyles({
          optimize,
          prop,
          values: prop.values,
        })

        styles.push(...generated.styles)
      }
    })
  })

  const filename = basename(outputPath)
  const stylesheet = styles.join('\n')

  writeFileSync(
    outputPath,
    // TODO: wrap this in a try/catch once we can use native ESM in Jest
    prettier.format(stylesheet, { filepath: filename })
  )

  // return config for logging purposes
  return {}
}
