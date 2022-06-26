/**
 * @typedef { import('@svelte-system/types').Prop } Prop
 */

/** @type { Prop[] } */
export const props = [
  {
    name: 'borderRadius',
    scale: 'radii',
  },
  {
    name: 'borderBottomLeftRadius',
    scale: 'radii',
  },
  {
    name: 'borderBottomRightRadius',
    scale: 'radii',
  },
  {
    name: 'borderTopLeftRadius',
    scale: 'radii',
  },
  {
    name: 'borderTopRightRadius',
    scale: 'radii',
  },

  // extensions

  {
    cssProps: ['border-bottom-left-radius', 'border-bottom-right-radius'],
    name: 'borderBottomRadius',
    scale: 'radii',
  },
  {
    cssProps: ['border-bottom-left-radius', 'border-top-left-radius'],
    name: 'borderLeftRadius',
    scale: 'radii',
  },
  {
    cssProps: ['border-bottom-right-radius', 'border-top-right-radius'],
    name: 'borderRightRadius',
    scale: 'radii',
  },
  {
    cssProps: ['border-top-left-radius', 'border-top-right-radius'],
    name: 'borderTopRadius',
    scale: 'radii',
  },
]
