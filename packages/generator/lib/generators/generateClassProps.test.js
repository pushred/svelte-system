import { propUsageCache } from '../caches'
import { generateClassProps } from './generateClassProps.js'

test('values', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
    prop: {
      name: 'textAlign',
      values: ['left', 'right'],
    },
  })

  expect(result).toEqual([
    "class:text-align-left={textAlign === 'left'}",
    "class:text-align-right={textAlign === 'right'}",
  ])
})

test('values with prop aliases', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
    prop: {
      alias: 'align',
      name: 'alignItems',
      values: ['start', 'end'],
    },
  })

  expect(result).toEqual([
    "class:align-start={alignItems === 'start' || align === 'start'}",
    "class:align-end={alignItems === 'end' || align === 'end'}",
  ])
})

test('array scale', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
    prop: {
      name: 'gap',
      scale: 'space',
    },
    theme: {
      space: [0, 1],
    },
  })

  expect(result).toEqual([
    "class:gap-0={gap === '0'}",
    "class:gap-1={gap === '1'}",
  ])
})

test('array scale with index aliases', () => {
  const gaps = [0, 1]

  gaps.sm = gaps[0]
  gaps.lg = gaps[1]

  const result = generateClassProps({
    component: {
      name: 'Component',
    },
    prop: {
      name: 'gap',
      scale: 'space',
    },
    theme: {
      space: gaps,
    },
  })

  expect(result).toEqual([
    "class:gap-0={gap === '0' || gap === 'sm'}",
    "class:gap-1={gap === '1' || gap === 'lg'}",
  ])
})

test('generates scale-based classes using prop aliases when available', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
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
    "class:w-0={width === '0' || w === '0'}",
    "class:w-1={width === '1' || w === '1'}",
  ])
})

test('array scale with index aliases and prop aliases', () => {
  const sizes = [0, 4]

  sizes.sm = sizes[0]
  sizes.lg = sizes[1]

  const result = generateClassProps({
    component: {
      name: 'Component',
    },
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
    "class:w-0={width === '0' || width === 'sm' || w === '0' || w === 'sm'}",
    "class:w-1={width === '1' || width === 'lg' || w === '1' || w === 'lg'}",
  ])
})

test('object scale', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
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
    "class:color-text={color === 'text'}",
    "class:color-background={color === 'background'}",
  ])
})

// nesting

test('nested array scale', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
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
    "class:color-gray-0={color === 'gray.0'}",
    "class:color-gray-1={color === 'gray.1'}",
  ])
})

test('nested object scale', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
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
    "class:color-modes-light-text={color === 'modes.light.text'}",
    "class:color-modes-light-background={color === 'modes.light.background'}",
    "class:color-modes-dark-text={color === 'modes.dark.text'}",
    "class:color-modes-dark-background={color === 'modes.dark.background'}",
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

  const result = generateClassProps({
    component: {
      name: 'Component',
    },
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
    "class:color-modes-light-gray-0={color === 'modes.light.gray.0' || color === 'modes.light.gray.a'}",
    "class:color-modes-light-gray-1={color === 'modes.light.gray.1' || color === 'modes.light.gray.b'}",
    "class:color-modes-dark-gray-0={color === 'modes.dark.gray.0' || color === 'modes.dark.gray.a'}",
    "class:color-modes-dark-gray-1={color === 'modes.dark.gray.1' || color === 'modes.dark.gray.b'}",
  ])
})

test('deeply nested object scale', () => {
  const result = generateClassProps({
    component: {
      name: 'Component',
    },
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
    "class:color-modes-light-gray-50={color === 'modes.light.gray.50'}",
    "class:color-modes-dark-gray-50={color === 'modes.dark.gray.50'}",
  ])
})

// optimize

test('optimized values', () => {
  propUsageCache.set('textAlign', {
    Component: new Set(['left']),
  })

  const result = generateClassProps({
    component: {
      name: 'Component',
    },
    optimize: true,
    prop: {
      name: 'textAlign',
      values: ['left', 'right'],
    },
  })

  expect(result).toEqual(["class:text-align-left={textAlign === 'left'}"])
})

test('optimized scale values', () => {
  propUsageCache.set('gap', {
    Component: new Set(['1']),
  })

  const result = generateClassProps({
    component: {
      name: 'Component',
    },
    optimize: true,
    prop: {
      name: 'gap',
      scale: 'space',
    },
    theme: {
      space: [0, 1],
    },
  })

  expect(result).toEqual(["class:gap-1={gap === '1'}"])
})

test('optimized nested scale values', () => {
  propUsageCache.set('color', {
    Component: new Set(['gray.1']),
  })

  const result = generateClassProps({
    component: {
      name: 'Component',
    },
    optimize: true,
    prop: {
      name: 'color',
      scale: 'colors',
    },
    theme: {
      colors: {
        gray: ['#aaa', '#bbb'],
      },
    },
  })

  expect(result).toEqual(["class:color-gray-1={color === 'gray.1'}"])
})
