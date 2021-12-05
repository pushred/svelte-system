import { getValueStyles } from './getValueStyles.js'

test('generates a class/style for each value', () => {
  const results = getValueStyles({
    prop: {
      name: 'textAlign',
    },
    values: ['left', 'right'],
  })

  expect(results.classes).toEqual([
    "class:text-align-left={textAlign === 'left'}",
    "class:text-align-right={textAlign === 'right'}",
  ])

  expect(results.styles).toEqual([
    '.text-align-left { text-align: left }',
    '.text-align-right { text-align: right }',
  ])
})

test('prop alias', () => {
  const results = getValueStyles({
    prop: {
      alias: 'align',
      name: 'alignItems',
    },
    values: ['start', 'end'],
  })

  expect(results.classes).toEqual([
    "class:align-start={alignItems === 'start' || align === 'start'}",
    "class:align-end={alignItems === 'end' || align === 'end'}",
  ])

  expect(results.styles).toEqual([
    '.align-start { align-items: start }',
    '.align-end { align-items: end }',
  ])
})
