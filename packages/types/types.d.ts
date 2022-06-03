import { Infer } from 'superstruct'

import { Config, Theme } from './validation.js'

type ValueOf<T> = T[keyof T]

type Config = Infer<typeof Config>

type Theme = Infer<typeof Theme>
type ThemeBreakpoints = ValueOf<Pick<Theme, 'breakpoints'>>
type ThemeScale = ArrayScale | ObjectScale
type ThemeScaleName = keyof Theme

type ArrayScale = (number | string)[]

type ObjectScale = {
  [key: string]: number | string | ThemeArrayScale | ThemeObjectScale
}

type ValueTransforms = 'pixels' | 'string'

type PropCategory =
  | 'attributes'
  | 'borders'
  | 'colors'
  | 'flex'
  | 'layout'
  | 'radii'
  | 'sizes'
  | 'space'
  | 'typography'

type CliOptions = {
  config: string
  componentsPath: string
  optimize: boolean
  projectPath: string
  stylesheetPath: string
  output: string
}

type ComponentDoc = {
  name: string
  props: Prop[]
}

type ComponentSpec = {
  defaultProps?: {
    [key: string]: string | number
  }
  filename: string
  name: string
  props: PropCategory[]
}

type Prop = {
  alias?: string
  name: string
  scale?: ThemeScaleName
  transform?: ValueTransforms
  values?: string[]
}

type PropUsageCatalog = {
  // prop
  [key: string]: {
    // component
    [key: string]: {
      // breakpoint values
      [key: string]: Set<string>
    }
  }
}

type Style = {
  breakpoints: Set<string>
  className: string
  cssProp: string
  value: string
}
