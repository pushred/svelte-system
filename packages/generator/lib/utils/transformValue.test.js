import { transformValue } from './transformValue'

test('string value', () => {
  expect(transformValue('1.5rem')).toEqual('1.5rem')
})

test('integer value', () => {
  expect(transformValue(1)).toEqual('1px')
})

test('string integer value', () => {
  expect(transformValue('1')).toEqual('1px')
})

test('unitless integer value', () => {
  expect(transformValue(400, 'string')).toEqual('400')
})

test('decimal value', () => {
  expect(transformValue(1.5)).toEqual('1.5px')
})

test('string decimal value', () => {
  expect(transformValue('1.5')).toEqual('1.5px')
})

test('fractional value', () => {
  expect(transformValue(0.5)).toEqual('0.5px')
})

test('string fractional value', () => {
  expect(transformValue('0.5')).toEqual('0.5px')
})
