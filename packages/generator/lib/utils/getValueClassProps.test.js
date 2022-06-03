import { propUsageCache } from '../caches'
import { getValueClassProps } from './getValueClassProps.js'

const theme = {
  breakpoints: {
    sm: '30em',
    md: '48em',
  },
}

beforeEach(() => {
  propUsageCache.clear()
})

test('creates classes for each value and breakpoint combo', () => {
  const result = getValueClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      name: 'textAlign',
      values: ['left', 'right'],
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:text-align-left={textAlign === 'left'}",
      "class:sm:text-align-left={textAlign?.sm === 'left' || textAlign?.[0] === 'left'}",
      "class:md:text-align-left={textAlign?.md === 'left' || textAlign?.[1] === 'left'}",
      "class:text-align-right={textAlign === 'right'}",
      "class:sm:text-align-right={textAlign?.sm === 'right' || textAlign?.[0] === 'right'}",
      "class:md:text-align-right={textAlign?.md === 'right' || textAlign?.[1] === 'right'}",
    ]
  `)
})

test('values with prop aliases', () => {
  const result = getValueClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    prop: {
      alias: 'align',
      name: 'alignItems',
      values: ['start', 'end'],
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:align-start={alignItems === 'start' || align === 'start'}",
      "class:sm:align-start={alignItems?.sm === 'start' || alignItems?.[0] === 'start' || align?.sm === 'start' || align?.[0] === 'start'}",
      "class:md:align-start={alignItems?.md === 'start' || alignItems?.[1] === 'start' || align?.md === 'start' || align?.[1] === 'start'}",
      "class:align-end={alignItems === 'end' || align === 'end'}",
      "class:sm:align-end={alignItems?.sm === 'end' || alignItems?.[0] === 'end' || align?.sm === 'end' || align?.[0] === 'end'}",
      "class:md:align-end={alignItems?.md === 'end' || alignItems?.[1] === 'end' || align?.md === 'end' || align?.[1] === 'end'}",
    ]
  `)
})

// optimize mode

test('optimized values', () => {
  propUsageCache.set('textAlign', {
    Component: {
      all: new Set(['right']),
      sm: new Set(['left']),
    },
  })

  const result = getValueClassProps({
    breakpoints: theme.breakpoints,
    component: {
      name: 'Component',
    },
    optimize: true,
    prop: {
      name: 'textAlign',
      values: ['left', 'right'],
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Array [
      "class:sm:text-align-left={textAlign?.sm === 'left' || textAlign?.[0] === 'left'}",
      "class:text-align-right={textAlign === 'right'}",
    ]
  `)
})
