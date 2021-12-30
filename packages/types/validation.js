import hexColorRegex from 'hex-color-regex'
import hexaColorRegex from 'hexa-color-regex'
import hslColorRegex from 'hsl-regex'
import hslaColorRegex from 'hsla-regex'
import rgbColorRegex from 'rgb-regex'
import rgbaColorRegex from 'rgba-regex'

import {
  array,
  enums,
  integer,
  literal,
  number,
  object,
  optional,
  pattern,
  record,
  string,
  type,
  union,
} from 'superstruct'

const NumberString = pattern(string(), /[A-Z0-9]+/)

const CssHexColor = pattern(string(), hexColorRegex({ strict: true }))
const CssHexAlphaColor = pattern(string(), hexaColorRegex({ strict: true }))
const CssHslColor = pattern(string(), hslColorRegex({ strict: true }))
const CssHslAlphaColor = pattern(string(), hslaColorRegex({ strict: true }))
const CssRgbColor = pattern(string(), rgbColorRegex({ strict: true }))
const CssRgbAlphaColor = pattern(string(), rgbaColorRegex({ strict: true }))

const CssColor = union([
  CssHexColor,
  CssHexAlphaColor,
  CssHslColor,
  CssHslAlphaColor,
  CssRgbColor,
  CssRgbAlphaColor,
])

const CssLength = pattern(
  string(),
  // values from https://developer.mozilla.org/en-US/docs/Web/CSS/length
  /-?[0-9.]+(cap|ch|em|ex|ic|lh|rem|rlh|vh|vw|vi|vb|vmin|vmax|px|cm|mm|Q|in|pc|pt|%)/
)

// TODO: define pattern
const CssFontFamily = string()

const CssLineHeight = union([pattern(string(), /[0-9\.]+%?/), number()])
const CssFontWeight = union([pattern(string(), /[0-9]+/), integer()])

// TODO: type nested scales, esp. modes
const ColorsScale = type({
  text: CssColor,
  background: CssColor,
  primary: CssColor,
  secondary: CssColor,
  accent: CssColor,
  highlight: CssColor,
  muted: CssColor,
})

export const ScaleArray = array(union([CssLength, literal(0), literal('0')]))

export const ScaleObject = record(
  string(),
  union([CssLength, literal(0), literal('0')])
)

export const UnitlessScaleArray = array(number())
export const UnitlessScaleObject = record(string(), number())

const LengthScale = union([
  ScaleArray,
  ScaleObject,
  UnitlessScaleArray,
  UnitlessScaleObject,
])

export const Theme = type({
  colors: ColorsScale,

  fonts: type({
    body: optional(CssFontFamily),
    heading: optional(CssFontFamily),
    monospace: optional(CssFontFamily),
  }),

  fontSizes: LengthScale,

  fontWeights: union([
    type({
      body: optional(CssFontWeight),
      bold: optional(CssFontWeight),
      heading: optional(CssFontWeight),
    }),
    array(number()),
    array(NumberString),
  ]),

  letterSpacings: union([ScaleArray, ScaleObject]),

  lineHeights: union([
    type({
      body: optional(CssLineHeight),
      heading: optional(CssLineHeight),
    }),
    array(number()),
    array(NumberString),
  ]),

  sizes: LengthScale,
  space: LengthScale,
  flexGrow: array(number()),
  flexShrink: array(number()),
  order: array(number()),

  // TODO: add textStyles and layerStyles, if they can be supported
})

export const Config = object({
  componentsPath: optional(string()),
  docsPath: optional(string()),
  theme: Theme,
})
