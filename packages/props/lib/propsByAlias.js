import { props } from './all.js'

export const propsByAlias = {}

props.forEach((prop) => {
  if (!prop.alias) return
  propsByAlias[prop.alias] = prop
})
