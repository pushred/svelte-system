const { join } = require('path')

/**
 * @typedef { import('@svelte-system/types').Theme } Theme
 */

const config = {
  componentsPath: join(__dirname, 'vite-root', 'src', 'components'),
  /** @type Theme */
  theme: {
    colors: {},
    space: {
      //0.5: '0.125rem',
      1: '0.25rem',
      //1.5: '0.375rem',
      2: '0.5rem',
    },
  },
}

module.exports = config
