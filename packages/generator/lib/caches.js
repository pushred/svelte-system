import { cosmiconfigSync } from 'cosmiconfig'

export class Cache {
  constructor() {
    this.cache = {}
  }

  clear() {
    this.cache = {}
  }

  /**
   * @param {string} key
   * @returns {any}
   */
  get(key) {
    // @ts-ignore
    return this.cache[key]
  }

  /**
   * @returns {string[]}
   */
  getAllKeys() {
    return Object.keys(this.cache)
  }

  /**
   * @param {string} key
   * @param {any} value
   * @returns {void}
   */
  set(key, value) {
    // @ts-ignore
    this.cache[key] = value
  }
}

export const cosmiconfig = cosmiconfigSync('svelte-system')
export const eventUsageCache = new Cache()
export const generatedComponentsCache = new Cache()
export const propUsageCache = new Cache()
