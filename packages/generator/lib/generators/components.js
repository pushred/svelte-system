/**
 * @typedef { import('@svelte-system/types').ComponentSpec } ComponentSpec
 */

/** @type {ComponentSpec[]} */
export const components = [
  {
    filename: 'Box.svelte',
    name: 'Box',
    props: [
      'borders',
      'colors',
      'flex',
      'layout',
      'radii',
      'sizes',
      'space',
      'typography',
    ],
  },
  {
    defaultProps: {
      display: 'flex',
    },
    filename: 'Flex.svelte',
    name: 'Flex',
    props: [
      'borders',
      'colors',
      'flex',
      'layout',
      'radii',
      'sizes',
      'space',
      'typography',
    ],
  },
  {
    defaultProps: {
      as: 'p',
    },
    filename: 'Text.svelte',
    name: 'Text',
    props: [
      'borders',
      'colors',
      'flex',
      'layout',
      'radii',
      'sizes',
      'space',
      'typography',
    ],
  },
]
