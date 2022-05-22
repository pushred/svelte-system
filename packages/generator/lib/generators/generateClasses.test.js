import { propUsageCache } from '../caches'
import { generateClasses } from './generateClasses.js'

test('values', () => {
  const result = generateClasses({
    prop: {
      name: 'textAlign',
      values: ['left', 'right'],
    },
  })

  expect(result).toEqual([
    "'text-align-left': textAlign === 'left'",
    "'text-align-right': textAlign === 'right'",
  ])
})

test('values with prop aliases', () => {
  const result = generateClasses({
    prop: {
      alias: 'align',
      name: 'alignItems',
      values: ['start', 'end'],
    },
  })

  expect(result).toEqual([
    "'align-start': alignItems === 'start' || align === 'start'",
    "'align-end': alignItems === 'end' || align === 'end'",
  ])
})

test('array scale', () => {
  const result = generateClasses({
    prop: {
      name: 'gap',
      scale: 'space',
    },
    theme: {
      space: [0, 1],
    },
  })

  expect(result).toEqual(["'gap-0': gap === '0'", "'gap-1': gap === '1'"])
})

test('array scale with index aliases', () => {
  const gaps = [0, 1]

  gaps.sm = gaps[0]
  gaps.lg = gaps[1]

  const result = generateClasses({
    prop: {
      name: 'gap',
      scale: 'space',
    },
    theme: {
      space: gaps,
    },
  })

  expect(result).toEqual([
    "'gap-0': gap === '0' || gap === 'sm'",
    "'gap-1': gap === '1' || gap === 'lg'",
  ])
})

test('generates scale-based classes using prop aliases when available', () => {
  const result = generateClasses({
    prop: {
      alias: 'w',
      name: 'width',
      scale: 'sizes',
    },
    theme: {
      sizes: [0, 4],
    },
  })

  expect(result).toEqual([
    "'w-0': width === '0' || w === '0'",
    "'w-1': width === '1' || w === '1'",
  ])
})

test('array scale with index aliases and prop aliases', () => {
  const sizes = [0, 4]

  sizes.sm = sizes[0]
  sizes.lg = sizes[1]

  const result = generateClasses({
    prop: {
      alias: 'w',
      name: 'width',
      scale: 'sizes',
    },
    theme: {
      sizes,
    },
  })

  expect(result).toEqual([
    "'w-0': width === '0' || width === 'sm' || w === '0' || w === 'sm'",
    "'w-1': width === '1' || width === 'lg' || w === '1' || w === 'lg'",
  ])
})

test('object scale', () => {
  const result = generateClasses({
    prop: {
      name: 'color',
      scale: 'colors',
    },
    theme: {
      colors: {
        text: '#fff',
        background: '#000',
      },
    },
  })

  expect(result).toEqual([
    "'color-text': color === 'text'",
    "'color-background': color === 'background'",
  ])
})

// nesting

test('nested array scale', () => {
  const result = generateClasses({
    prop: {
      name: 'color',
      scale: 'colors',
    },
    theme: {
      colors: {
        gray: ['#F9FAFB', '#F3F4F6'],
      },
    },
  })

  expect(result).toEqual([
    "'color-gray-0': color === 'gray.0'",
    "'color-gray-1': color === 'gray.1'",
  ])
})

test('nested object scale', () => {
  const result = generateClasses({
    prop: {
      name: 'color',
      scale: 'colors',
    },
    theme: {
      colors: {
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
    },
  })

  expect(result).toEqual([
    "'color-modes-light-text': color === 'modes.light.text'",
    "'color-modes-light-background': color === 'modes.light.background'",
    "'color-modes-dark-text': color === 'modes.dark.text'",
    "'color-modes-dark-background': color === 'modes.dark.background'",
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

  const result = generateClasses({
    prop: {
      name: 'color',
      scale: 'colors',
    },
    theme: {
      colors: {
        modes,
      },
    },
  })

  expect(result).toEqual([
    "'color-modes-light-gray-0': color === 'modes.light.gray.0' || color === 'modes.light.gray.a'",
    "'color-modes-light-gray-1': color === 'modes.light.gray.1' || color === 'modes.light.gray.b'",
    "'color-modes-dark-gray-0': color === 'modes.dark.gray.0' || color === 'modes.dark.gray.a'",
    "'color-modes-dark-gray-1': color === 'modes.dark.gray.1' || color === 'modes.dark.gray.b'",
  ])
})

test('deeply nested object scale', () => {
  const result = generateClasses({
    prop: {
      name: 'color',
      scale: 'colors',
    },
    theme: {
      colors: {
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
    },
  })

  expect(result).toEqual([
    "'color-modes-light-gray-50': color === 'modes.light.gray.50'",
    "'color-modes-dark-gray-50': color === 'modes.dark.gray.50'",
  ])
})

// optimize

test('optimized values', () => {
  propUsageCache.set('textAlign', new Set(['left']))

  const result = generateClasses({
    optimize: true,
    prop: {
      name: 'textAlign',
      values: ['left', 'right'],
    },
  })

  expect(result).toEqual(["'text-align-left': textAlign === 'left'"])
})

test('optimized scale values', () => {
  propUsageCache.set('gap', new Set(['1']))

  const result = generateClasses({
    optimize: true,
    prop: {
      name: 'gap',
      scale: 'space',
    },
    theme: {
      space: [0, 1],
    },
  })

  expect(result).toEqual(["'gap-1': gap === '1'"])
})
