import { propUsageCache } from '../caches.js'

/**
 * @typedef { import('@svelte-system/types').PropUsageCatalog } PropUsageCatalog
 */

/**
 * @param {PropUsageCatalog | {}} catalog
 * @returns {void}
 */
export function cachePropValues(catalog) {
  for (const [propName, components] of Object.entries(catalog)) {
    const prop = propUsageCache.get(propName) || {}

    for (const [componentName, breakpoints] of Object.entries(components)) {
      if (!prop[componentName]) prop[componentName] = {}
      const component = prop[componentName]

      for (const [breakpointKey, values] of Object.entries(breakpoints)) {
        if (!component[breakpointKey]) component[breakpointKey] = new Set()
        const breakpoint = component[breakpointKey]

        values.forEach((value) => {
          breakpoint.add(value)
        })
      }
    }

    propUsageCache.set(propName, prop)
  }
}
