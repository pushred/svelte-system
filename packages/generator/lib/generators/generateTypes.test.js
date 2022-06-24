import { generateTypes } from './generateTypes.js'
import { propUsageCache } from '../caches.js'

test('generates union types for property keyword values', () => {
  const result = generateTypes({
    props: [
      {
        name: 'prop',
        values: ['a', 'b'],
      },
    ],
    theme: {},
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "export type PropValues = 'a' | 'b';",
    ]
  `)
})

// array scales

test('generates union types for each array scale', () => {
  const result = generateTypes({
    props: [],
    theme: {
      space: ['0', '1rem'],
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "export type SpaceValues = 0 | 1 | '0' | '1';",
    ]
  `)
})

// object scales

test('generates union types for each object scale', () => {
  const result = generateTypes({
    props: [],
    theme: {
      space: {
        a: '0',
        b: '1rem',
      },
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "export type SpaceValues = 'a' | 'b';",
    ]
  `)
})

test('generates union types for each object scale with numeric keys', () => {
  const result = generateTypes({
    props: [],
    theme: {
      space: {
        0: '0',
        0.5: '1rem',
        1: '2rem',
      },
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "export type SpaceValues = 0 | 0.5 | 1 | '0' | '0.5' | '1';",
    ]
  `)
})

// optimize mode

test('optimize mode — omits values for unused props', () => {
  propUsageCache.set('alignItems', {
    Component: {
      all: new Set(['start']),
    },
  })

  const result = generateTypes({
    optimize: true,
    props: [
      {
        name: 'alignItems',
        values: ['start', 'end'],
      },
    ],
    theme: {},
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "export type AlignItemsValues = 'start';",
    ]
  `)
})
