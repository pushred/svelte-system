import { accumulateProps } from './accumulateProps.js'

const theme = {
  breakpoints: {
    sm: '30em',
    md: '48em',
  },
}

test('initializes prop object', () => {
  const result = accumulateProps(undefined, {
    theme,
    componentName: 'Component',
    propName: 'prop',
    propValue: '1',
  })

  expect(result.prop.Component.all).toContain('1')
})

test('initializes breakpoint value set - array value', () => {
  const result = accumulateProps(undefined, {
    theme,
    componentName: 'Component',
    propName: 'prop',
    propValue: ['1'],
  })

  expect(result.prop.Component.sm).toContain('1')
})

test('initializes breakpoint value set - object value', () => {
  const result = accumulateProps(undefined, {
    theme,
    componentName: 'Component',
    propName: 'prop',
    propValue: { sm: '1' },
  })

  expect(result.prop.Component.sm).toContain('1')
})

test('initializes `all` value set', () => {
  const result = accumulateProps(
    {
      prop: {
        Component: {
          sm: ['1'],
        },
      },
    },
    {
      theme,
      componentName: 'Component',
      propName: 'prop',
      propValue: '1',
    }
  )

  expect(result.prop.Component.all).toContain('1')
  expect(result.prop.Component.sm).toContain('1')
})

test('assigns breakpoint values to existing breakpoint sets - array value', () => {
  const result = accumulateProps(
    {
      prop: {
        Component: {
          sm: new Set('1'),
        },
      },
    },
    {
      theme,
      componentName: 'Component',
      propName: 'prop',
      propValue: ['2', '3'],
    }
  )

  expect(result.prop.Component.sm).toContain('1')
  expect(result.prop.Component.sm).toContain('2')
})

test('assigns breakpoint values to existing breakpoint sets - object value', () => {
  const result = accumulateProps(
    {
      prop: {
        Component: {
          sm: new Set('1'),
        },
      },
    },
    {
      theme,
      componentName: 'Component',
      propName: 'prop',
      propValue: { sm: '2', md: '3' },
    }
  )

  expect(result.prop.Component.sm).toContain('1')
  expect(result.prop.Component.sm).toContain('2')
})

test('assigns standalone value to existing `all` set', () => {
  const result = accumulateProps(
    {
      prop: {
        Component: {
          all: new Set('1'),
        },
      },
    },
    {
      theme,
      componentName: 'Component',
      propName: 'prop',
      propValue: '2',
    }
  )

  expect(result.prop.Component.all).toContain('1')
  expect(result.prop.Component.all).toContain('2')
})

test('adds new props to existing components', () => {
  const result = accumulateProps(
    {
      propA: {
        Component: {
          all: new Set('1'),
        },
      },
    },
    {
      theme,
      componentName: 'Component',
      propName: 'propB',
      propValue: ['1', '2'],
    }
  )

  expect(result.propB.Component.sm).toContain('1')
  expect(result.propB.Component.md).toContain('2')
})

test('normalizes values as strings', () => {
  const result = accumulateProps(
    {
      prop: {
        Component: {
          all: new Set('1'),
        },
      },
    },
    {
      theme,
      componentName: 'Component',
      propName: 'prop',
      propValue: '2',
    }
  )

  expect(result.prop.Component.all).toContain('1')
  expect(result.prop.Component.all).toContain('2')
})
