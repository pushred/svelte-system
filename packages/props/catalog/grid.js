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
    transform: 'string',
  },
  {
    alias: 'colStart',
    name: 'gridColumnStart',
    scale: 'columns',
    transform: 'string',
  },
  {
    alias: 'colEnd',
    name: 'gridColumnEnd',
    scale: 'columns',
    transform: 'string',
  },
  {
    name: 'gridRow',
    scale: 'rows',
    transform: 'string',
  },

  // extensions

  {
    alias: 'colSpan',
    cssProps: ['grid-column-end'],
    cssPropValueTemplate: (value) => `span ${value}`,
    name: 'gridColumnSpan',
    scale: 'columns',
    transform: 'string',
  },

  // TODO: grid-area; shorthand for row/column start/end props
  // TODO: grid-template-areas/columns/rows; arbitrary values
  // TODO: other grid-auto-columns/rows values; arbitrary values
]
