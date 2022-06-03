import { propUsageCache } from '../caches.js'

/**
 * @param {string} propName
 * @returns {{ [key: string]: Set<string> }}
 */
export function getPropValueUsage(propName) {
  const cachedUsageByComponent = propUsageCache.get(propName) || {}

  let valuesInUse

  for (const cachedUsage of Object.values(cachedUsageByComponent)) {
    for (const [breakpoint, values] of Object.entries(cachedUsage)) {
      for (const value of values) {
        if (valuesInUse === undefined) valuesInUse = {}
        if (!valuesInUse[value]) valuesInUse[value] = new Set()
        valuesInUse[value].add(breakpoint)
      }
    }
  }

  return valuesInUse
}
