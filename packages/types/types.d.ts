import { Infer } from 'superstruct'
import { Config, ScaleValues, Theme } from './validation.js'

type Config = Infer<typeof Config>
type ScaleValues = Infer<typeof ScaleValues>

type PropName = 'marginBottom' | 'testId'

type Theme = Infer<typeof Theme>
type ThemeCategory = keyof Theme

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
  propCategories: ThemeCategory[]
}

type Prop = {
  category: ThemeCategory | 'any'
  name: PropName
  type: string
  oneOf?: string[]
}
