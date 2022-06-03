import { getBreakpointValues } from './getBreakpointValues.js'

test('returns empty values if breakpoints are undefined', () => {
  const resultA = getBreakpointValues({
    theme: {},
    value: [0],
  })

  expect(Object.keys(resultA)).toHaveLength(0)

  const resultB = getBreakpointValues({
    theme: {
      breakpoints: {},
    },
    value: [0],
  })

  expect(Object.keys(resultB)).toHaveLength(0)
})

test('maps array values to breakpoints', () => {
  const result = getBreakpointValues({
    theme: {
      breakpoints: {
        sm: 'a',
        md: 'b',
      },
    },
    value: [0, 1, 2],
  })

  expect(result).toEqual(
    expect.objectContaining({
      sm: '0',
      md: '1',
    })
  )
})

test('maps object values to breakpoints', () => {
  const result = getBreakpointValues({
    theme: {
      breakpoints: {
        sm: 'a',
        md: 'b',
      },
    },
    value: {
      sm: '0',
      md: '1',
      lg: '2',
    },
  })

  expect(result).toEqual(
    expect.objectContaining({
      sm: '0',
      md: '1',
    })
  )
})
