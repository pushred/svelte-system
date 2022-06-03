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
        "cssProp": "gap",
        "value": "0",
      },
      Object {
        "breakpoints": Set {},
        "className": "gap-1",
        "cssProp": "gap",
        "value": "1px",
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
        "cssProp": "gap",
        "value": "0",
      },
      Object {
        "breakpoints": Set {},
        "className": "gap-1",
        "cssProp": "gap",
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
        "cssProp": "width",
        "value": "0",
      },
      Object {
        "breakpoints": Set {},
        "className": "w-1",
        "cssProp": "width",
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
        "cssProp": "color",
        "value": "#F9FAFB",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-gray-1",
        "cssProp": "color",
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
        "cssProp": "color",
        "value": "#F9FAFB",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-light-gray-1",
        "cssProp": "color",
        "value": "#F3F4F6",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-gray-0",
        "cssProp": "color",
        "value": "#F3F4F6",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-gray-1",
        "cssProp": "color",
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
        "cssProp": "color",
        "value": "#fff",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-background",
        "cssProp": "color",
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
        "cssProp": "color",
        "value": "#000",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-light-background",
        "cssProp": "color",
        "value": "#FFF",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-text",
        "cssProp": "color",
        "value": "#FFF",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-background",
        "cssProp": "color",
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
        "cssProp": "color",
        "value": "#F9FAFB",
      },
      Object {
        "breakpoints": Set {},
        "className": "color-modes-dark-gray-50",
        "cssProp": "color",
        "value": "#F8FAFC",
      },
    ]
  `)
})

// usage

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
        "cssProp": "gap",
        "value": "0",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "gap-1",
        "cssProp": "gap",
        "value": "1px",
      },
      Object {
        "breakpoints": Set {
          "all",
          "sm",
        },
        "className": "gap-2",
        "cssProp": "gap",
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
        "cssProp": "margin-top",
        "value": "0",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "mt-1",
        "cssProp": "margin-top",
        "value": "1px",
      },
      Object {
        "breakpoints": Set {
          "all",
          "sm",
        },
        "className": "mt-2",
        "cssProp": "margin-top",
        "value": "2px",
      },
      Object {
        "breakpoints": Set {
          "all",
        },
        "className": "mt-3",
        "cssProp": "margin-top",
        "value": "3px",
      },
      Object {
        "breakpoints": Set {
          "sm",
          "all",
        },
        "className": "mt-4",
        "cssProp": "margin-top",
        "value": "4px",
      },
      Object {
        "breakpoints": Set {
          "sm",
        },
        "className": "mt-5",
        "cssProp": "margin-top",
        "value": "5px",
      },
    ]
  `)
})
