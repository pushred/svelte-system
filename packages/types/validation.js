import { object, optional, pattern, record, string } from 'superstruct'

const ScaleProperty = pattern(string(), /[0-9]+/)

const CssLength = pattern(
  string(),
  // values from https://developer.mozilla.org/en-US/docs/Web/CSS/length
  /[0-9]+(cap|ch|em|ex|ic|lh|rem|rlh|vh|vw|vi|vb|vmin|vmax|px|cm|mm|Q|in|pc|pt)/
)

export const ScaleValues = record(ScaleProperty, CssLength)

export const Theme = object({
  space: ScaleValues,
})

export const Config = object({
  componentsPath: optional(string()),
  docsPath: optional(string()),
  theme: Theme,
})
