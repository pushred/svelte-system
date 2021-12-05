/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

const baselineValues = ['baseline']

const distributeValues = [
  'space-around',
  'space-between',
  'space-evenly',
  'stretch',
]

const intrinsicKeywords = ['fill', 'fit-content', 'max-content', 'min-content']

const positionValues = ['center', 'end', 'flex-end', 'flex-start', 'start']

/** @type { Prop[] } */
export const props = [
  {
    alias: 'align',
    name: 'alignItems',
    values: [...baselineValues, ...positionValues, 'normal'],
  },
  {
    name: 'alignSelf',
    values: [
      ...baselineValues,
      ...positionValues,
      'auto',
      'left',
      'normal',
      'right',
      'self-start',
      'self-end',
      'stretch',
    ],
  },
  {
    name: 'alignContent',
    values: [
      ...baselineValues,
      ...distributeValues,
      ...positionValues,
      'normal',
    ],
  },
  {
    alias: 'basis',
    name: 'flexBasis',
    scale: 'sizes',
    values: [...intrinsicKeywords, 'auto', 'content'],
  },
  {
    alias: 'direction',
    name: 'flexDirection',
    values: ['column', 'column-reverse', 'row', 'row-reverse'],
  },
  {
    alias: 'grow',
    name: 'flexGrow',
    scale: 'flexGrow',
  },
  {
    alias: 'shrink',
    name: 'flexShrink',
    scale: 'flexShrink',
  },
  {
    alias: 'justify',
    name: 'justifyContent',
    values: [...distributeValues, ...positionValues, 'left', 'normal', 'right'],
  },
  {
    name: 'justifyItems',
    values: [
      ...baselineValues,
      ...positionValues,
      'auto',
      'left',
      'normal',
      'right',
      'self-start',
      'self-end',
    ],
  },
  {
    name: 'justifySelf',
    values: [
      ...baselineValues,
      ...positionValues,
      'auto',
      'left',
      'normal',
      'right',
      'self-start',
      'self-end',
      'stretch',
    ],
  },
  {
    name: 'order',
    scale: 'order',
  },
]
