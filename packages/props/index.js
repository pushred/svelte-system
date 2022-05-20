export { propsByAlias } from './lib/propsByAlias.js'
export { propsByCategory } from './lib/propsByCategory.js'
export { propsByName } from './lib/propsByName.js'

import { propsByAlias } from './lib/propsByAlias.js'
import { propsByName } from './lib/propsByName.js'

export const propNames = [
  ...Object.keys(propsByAlias),
  ...Object.keys(propsByName),
].sort()
