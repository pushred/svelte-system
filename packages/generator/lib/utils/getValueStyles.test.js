import { propUsageCache } from '../caches'
import { getValueStyles } from './getValueStyles.js'

test('generates a class/style for each value', () => {
  const result = getValueStyles({
    prop: {
      name: 'textAlign',
    },
    values: ['left', 'right'],
  })

  expect(result).toEqual([
    '.text-align-left { text-align: left }',
    '.text-align-right { text-align: right }',
  ])
})

test('prop alias', () => {
  const result = getValueStyles({
    prop: {
      alias: 'align',
      name: 'alignItems',
    },
    values: ['start', 'end'],
  })

  expect(result).toEqual([
    '.align-start { align-items: start }',
    '.align-end { align-items: end }',
  ])
})

test('omits values unused in project in optimize mode', () => {
  propUsageCache.set('textAlign', new Set(['left']))

  const result = getValueStyles({
    optimize: true,
    prop: {
      name: 'textAlign',
    },
    values: ['left', 'right'],
  })

  expect(result).toEqual(['.text-align-left { text-align: left }'])
})
