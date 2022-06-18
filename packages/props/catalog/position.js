/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

/** @type { Prop[] } */
export const props = [
  {
    alias: 'pos',
    name: 'position',
    values: ['absolute', 'fixed', 'relative', 'static', 'sticky'],
  },
  {
    name: 'top',
    scale: 'space',
  },
  {
    name: 'right',
    scale: 'space',
  },
  {
    name: 'bottom',
    scale: 'space',
  },
  {
    name: 'left',
    scale: 'space',
  },
  {
    name: 'zIndex',
    scale: 'zIndices',
  },
]
