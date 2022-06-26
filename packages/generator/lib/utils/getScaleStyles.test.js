import { propUsageCache } from '../caches'
import { getScaleStyles } from './getScaleStyles'

beforeEach(() => {
  propUsageCache.clear()
})

test('creates styling data for each array scale increment', () => {
  const result = getScaleStyles({
    prop: {
      name: 'gap',
    },
    scale: [0, 1],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "gap-0",
        "cssProps": Array [
          "gap",
        ],
        "value": "0",
      },
      Object {
        "breakpoints": Set {},
        "className": "gap-1",
        "cssProps": Array [
          "gap",
        ],
        "value": "1px",
      },
    ]
  `)
})

test('creates a style for each specified CSS property', () => {
  const result = getScaleStyles({
    prop: {
      cssProps: ['margin-bottom', 'margin-top'],
      name: 'my',
    },
    scale: [0, 1],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "my-0",
        "cssProps": Array [
          "margin-bottom",
          "margin-top",
        ],
        "value": "0",
      },
      Object {
        "breakpoints": Set {},
        "className": "my-1",
        "cssProps": Array [
          "margin-bottom",
          "margin-top",
        ],
        "value": "1px",
      },
    ]
  `)
})

test('creates a style with provided value template', () => {
  const result = getScaleStyles({
    prop: {
      cssProps: ['grid-column-end'],
      cssPropValueTemplate: (value) => `span ${value}`,
      name: 'gridColSpan',
      transform: 'string',
    },
    scale: [0, 1],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "grid-col-span-0",
        "cssProps": Array [
          "grid-column-end",
        ],
        "value": "span 0",
      },
      Object {
        "breakpoints": Set {},
        "className": "grid-col-span-1",
        "cssProps": Array [
          "grid-column-end",
        ],
        "value": "span 1",
      },
    ]
  `)
})

test('array scale with aliases', () => {
  const gaps = [0, 1]

  // TODO: aliases should probably be used for classes when used
  gaps.sm = gaps[0]
  gaps.lg = gaps[1]

  const result = getScaleStyles({
    prop: {
      name: 'gap',
    },
    scale: gaps,
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "gap-0",
        "cssProps": Array [
          "gap",
        ],
        "value": "0",
      },
      Object {
        "breakpoints": Set {},
        "className": "gap-1",
        "cssProps": Array [
          "gap",
        ],
        "value": "1px",
      },
    ]
  `)
})

test('uses prop alias for class prefix when available', () => {
  const result = getScaleStyles({
    prop: {
      alias: 'w',
      name: 'width',
    },
    scale: [0, 4],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "w-0",
        "cssProps": Array [
          "width",
        ],
        "value": "0",
      },
      Object {
        "breakpoints": Set {},
        "className": "w-1",
        "cssProps": Array [
          "width",
        ],
        "value": "4px",
      },
    ]
  `)
})

test('nested array scale', () => {
  const result = getScaleStyles({
    prop: {
      name: 'color',
    },
    scale: {
      gray: ['#F9FAFB', '#F3F4F6'],
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "color-gray-0",
        "cssProps": Array [
          "color",
        ],
        "value": "#F9FAFB",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-gray-1",
        "cssProps": Array [
          "color",
        ],
        "value": "#F3F4F6",
      },
    ]
  `)
})

test('deeply nested array scale', () => {
  const modes = {
    light: {
      gray: ['#F9FAFB', '#F3F4F6'],
    },
    dark: {
      gray: ['#F3F4F6', '#F9FAFB'],
    },
  }

  modes.light.gray.a = modes.light.gray[0]
  modes.light.gray.b = modes.light.gray[1]
  modes.dark.gray.a = modes.dark.gray[0]
  modes.dark.gray.b = modes.dark.gray[1]

  const result = getScaleStyles({
    prop: {
      name: 'color',
    },
    scale: {
      modes,
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "color-modes-light-gray-0",
        "cssProps": Array [
          "color",
        ],
        "value": "#F9FAFB",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-light-gray-1",
        "cssProps": Array [
          "color",
        ],
        "value": "#F3F4F6",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-gray-0",
        "cssProps": Array [
          "color",
        ],
        "value": "#F3F4F6",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-gray-1",
        "cssProps": Array [
          "color",
        ],
        "value": "#F9FAFB",
      },
    ]
  `)
})

// object scales

test('creates styling data for each object scale increment', () => {
  const result = getScaleStyles({
    prop: {
      name: 'color',
    },
    scale: {
      text: '#fff',
      background: '#000',
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "color-text",
        "cssProps": Array [
          "color",
        ],
        "value": "#fff",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-background",
        "cssProps": Array [
          "color",
        ],
        "value": "#000",
      },
    ]
  `)
})

test('nested object scale', () => {
  const result = getScaleStyles({
    prop: {
      name: 'color',
    },
    scale: {
      modes: {
        light: {
          text: '#000',
          background: '#FFF',
        },
        dark: {
          text: '#FFF',
          background: '#000',
        },
      },
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "color-modes-light-text",
        "cssProps": Array [
          "color",
        ],
        "value": "#000",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-light-background",
        "cssProps": Array [
          "color",
        ],
        "value": "#FFF",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-text",
        "cssProps": Array [
          "color",
        ],
        "value": "#FFF",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-background",
        "cssProps": Array [
          "color",
        ],
        "value": "#000",
      },
    ]
  `)
})

test('deeply nested object scale', () => {
  const result = getScaleStyles({
    prop: {
      name: 'color',
    },
    scale: {
      modes: {
        light: {
          gray: {
            50: '#F9FAFB',
          },
        },
        dark: {
          gray: {
            50: '#F8FAFC',
          },
        },
      },
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "color-modes-light-gray-50",
        "cssProps": Array [
          "color",
        ],
        "value": "#F9FAFB",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-gray-50",
        "cssProps": Array [
          "color",
        ],
        "value": "#F8FAFC",
      },
    ]
  `)
})

// optimize mode

test('includes breakpoint usage', () => {
  propUsageCache.set('gap', {
    Component: {
      all: new Set(['0', '1', '2']),
      sm: new Set(['2']),
    },
  })

  const result = getScaleStyles({
    optimize: true,
    prop: {
      name: 'gap',
    },
    scale: [0, 1, 2],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "gap-0",
        "cssProps": Array [
          "gap",
        ],
        "value": "0",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "gap-1",
        "cssProps": Array [
          "gap",
        ],
        "value": "1px",
      },
      Object {
        "breakpoints": Set {
          "all",
          "sm",
        },
        "className": "gap-2",
        "cssProps": Array [
          "gap",
        ],
        "value": "2px",
      },
    ]
  `)
})

test('includes breakpoint usage for both default prop name and prop alias', () => {
  propUsageCache.set('marginTop', {
    Component: {
      all: new Set(['0', '1', '2']),
      sm: new Set(['2', '4']),
    },
  })

  propUsageCache.set('mt', {
    Component: {
      all: new Set(['3', '4']),
      sm: new Set(['5']),
    },
  })

  const result = getScaleStyles({
    optimize: true,
    prop: {
      alias: 'mt',
      name: 'marginTop',
    },
    scale: [0, 1, 2, 3, 4, 5],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "mt-0",
        "cssProps": Array [
          "margin-top",
        ],
        "value": "0",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "mt-1",
        "cssProps": Array [
          "margin-top",
        ],
        "value": "1px",
      },
      Object {
        "breakpoints": Set {
          "all",
          "sm",
        },
        "className": "mt-2",
        "cssProps": Array [
          "margin-top",
        ],
        "value": "2px",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "mt-3",
        "cssProps": Array [
          "margin-top",
        ],
        "value": "3px",
      },
      Object {
        "breakpoints": Set {
          "sm",
          "all",
        },
        "className": "mt-4",
        "cssProps": Array [
          "margin-top",
        ],
        "value": "4px",
      },
      Object {
        "breakpoints": Set {
          "sm",
        },
        "className": "mt-5",
        "cssProps": Array [
          "margin-top",
        ],
        "value": "5px",
      },
    ]
  `)
})
