import { props as attributes } from './lib/attributes.js'
import { props as borders } from './lib/borders.js'
import { props as colors } from './lib/colors.js'
import { props as flex } from './lib/flex.js'
import { props as layout } from './lib/layout.js'
import { props as radii } from './lib/radii.js'
import { props as sizes } from './lib/sizes.js'
import { props as space } from './lib/space.js'
import { props as typography } from './lib/typography.js'

export const props = [
  ...attributes,
  ...borders,
  ...colors,
  ...flex,
  ...layout,
  ...radii,
  ...sizes,
  ...space,
  ...typography,
]

export const propsByAlias = {}

props.forEach((prop) => {
  if (!prop.alias) return
  propsByAlias[prop.alias] = prop
})

export const propsByCategory = {
  attributes,
  borders,
  colors,
  flex,
  layout,
  radii,
  sizes,
  space,
  typography,
}

export const propsByName = {}

props.forEach((prop) => (propsByName[prop.name] = prop))

export const propNames = [
  ...Object.keys(propsByAlias),
  ...Object.keys(propsByName),
].sort()
