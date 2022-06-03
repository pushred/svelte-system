import { propUsageCache } from '../caches'
import { getScaleClassProps } from './getScaleClassProps.js'

const theme = {
  breakpoints: {
    sm: '30em',
    md: '48em',
  },
}

beforeEach(() => {
  propUsageCache.clear()
})

test('creates classes for each array scale increment and breakpoint combo', () => {
  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      name: 'gap',
    },
    scale: [0, 1],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:gap-0={String(gap) === '0'}",
      "class:sm:gap-0={String(gap?.sm) === '0' || String(gap?.[0]) === '0'}",
      "class:md:gap-0={String(gap?.md) === '0' || String(gap?.[1]) === '0'}",
      "class:gap-1={String(gap) === '1'}",
      "class:sm:gap-1={String(gap?.sm) === '1' || String(gap?.[0]) === '1'}",
      "class:md:gap-1={String(gap?.md) === '1' || String(gap?.[1]) === '1'}",
    ]
  `)
})

test('creates classes using prop aliases when available', () => {
  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      alias: 'w',
      name: 'width',
    },
    scale: [0, 4],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:w-0={String(width) === '0' || String(w) === '0'}",
      "class:sm:w-0={String(width?.sm) === '0' || String(width?.[0]) === '0' || String(w?.sm) === '0' || String(w?.[0]) === '0'}",
      "class:md:w-0={String(width?.md) === '0' || String(width?.[1]) === '0' || String(w?.md) === '0' || String(w?.[1]) === '0'}",
      "class:w-1={String(width) === '1' || String(w) === '1'}",
      "class:sm:w-1={String(width?.sm) === '1' || String(width?.[0]) === '1' || String(w?.sm) === '1' || String(w?.[0]) === '1'}",
      "class:md:w-1={String(width?.md) === '1' || String(width?.[1]) === '1' || String(w?.md) === '1' || String(w?.[1]) === '1'}",
    ]
  `)
})

test('array scale with index aliases', () => {
  const gaps = [0, 1]

  gaps.sm = gaps[0]
  gaps.lg = gaps[1]

  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      name: 'gap',
    },
    scale: gaps,
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:gap-0={String(gap) === '0' || gap === 'sm'}",
      "class:sm:gap-0={String(gap?.sm) === '0' || String(gap?.[0]) === '0' || gap?.sm === 'sm' || gap?.[0] === 'sm'}",
      "class:md:gap-0={String(gap?.md) === '0' || String(gap?.[1]) === '0' || gap?.md === 'sm' || gap?.[1] === 'sm'}",
      "class:gap-1={String(gap) === '1' || gap === 'lg'}",
      "class:sm:gap-1={String(gap?.sm) === '1' || String(gap?.[0]) === '1' || gap?.sm === 'lg' || gap?.[0] === 'lg'}",
      "class:md:gap-1={String(gap?.md) === '1' || String(gap?.[1]) === '1' || gap?.md === 'lg' || gap?.[1] === 'lg'}",
    ]
  `)
})

test('array scale with index aliases and prop aliases', () => {
  const sizes = [0, 4]

  sizes.sm = sizes[0]
  sizes.lg = sizes[1]

  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      alias: 'w',
      name: 'width',
    },
    scale: sizes,
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:w-0={String(width) === '0' || String(w) === '0' || width === 'sm' || w === 'sm'}",
      "class:sm:w-0={String(width?.sm) === '0' || String(width?.[0]) === '0' || String(w?.sm) === '0' || String(w?.[0]) === '0' || width?.sm === 'sm' || width?.[0] === 'sm' || w?.sm === 'sm' || w?.[0] === 'sm'}",
      "class:md:w-0={String(width?.md) === '0' || String(width?.[1]) === '0' || String(w?.md) === '0' || String(w?.[1]) === '0' || width?.md === 'sm' || width?.[1] === 'sm' || w?.md === 'sm' || w?.[1] === 'sm'}",
      "class:w-1={String(width) === '1' || String(w) === '1' || width === 'lg' || w === 'lg'}",
      "class:sm:w-1={String(width?.sm) === '1' || String(width?.[0]) === '1' || String(w?.sm) === '1' || String(w?.[0]) === '1' || width?.sm === 'lg' || width?.[0] === 'lg' || w?.sm === 'lg' || w?.[0] === 'lg'}",
      "class:md:w-1={String(width?.md) === '1' || String(width?.[1]) === '1' || String(w?.md) === '1' || String(w?.[1]) === '1' || width?.md === 'lg' || width?.[1] === 'lg' || w?.md === 'lg' || w?.[1] === 'lg'}",
    ]
  `)
})

test('object scale', () => {
  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
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
      "class:color-text={color === 'text'}",
      "class:sm:color-text={color?.sm === 'text' || color?.[0] === 'text'}",
      "class:md:color-text={color?.md === 'text' || color?.[1] === 'text'}",
      "class:color-background={color === 'background'}",
      "class:sm:color-background={color?.sm === 'background' || color?.[0] === 'background'}",
      "class:md:color-background={color?.md === 'background' || color?.[1] === 'background'}",
    ]
  `)
})

// nesting

test('nested array scale', () => {
  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      name: 'color',
    },
    scale: {
      gray: ['#F9FAFB', '#F3F4F6'],
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:color-gray-0={color === 'gray.0'}",
      "class:sm:color-gray-0={color?.sm === 'gray.0' || color?.[0] === 'gray.0'}",
      "class:md:color-gray-0={color?.md === 'gray.0' || color?.[1] === 'gray.0'}",
      "class:color-gray-1={color === 'gray.1'}",
      "class:sm:color-gray-1={color?.sm === 'gray.1' || color?.[0] === 'gray.1'}",
      "class:md:color-gray-1={color?.md === 'gray.1' || color?.[1] === 'gray.1'}",
    ]
  `)
})

test('nested object scale', () => {
  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      name: 'color',
      scale: 'colors',
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
      "class:color-modes-light-text={color === 'modes.light.text'}",
      "class:sm:color-modes-light-text={color?.sm === 'modes.light.text' || color?.[0] === 'modes.light.text'}",
      "class:md:color-modes-light-text={color?.md === 'modes.light.text' || color?.[1] === 'modes.light.text'}",
      "class:color-modes-light-background={color === 'modes.light.background'}",
      "class:sm:color-modes-light-background={color?.sm === 'modes.light.background' || color?.[0] === 'modes.light.background'}",
      "class:md:color-modes-light-background={color?.md === 'modes.light.background' || color?.[1] === 'modes.light.background'}",
      "class:color-modes-dark-text={color === 'modes.dark.text'}",
      "class:sm:color-modes-dark-text={color?.sm === 'modes.dark.text' || color?.[0] === 'modes.dark.text'}",
      "class:md:color-modes-dark-text={color?.md === 'modes.dark.text' || color?.[1] === 'modes.dark.text'}",
      "class:color-modes-dark-background={color === 'modes.dark.background'}",
      "class:sm:color-modes-dark-background={color?.sm === 'modes.dark.background' || color?.[0] === 'modes.dark.background'}",
      "class:md:color-modes-dark-background={color?.md === 'modes.dark.background' || color?.[1] === 'modes.dark.background'}",
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

  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      name: 'color',
    },
    scale: {
      modes,
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:color-modes-light-gray-0={color === 'modes.light.gray.0' || color === 'modes.light.gray.a'}",
      "class:sm:color-modes-light-gray-0={color?.sm === 'modes.light.gray.0' || color?.[0] === 'modes.light.gray.0' || color?.sm === 'modes.light.gray.a' || color?.[0] === 'modes.light.gray.a'}",
      "class:md:color-modes-light-gray-0={color?.md === 'modes.light.gray.0' || color?.[1] === 'modes.light.gray.0' || color?.md === 'modes.light.gray.a' || color?.[1] === 'modes.light.gray.a'}",
      "class:color-modes-light-gray-1={color === 'modes.light.gray.1' || color === 'modes.light.gray.b'}",
      "class:sm:color-modes-light-gray-1={color?.sm === 'modes.light.gray.1' || color?.[0] === 'modes.light.gray.1' || color?.sm === 'modes.light.gray.b' || color?.[0] === 'modes.light.gray.b'}",
      "class:md:color-modes-light-gray-1={color?.md === 'modes.light.gray.1' || color?.[1] === 'modes.light.gray.1' || color?.md === 'modes.light.gray.b' || color?.[1] === 'modes.light.gray.b'}",
      "class:color-modes-dark-gray-0={color === 'modes.dark.gray.0' || color === 'modes.dark.gray.a'}",
      "class:sm:color-modes-dark-gray-0={color?.sm === 'modes.dark.gray.0' || color?.[0] === 'modes.dark.gray.0' || color?.sm === 'modes.dark.gray.a' || color?.[0] === 'modes.dark.gray.a'}",
      "class:md:color-modes-dark-gray-0={color?.md === 'modes.dark.gray.0' || color?.[1] === 'modes.dark.gray.0' || color?.md === 'modes.dark.gray.a' || color?.[1] === 'modes.dark.gray.a'}",
      "class:color-modes-dark-gray-1={color === 'modes.dark.gray.1' || color === 'modes.dark.gray.b'}",
      "class:sm:color-modes-dark-gray-1={color?.sm === 'modes.dark.gray.1' || color?.[0] === 'modes.dark.gray.1' || color?.sm === 'modes.dark.gray.b' || color?.[0] === 'modes.dark.gray.b'}",
      "class:md:color-modes-dark-gray-1={color?.md === 'modes.dark.gray.1' || color?.[1] === 'modes.dark.gray.1' || color?.md === 'modes.dark.gray.b' || color?.[1] === 'modes.dark.gray.b'}",
    ]
  `)
})

test('deeply nested object scale', () => {
  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
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
      "class:color-modes-light-gray-50={color === 'modes.light.gray.50'}",
      "class:sm:color-modes-light-gray-50={color?.sm === 'modes.light.gray.50' || color?.[0] === 'modes.light.gray.50'}",
      "class:md:color-modes-light-gray-50={color?.md === 'modes.light.gray.50' || color?.[1] === 'modes.light.gray.50'}",
      "class:color-modes-dark-gray-50={color === 'modes.dark.gray.50'}",
      "class:sm:color-modes-dark-gray-50={color?.sm === 'modes.dark.gray.50' || color?.[0] === 'modes.dark.gray.50'}",
      "class:md:color-modes-dark-gray-50={color?.md === 'modes.dark.gray.50' || color?.[1] === 'modes.dark.gray.50'}",
    ]
  `)
})

// optimize mode

test('optimized scale values', () => {
  propUsageCache.set('gap', {
    Component: {
      all: new Set(['1']),
    },
  })

  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    optimize: true,
    prop: {
      name: 'gap',
    },
    scale: [0, 1],
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:gap-1={String(gap) === '1'}",
    ]
  `)
})

test('optimized nested scale values', () => {
  propUsageCache.set('color', {
    Component: {
      all: new Set(['gray.1']),
    },
  })

  const result = getScaleClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    optimize: true,
    prop: {
      name: 'color',
    },
    scale: {
      gray: ['#aaa', '#bbb'],
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:color-gray-1={color === 'gray.1'}",
    ]
  `)
})
