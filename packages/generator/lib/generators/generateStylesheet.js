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
 * @typedef { import('@svelte-system/types').Style } Style
 * @typedef { import('@svelte-system/types').Theme } Theme
 */

/**
 * @param {{ optimize?: boolean, outputPath: string, theme: Theme }} options
 */
export function generateStylesheet({ optimize, outputPath, theme }) {
  makeDir.sync(dirname(outputPath))

  /** @type string[] */
  const accumulator = [
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

  /** @type Style[] */
  const styles = []

  for (const [_category, props] of Object.entries(propsByCategory)) {
    props.forEach((prop) => {
      const detectedUsage =
        propUsageCache.get(prop.alias) || propUsageCache.get(prop.name)

      if (optimize && !detectedUsage) return

      if (prop.scale !== undefined && theme[prop.scale] !== undefined) {
        styles.push(
          ...getScaleStyles({
            prop,
            scale: theme[prop.scale],
          })
        )
      }

      if (prop.values) {
        styles.push(
          ...getValueStyles({
            prop,
            values: prop.values,
          })
        )
      }
    })
  }

  accumulator.push(
    ...styles
      .filter((style) => (optimize ? style.breakpoints.has('all') : true))
      .map(
        ({ className, cssProp, value }) =>
          `.${className} { ${cssProp}: ${value} }`
      )
  )

  for (const [breakpoint, minWidth] of Object.entries(
    theme.breakpoints || {}
  )) {
    const breakpointStyles = styles
      .filter((style) => (optimize ? style.breakpoints.has(breakpoint) : true))
      .map(
        ({ className, cssProp, value }) =>
          `.${breakpoint}\\:${className} { ${cssProp}: ${value} }`
      )

    if (breakpointStyles.length === 0) continue

    accumulator.push(`
      @media (min-width: ${minWidth}) {
        \n
        ${breakpointStyles.join('\n\n')}
        \n
      }
    `)
  }

  writeFileSync(
    outputPath,
    // TODO: wrap this in a try/catch once we can use native ESM in Jest
    prettier.format(accumulator.join('\n\n'), {
      filepath: basename(outputPath),
    })
  )

  // return config for logging purposes
  return {}
}
