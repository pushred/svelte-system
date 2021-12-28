import { Infer } from 'superstruct'

import { Config, Theme } from './validation.js'

type Config = Infer<typeof Config>

type Theme = Infer<typeof Theme>
type ThemeScale = ArrayScale | ObjectScale
type ThemeScaleName = keyof Theme

type ArrayScale = (number | string)[]

type ObjectScale = {
  [key: string]: number | string | ThemeArrayScale | ThemeObjectScale
}

type PropCategory =
  | 'attributes'
  | 'colors'
  | 'flex'
  | 'layout'
  | 'sizes'
  | 'space'
  | 'typography'

type CliOptions = {
  config: string
  componentsPath: string
  output: string
}

type ComponentDoc = {
  name: string
  props: Prop[]
}

type ComponentSpec = {
  filename: string
  name: string
  props: PropCategory[]
}

type DerivedComponentSpec = {
  defaultProps: {
    [key: string]: string
  }
  filename: string
  name: string
  sourceComponent: string
}

type Prop = {
  alias?: string
  name: string
  scale?: ThemeScaleName
  values?: string[]
}
