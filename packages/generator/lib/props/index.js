import { props as attributes } from './attributes.js'
import { props as colors } from './colors.js'
import { props as flex } from './flex.js'
import { props as layout } from './layout.js'
import { props as sizes } from './sizes.js'
import { props as space } from './space.js'
import { props as typography } from './typography.js'

export const props = [
  ...attributes,
  ...colors,
  ...flex,
  ...layout,
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
  colors,
  flex,
  layout,
  sizes,
  space,
  typography,
}

export const propsByName = {}

props.forEach((prop) => (propsByName[prop.name] = prop))
