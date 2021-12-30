export const defaultTheme = {
  colors: {
    // from https://clrs.cc
    background: '#fff',
    text: '#111',
    primary: '#0074D9',
    secondary: '#7fdbff',
    accent: '#ff851b',
    highlight: '#ffdc00',
    muted: '#ddd',
  },
  fonts: {
    // same font stacks as Bootstrap
    body:
      '-apple-system, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    heading:
      '-apple-system, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    mono:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    bold: 700,
    heading: 700,
  },
  letterSpacings: ['-0.05em', '-0.025em', '0', '0.025em', '0.05em', '0.1em'],
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  space: {
    // Tailwind default spacing scale
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // extensions

  flexGrow: [0, 1],
  flexShrink: [0, 1],
  order: [0, 1, 2, 3],
}
