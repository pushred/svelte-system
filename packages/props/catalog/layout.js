/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

const overflowValues = ['auto', 'clip', 'hidden', 'scroll', 'visible']

/** @type { Prop[] } */
export const props = [
  {
    name: 'columnCount',
    scale: 'columns',
  },
  {
    name: 'columnWidth',
    scale: 'space',
  },
  {
    name: 'columnGap',
    scale: 'space',
  },
  {
    alias: 'd',
    name: 'display',
    values: [
      'block',
      'contents',
      'flex',
      'grid',
      'inline-block',
      'inline-flex',
      'inline-grid',
      'inline',
      'none',
    ],
  },
  {
    name: 'gap',
    scale: 'space',
  },
  {
    name: 'overflow',
    values: overflowValues,
  },
  {
    name: 'overflowX',
    values: overflowValues,
  },
  {
    name: 'overflowY',
    values: overflowValues,
  },
  {
    name: 'rowGap',
    scale: 'space',
  },
  {
    name: 'verticalAlign',
    values: ['baseline', 'sub', 'super', 'text-top', 'text-bottom', 'middle'],
  },
]
