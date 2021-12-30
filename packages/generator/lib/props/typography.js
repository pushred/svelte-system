/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

/** @type { Prop[] } */
export const props = [
  {
    name: 'fontFamily',
    scale: 'fonts',
  },
  {
    name: 'fontSize',
    scale: 'fontSizes',
  },
  {
    name: 'fontWeight',
    scale: 'fontWeights',
  },
  {
    name: 'letterSpacing',
    scale: 'letterSpacings',
  },
  {
    name: 'lineHeight',
    scale: 'lineHeights',
  },
  {
    name: 'textAlign',
    values: ['center', 'left', 'right'],
  },
  {
    name: 'textTransform',
    values: ['capitalize', 'uppercase', 'lowercase', 'none'],
  },
]
