import { propNames } from '@svelte-system/props'

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

const BorderShorthand = union([
  literal('none'),
  pattern(
    string(),
    /[0-9]+px (dashed|dotted|double|groove|inset|outset|ridge|solid)/
  ),
])

const BorderStyle = enums([
  'dashed',
  'dotted',
  'double',
  'groove',
  'inset',
  'outset',
  'ridge',
  'solid',
])

const NumberString = pattern(string(), /[A-Z0-9]+/)
const PixelString = pattern(string(), /[0-9]+px/)

const BorderShorthandScaleArray = array(BorderShorthand)
const BorderShorthandScaleObject = record(string(), BorderShorthand)
const BorderStyleScaleArray = array(BorderStyle)
const BorderStyleScaleObject = record(string(), BorderStyle)
const BorderWidthScaleArray = array(union([number(), PixelString]))
const BorderWidthScaleObject = record(string(), union([number(), PixelString]))

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
  text: optional(CssColor),
  background: optional(CssColor),
  primary: optional(CssColor),
  secondary: optional(CssColor),
  accent: optional(CssColor),
  highlight: optional(CssColor),
  muted: optional(CssColor),
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
  // many scales are *user* optional, but effectively required when merged with default theme

  borders: union([BorderShorthandScaleArray, BorderShorthandScaleObject]),

  borderStyles: optional(
    union([BorderStyleScaleArray, BorderStyleScaleObject])
  ),

  borderWidths: optional(
    union([BorderWidthScaleArray, BorderWidthScaleObject])
  ),

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

  // optional configs

  flexGrow: optional(array(number())),
  flexShrink: optional(array(number())),
  order: optional(array(number())),

  components: optional(
    record(
      pattern(string(), /[A-Z][A-Za-z0-9]*/),
      record(enums(propNames), union([number(), string()]))
    )
  ),

  // TODO: add textStyles and layerStyles, if they can be supported
})

export const Config = object({
  componentsPath: optional(string()),
  docsPath: optional(string()),
  theme: Theme,
  outputPath: optional(string()),
})
