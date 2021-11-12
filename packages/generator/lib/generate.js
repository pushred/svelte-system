import { writeFileSync } from 'fs'
import { join } from 'path'

import kebabCase from 'lodash.kebabcase'
import makeDir from 'make-dir'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { props } from './config.js'

const { space } = props

const components = [
  {
    filename: 'Box.svelte',
    props: {
      space,
    },
  },
]

export function generateComponents({ outputPath, theme } = {}) {
  if (!outputPath) throw new Error('Missing required `outputPath` argument')
  if (!theme) throw new Error('Missing required `theme` argument')

  makeDir.sync(outputPath)

  components.forEach((component) => {
    const classes = []
    const exports = []
    const styles = []

    Object.keys(component.props).forEach((type) => {
      component.props[type].forEach((prop) => {
        exports.push(`export let ${prop} = undefined`)

        Object.keys(theme[type]).forEach((key) => {
          const cssProp = kebabCase(prop)
          const className = kebabCase(`${prop}-${key}`)
          const value = theme[type][key]

          classes.push(`class:${className}={${prop} === '${key}'}`)
          styles.push(`.${className} { ${cssProp}: ${value} }`)
        })
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

  return components
}
