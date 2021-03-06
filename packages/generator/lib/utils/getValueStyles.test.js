import { propUsageCache } from '../caches'
import { getValueStyles } from './getValueStyles.js'

beforeEach(() => {
  propUsageCache.clear()
})

test('creates styling data for each value', () => {
  const result = getValueStyles({
    prop: {
      name: 'textAlign',
    },
    values: ['left', 'right'],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {},
        "className": "text-align-left",
        "cssProps": Array [
          "text-align",
        ],
        "value": "left",
      },
      Object {
        "breakpoints": Set {},
        "className": "text-align-right",
        "cssProps": Array [
          "text-align",
        ],
        "value": "right",
      },
    ]
  `)
})

test('includes breakpoint usage', () => {
  propUsageCache.set('textAlign', {
    Component: {
      all: new Set(['left', 'center', 'right']),
      sm: new Set(['center']),
    },
  })

  const result = getValueStyles({
    prop: {
      name: 'textAlign',
    },
    values: ['left', 'center', 'right'],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "text-align-left",
        "cssProps": Array [
          "text-align",
        ],
        "value": "left",
      },
      Object {
        "breakpoints": Set {
          "all",
          "sm",
        },
        "className": "text-align-center",
        "cssProps": Array [
          "text-align",
        ],
        "value": "center",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "text-align-right",
        "cssProps": Array [
          "text-align",
        ],
        "value": "right",
      },
    ]
  `)
})

test('includes breakpoint usage for both default prop name and prop alias', () => {
  propUsageCache.set('alignItems', {
    Component: {
      all: new Set(['start', 'center']),
      sm: new Set(['end', 'stretch']),
    },
  })

  propUsageCache.set('align', {
    Component: {
      all: new Set(['stretch', 'space-evenly']),
      sm: new Set(['fill']),
    },
  })

  const result = getValueStyles({
    prop: {
      alias: 'align',
      name: 'alignItems',
    },
    values: ['start', 'center', 'end', 'fill', 'space-evenly', 'stretch'],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "align-start",
        "cssProps": Array [
          "align-items",
        ],
        "value": "start",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "align-center",
        "cssProps": Array [
          "align-items",
        ],
        "value": "center",
      },
      Object {
        "breakpoints": Set {
          "sm",
        },
        "className": "align-end",
        "cssProps": Array [
          "align-items",
        ],
        "value": "end",
      },
      Object {
        "breakpoints": Set {
          "sm",
        },
        "className": "align-fill",
        "cssProps": Array [
          "align-items",
        ],
        "value": "fill",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "align-space-evenly",
        "cssProps": Array [
          "align-items",
        ],
        "value": "space-evenly",
      },
      Object {
        "breakpoints": Set {
          "sm",
          "all",
        },
        "className": "align-stretch",
        "cssProps": Array [
          "align-items",
        ],
        "value": "stretch",
      },
    ]
  `)
})
