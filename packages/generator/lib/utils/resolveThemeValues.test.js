import { cosmiconfigSync } from 'cosmiconfig'
import get from 'lodash.get'

import { resolveThemeValues } from './resolveThemeValues.js'

const mockConfig = cosmiconfigSync().search().config

test('values by exact path', () => {
  const theme = mockConfig.theme
  theme.text.h1.color = 'colors.gray.900'

  const { text } = resolveThemeValues(theme)

  expect(text.h1.color).toEqual(get(theme, 'colors.gray.900'))
})

test('scale values by exact path', () => {
  const theme = mockConfig.theme
  theme.text.h1.color = 'text.body.color'

  const { text } = resolveThemeValues(theme)

  expect(text.h1.color).toEqual(get(theme, `colors.${theme.text.body.color}`))
})

test('scale values by prop', () => {
  const theme = mockConfig.theme

  const { layerStyles } = resolveThemeValues(theme)

  expect(layerStyles.panel.backgroundColor).toEqual(
    get(theme, `colors.${theme.layerStyles.panel.backgroundColor}`)
  )
})

test('scale values by prop alias', () => {
  const theme = mockConfig.theme
  theme.layerStyles.panel.bgColor = theme.layerStyles.panel.backgroundColor

  const { layerStyles } = resolveThemeValues(theme)

  expect(layerStyles.panel.bgColor).toEqual(
    get(theme, `colors.${theme.layerStyles.panel.backgroundColor}`)
  )
})

test('nulls unresolved values', () => {
  const theme = mockConfig.theme
  theme.text.h1.letterSpacing = 'unresolvable.value'

  const { text } = resolveThemeValues(theme)

  expect(text.h1.letterSpacing).toEqual(null)
})

test('omits unknown props', () => {
  const theme = mockConfig.theme
  theme.text.h1.unknown = 'value'

  const { text } = resolveThemeValues(theme)

  expect(Object.keys(text.h1)).not.toContain('unknown')
})
