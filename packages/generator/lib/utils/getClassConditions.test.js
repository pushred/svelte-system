import { propUsageCache } from '../caches'
import { getClassConditions } from './getClassConditions.js'

beforeEach(() => {
  propUsageCache.clear()
})

test('creates conditional logic evaluating to true for given prop name and value', () => {
  const result = getClassConditions({
    prop: {
      name: 'alignItems',
    },
    propValue: 'start',
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "alignItems === 'start'",
    ]
  `)
})

test('includes prop alias conditions when available', () => {
  const result = getClassConditions({
    prop: {
      alias: 'align',
      name: 'alignItems',
    },
    propValue: 'start',
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "alignItems === 'start'",
      "align === 'start'",
    ]
  `)
})

test('includes breakpoint key and index conditions when specified', () => {
  const result = getClassConditions({
    breakpointIndex: 0,
    breakpointKey: 'sm',
    prop: {
      alias: 'align',
      name: 'alignItems',
    },
    propValue: 'start',
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "alignItems?.sm === 'start'",
      "alignItems?.[0] === 'start'",
      "align?.sm === 'start'",
      "align?.[0] === 'start'",
    ]
  `)
})

test('includes value prefix when specified', () => {
  const result = getClassConditions({
    breakpointIndex: 0,
    breakpointKey: 'sm',
    prop: {
      alias: 'align',
      name: 'alignItems',
    },
    propValue: '1',
    propValuePrefix: 'prefix',
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "alignItems?.sm === 'prefix.1'",
      "alignItems?.[0] === 'prefix.1'",
      "align?.sm === 'prefix.1'",
      "align?.[0] === 'prefix.1'",
    ]
  `)
})

test('casts number values as a string', () => {
  const result = getClassConditions({
    prop: {
      name: 'marginTop',
    },
    propValue: 1,
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "String(marginTop) === '1'",
    ]
  `)
})

// optimize mode

test('optimize mode — omits condition if prop name is unused', () => {
  propUsageCache.set('alignItems', {
    Component: {
      all: new Set(['end']),
    },
  })

  const result = getClassConditions({
    optimize: true,
    prop: {
      name: 'alignItems',
    },
    propValue: 'start',
  })

  expect(result).toHaveLength(0)
})

test('optimize mode — omits condition if prop alias is unused', () => {
  propUsageCache.set('align', {
    Component: {
      all: new Set(['start']),
    },
  })

  const result = getClassConditions({
    optimize: true,
    prop: {
      alias: 'align',
      name: 'alignItems',
    },
    propValue: 'end',
  })

  expect(result).toHaveLength(0)
})
