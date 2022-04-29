#!/usr/bin/env node

import { writeFileSync } from 'fs'
import { resolve } from 'path'
import * as url from 'url'

import kebabCase from 'lodash.kebabcase'

// Intentionally undeclared dep, should use project's own Prettier installation
// TODO: dynamically import when we can use native ESM in Jest (should be optional peer dep)
import prettier from 'prettier'

import { props } from '@svelte-system/props'

function generateGetClass() {
  /** @type string[] */
  const propArgs = []

  /** @type string[] */
  const propNames = []

  props.forEach(({ alias, name, scale, values }) => {
    if (!scale && !values) return

    propNames.push(name, alias)

    const className = alias ? kebabCase(alias) : kebabCase(name)
    const propName = alias ? `${name} ?? ${alias}` : name

    let computedName

    if (scale === 'colors') {
      computedName = className + '-' + '${kebabCase(' + propName + ')}'
    } else {
      computedName = className + '-' + '${' + propName + '}'
    }

    const conditions = alias
      ? `${name} !== undefined || ${alias} !== undefined`
      : `${name} !== undefined`

    propArgs.push('[`' + computedName + '`]: ' + conditions)
  })

  const template = `
    import clsx from 'clsx'
    import kebabCase from 'lodash.kebabcase';

    export function getClass({
      ${propNames.filter(Boolean).join(',')}
    } = {}) {
      return clsx({
        ${propArgs.join(',')}
      })
    }
  `

  const currentDir = url.fileURLToPath(new URL('.', import.meta.url))

  writeFileSync(
    resolve(currentDir, '..', 'lib', 'getClass.js'),
    prettier.format(template, { filepath: 'getClass.js' })
  )
}

generateGetClass()
