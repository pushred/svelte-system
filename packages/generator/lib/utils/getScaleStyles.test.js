import { propUsageCache } from '../caches'
import { getScaleStyles } from './getScaleStyles'

test('array scale', () => {
  const result = getScaleStyles({
    prop: {
      name: 'gap',
    },
    scale: [0, 1],
  })

  expect(result).toEqual(['.gap-0 { gap: 0 }', '.gap-1 { gap: 1px }'])
})

test('array scale with aliases', () => {
  const gaps = [0, 1]

  gaps.sm = gaps[0]
  gaps.lg = gaps[1]

  const result = getScaleStyles({
    prop: {
      name: 'gap',
    },
    scale: gaps,
  })

  expect(result).toEqual(['.gap-0 { gap: 0 }', '.gap-1 { gap: 1px }'])
})

test('prop aliases', () => {
  const result = getScaleStyles({
    prop: {
      alias: 'w',
      name: 'width',
    },
    scale: [0, 4],
  })

  expect(result).toEqual(['.w-0 { width: 0 }', '.w-1 { width: 4px }'])
})

test('array scale with aliases and prop aliases', () => {
  const sizes = [0, 4]

  sizes.sm = sizes[0]
  sizes.lg = sizes[1]

  const result = getScaleStyles({
    prop: {
      alias: 'w',
      name: 'width',
    },
    scale: sizes,
  })

  expect(result).toEqual(['.w-0 { width: 0 }', '.w-1 { width: 4px }'])
})

test('object scale', () => {
  const result = getScaleStyles({
    prop: {
      name: 'color',
    },
    scale: {
      text: '#fff',
      background: '#000',
    },
  })

  expect(result).toEqual([
    '.color-text { color: #fff }',
    '.color-background { color: #000 }',
  ])
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

  expect(result).toEqual([
    '.color-gray-0 { color: #F9FAFB }',
    '.color-gray-1 { color: #F3F4F6 }',
  ])
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

  expect(result).toEqual([
    '.color-modes-light-text { color: #000 }',
    '.color-modes-light-background { color: #FFF }',
    '.color-modes-dark-text { color: #FFF }',
    '.color-modes-dark-background { color: #000 }',
  ])
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

  expect(result).toEqual([
    '.color-modes-light-gray-0 { color: #F9FAFB }',
    '.color-modes-light-gray-1 { color: #F3F4F6 }',
    '.color-modes-dark-gray-0 { color: #F3F4F6 }',
    '.color-modes-dark-gray-1 { color: #F9FAFB }',
  ])
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

  expect(result).toEqual([
    '.color-modes-light-gray-50 { color: #F9FAFB }',
    '.color-modes-dark-gray-50 { color: #F8FAFC }',
  ])
})

test('omits values unused in project in optimize mode', () => {
  propUsageCache.set('gap', new Set(['1']))

  const result = getScaleStyles({
    optimize: true,
    prop: {
      name: 'gap',
    },
    scale: [0, 1],
  })

  expect(result).toEqual(['.gap-1 { gap: 1px }'])
})
