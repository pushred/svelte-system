import { eventUsageCache } from '../caches.js'

/**
 * @param {{
 *  componentName: string;
 *  event: string;
 * }} event
 */
export function cacheEvent({ componentName, event }) {
  eventUsageCache.set(
    componentName,
    new Set([...(eventUsageCache.get(componentName) || []), event])
  )
}
