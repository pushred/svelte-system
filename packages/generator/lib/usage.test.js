import { globby } from 'globby'
import { readFileSync } from 'fs'

import { eventUsageCache, propUsageCache } from './caches.js'
import { detectPropUsage } from './usage.js'

jest.mock('fs')
jest.mock('globby')

const template = `
  <ComponentA propA="a" propB={1} propC={[1, '2']} on:click={() => {}}>
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

  await detectPropUsage({
    outputPath: 'a',
    projectPath: 'b',
    theme: {
      components: {
        ComponentA: {
          propC: [1, 2],
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
    expect.arrayContaining(['propA', 'propB', 'propC'])
  )
})

test('catalogs attribute prop usage from theme components in a cache', () => {
  expect(propUsageCache.getAllKeys()).toEqual(
    expect.arrayContaining(['propE', 'propF'])
  )
})

test('catalogs and normalizes attribute prop value usage per component', () => {
  expect(propUsageCache.get('propA').ComponentA).toBeInstanceOf(Set)
  expect(propUsageCache.get('propB').ComponentA).toBeInstanceOf(Set)
  expect(propUsageCache.get('propC').ComponentA).toBeInstanceOf(Set)
  expect(propUsageCache.get('propC').ComponentB).toBeInstanceOf(Set)
  expect(propUsageCache.get('propD').ComponentB).toBeInstanceOf(Set)
  expect(propUsageCache.get('propE').ComponentB).toBeInstanceOf(Set)
  expect(propUsageCache.get('propF').ComponentB).toBeInstanceOf(Set)

  expect([...propUsageCache.get('propA').ComponentA]).toEqual(
    expect.arrayContaining(['a'])
  )

  expect([...propUsageCache.get('propB').ComponentA]).toEqual(
    expect.arrayContaining(['1'])
  )

  expect([...propUsageCache.get('propC').ComponentA]).toEqual(
    expect.arrayContaining(['1', '2'])
  )

  expect([...propUsageCache.get('propC').ComponentB]).toEqual(
    expect.arrayContaining(['3', '4'])
  )

  expect([...propUsageCache.get('propD').ComponentB]).toEqual(
    expect.arrayContaining(['a', 'b', 'c'])
  )

  expect([...propUsageCache.get('propE').ComponentB]).toEqual(
    expect.arrayContaining(['2'])
  )

  expect([...propUsageCache.get('propF').ComponentB]).toEqual(
    expect.arrayContaining(['a'])
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
