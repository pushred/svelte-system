import { globby } from 'globby'
import { readFileSync } from 'fs'

import { eventUsageCache, propUsageCache } from './caches.js'
import { detectPropUsage } from './usage.js'

jest.mock('fs')
jest.mock('globby')

const template = `
  <ComponentA
    propA="a"
    propB={1}
    propC={[1, '2']}
    propG={cond ? 'a' : 'b'}
    propH={condA ? 'a' : condB ? 'c' : undefined}
    propI={{ sm: 'a', md: 'b' }}
    on:click={() => {}}
  >
    <ComponentB propC={3} propD={['a', 'b']} on:focus={() => {}} />
  </ComponentA>
`

beforeAll(async () => {
  globby.mockImplementation(() => {
    return Promise.resolve(['a'])
  })

  readFileSync.mockImplementation(() => {
    return template
  })

  propUsageCache.clear()

  await detectPropUsage({
    outputPath: 'a',
    projectPath: 'b',
    theme: {
      breakpoints: {
        sm: '30em',
        md: '48em',
      },
      components: {
        ComponentA: {
          propC: [1, 2],
          propI: { sm: 'c', md: 'd' },
        },
        ComponentB: {
          propC: 4,
          propD: 'c',
          propE: '2',
          propF: 'a',
        },
      },
    },
  })
})

test('catalogs attribute prop usage from project files in a cache', () => {
  expect(propUsageCache.getAllKeys()).toEqual(
    expect.arrayContaining([
      'propA',
      'propB',
      'propC',
      'propD',
      'propE',
      'propF',
    ])
  )
})

test('catalogs attribute prop usage from theme components in a cache', () => {
  expect(propUsageCache.getAllKeys()).toEqual(
    expect.arrayContaining(['propE', 'propF'])
  )
})

test('catalogs and normalizes attribute prop value usage per component', () => {
  expect(propUsageCache.get('propA').ComponentA.all).toBeInstanceOf(Set)
  expect(propUsageCache.get('propB').ComponentA.all).toBeInstanceOf(Set)
  expect(propUsageCache.get('propC').ComponentB.all).toBeInstanceOf(Set)
  expect(propUsageCache.get('propD').ComponentB.all).toBeInstanceOf(Set)
  expect(propUsageCache.get('propE').ComponentB.all).toBeInstanceOf(Set)
  expect(propUsageCache.get('propF').ComponentB.all).toBeInstanceOf(Set)

  expect([...propUsageCache.get('propA').ComponentA.all]).toEqual(
    expect.arrayContaining(['a'])
  )

  expect([...propUsageCache.get('propB').ComponentA.all]).toEqual(
    expect.arrayContaining(['1'])
  )

  expect([...propUsageCache.get('propC').ComponentB.all]).toEqual(
    expect.arrayContaining(['3', '4'])
  )

  expect([...propUsageCache.get('propD').ComponentB.all]).toEqual(
    expect.arrayContaining(['c'])
  )

  expect([...propUsageCache.get('propE').ComponentB.all]).toEqual(
    expect.arrayContaining(['2'])
  )

  expect([...propUsageCache.get('propF').ComponentB.all]).toEqual(
    expect.arrayContaining(['a'])
  )

  expect([...propUsageCache.get('propG').ComponentA.all]).toEqual(
    expect.arrayContaining(['a', 'b'])
  )

  expect([...propUsageCache.get('propH').ComponentA.all]).toEqual(
    expect.arrayContaining(['a', 'c'])
  )
})

test('catalogs and normalizes attribute prop value usage per component breakpoint', () => {
  expect(propUsageCache.get('propC').ComponentA.sm).toBeInstanceOf(Set)
  expect(propUsageCache.get('propC').ComponentA.md).toBeInstanceOf(Set)
  expect(propUsageCache.get('propD').ComponentB.sm).toBeInstanceOf(Set)
  expect(propUsageCache.get('propD').ComponentB.md).toBeInstanceOf(Set)
  expect(propUsageCache.get('propI').ComponentA.sm).toBeInstanceOf(Set)
  expect(propUsageCache.get('propI').ComponentA.md).toBeInstanceOf(Set)

  expect([...propUsageCache.get('propC').ComponentA.sm]).toEqual(
    expect.arrayContaining(['1'])
  )

  expect([...propUsageCache.get('propC').ComponentA.md]).toEqual(
    expect.arrayContaining(['2'])
  )

  expect([...propUsageCache.get('propD').ComponentB.sm]).toEqual(
    expect.arrayContaining(['a'])
  )

  expect([...propUsageCache.get('propD').ComponentB.md]).toEqual(
    expect.arrayContaining(['b'])
  )

  expect([...propUsageCache.get('propI').ComponentA.sm]).toEqual(
    expect.arrayContaining(['c'])
  )

  expect([...propUsageCache.get('propI').ComponentA.md]).toEqual(
    expect.arrayContaining(['d'])
  )
})

test('catalogs event handler usage per component', () => {
  expect(eventUsageCache.get('ComponentA')).toBeInstanceOf(Set)
  expect(eventUsageCache.get('ComponentB')).toBeInstanceOf(Set)

  expect([...eventUsageCache.get('ComponentA')]).toEqual(
    expect.arrayContaining(['click'])
  )

  expect([...eventUsageCache.get('ComponentB')]).toEqual(
    expect.arrayContaining(['focus'])
  )
})
