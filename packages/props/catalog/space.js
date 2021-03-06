/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

/** @type { Prop[] } */
export const props = [
  {
    alias: 'm',
    name: 'margin',
    scale: 'space',
  },
  {
    alias: 'mt',
    name: 'marginTop',
    scale: 'space',
  },
  {
    alias: 'mr',
    name: 'marginRight',
    scale: 'space',
  },
  {
    alias: 'mb',
    name: 'marginBottom',
    scale: 'space',
  },
  {
    alias: 'ml',
    name: 'marginLeft',
    scale: 'space',
  },
  {
    alias: 'p',
    name: 'padding',
    scale: 'space',
  },
  {
    alias: 'pt',
    name: 'paddingTop',
    scale: 'space',
  },
  {
    alias: 'pr',
    name: 'paddingRight',
    scale: 'space',
  },
  {
    alias: 'pb',
    name: 'paddingBottom',
    scale: 'space',
  },
  {
    alias: 'pl',
    name: 'paddingLeft',
    scale: 'space',
  },

  // extensions

  {
    alias: 'mx',
    cssProps: ['margin-left', 'margin-right'],
    name: 'marginX',
    scale: 'space',
  },
  {
    alias: 'my',
    cssProps: ['margin-bottom', 'margin-top'],
    name: 'marginY',
    scale: 'space',
  },
  {
    alias: 'px',
    cssProps: ['padding-left', 'padding-right'],
    name: 'paddingX',
    scale: 'space',
  },
  {
    alias: 'py',
    cssProps: ['padding-bottom', 'padding-top'],
    name: 'paddingY',
    scale: 'space',
  },
]
