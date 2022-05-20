import { props } from './all.js'

export const propsByName = {}

props.forEach((prop) => (propsByName[prop.name] = prop))
