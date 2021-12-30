export class Cache {
  constructor() {
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
   * @param {string} key
   * @param {any} value
   * @returns {void}
   */
  set(key, value) {
    // @ts-ignore
    this.cache[key] = value
  }
}

export const generatedComponentsCache = new Cache()
