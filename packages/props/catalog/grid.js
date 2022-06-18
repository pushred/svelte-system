/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

/** @type { Prop[] } */
export const props = [
  {
    name: 'gridAutoColumns',
    values: ['auto', 'min-content', 'max-content'],
  },
  {
    name: 'gridAutoFlow',
    values: ['column', 'column dense', 'dense', 'row', 'row dense'],
  },
  {
    name: 'gridAutoRows',
    values: ['auto', 'min-content', 'max-content'],
  },
  {
    name: 'gridColumn',
    scale: 'columns',
  },
  {
    name: 'gridRow',
    scale: 'rows',
  },
  // TODO: grid-area; shorthand for row/column start/end props
  // TODO: grid-template-areas/columns/rows; arbitrary values
  // TODO: other grid-auto-columns/rows values; arbitrary values
]
