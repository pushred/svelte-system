import { getScaleStyles } from './getScaleStyles'

test('array scale', () => {
  const result = getScaleStyles({
    prop: {
      name: 'gap',
    },
    scale: [0, 1],
  })

  expect(result.classes).toEqual([
    "class:gap-0={gap === '0'}",
    "class:gap-1={gap === '1'}",
  ])

  expect(result.styles).toEqual(['.gap-0 { gap: 0 }', '.gap-1 { gap: 1px }'])
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

  expect(result.classes).toEqual([
    "class:gap-0={gap === '0' || gap === 'sm'}",
    "class:gap-1={gap === '1' || gap === 'lg'}",
  ])

  expect(result.styles).toEqual(['.gap-0 { gap: 0 }', '.gap-1 { gap: 1px }'])
})

test('prop aliases', () => {
  const result = getScaleStyles({
    prop: {
      alias: 'w',
      name: 'width',
    },
    scale: [0, 4],
  })

  expect(result.classes).toEqual([
    "class:w-0={width === '0' || w === '0'}",
    "class:w-1={width === '1' || w === '1'}",
  ])

  expect(result.styles).toEqual(['.w-0 { width: 0 }', '.w-1 { width: 4px }'])
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

  expect(result.classes).toEqual([
    "class:w-0={width === '0' || width === 'sm' || w === '0' || w === 'sm'}",
    "class:w-1={width === '1' || width === 'lg' || w === '1' || w === 'lg'}",
  ])

  expect(result.styles).toEqual(['.w-0 { width: 0 }', '.w-1 { width: 4px }'])
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

  expect(result.classes).toEqual([
    "class:color-text={color === 'text'}",
    "class:color-background={color === 'background'}",
  ])

  expect(result.styles).toEqual([
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

  expect(result.classes).toEqual([
    "class:color-gray-0={color === 'gray.0'}",
    "class:color-gray-1={color === 'gray.1'}",
  ])

  expect(result.styles).toEqual([
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

  expect(result.classes).toEqual([
    "class:color-modes-light-text={color === 'modes.light.text'}",
    "class:color-modes-light-background={color === 'modes.light.background'}",
    "class:color-modes-dark-text={color === 'modes.dark.text'}",
    "class:color-modes-dark-background={color === 'modes.dark.background'}",
  ])

  expect(result.styles).toEqual([
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

  expect(result.classes).toEqual([
    "class:color-modes-light-gray-0={color === 'modes.light.gray.0' || color === 'modes.light.gray.a'}",
    "class:color-modes-light-gray-1={color === 'modes.light.gray.1' || color === 'modes.light.gray.b'}",
    "class:color-modes-dark-gray-0={color === 'modes.dark.gray.0' || color === 'modes.dark.gray.a'}",
    "class:color-modes-dark-gray-1={color === 'modes.dark.gray.1' || color === 'modes.dark.gray.b'}",
  ])

  expect(result.styles).toEqual([
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

  expect(result.classes).toEqual([
    "class:color-modes-light-gray-50={color === 'modes.light.gray.50'}",
    "class:color-modes-dark-gray-50={color === 'modes.dark.gray.50'}",
  ])

  expect(result.styles).toEqual([
    '.color-modes-light-gray-50 { color: #F9FAFB }',
    '.color-modes-dark-gray-50 { color: #F8FAFC }',
  ])
})
