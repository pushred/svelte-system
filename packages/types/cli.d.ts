// must keep in sync with packages/generator/lib/cli.js

export type SharedCommandOptions = {
  config?: string
  watch?: boolean
}

export type GenerateCommandOptions = SharedCommandOptions & {
  optimize?: boolean

  // path options
  componentsPath?: string
  docsPath?: string
  projectPath?: string
  stylesheetPath?: string
}

export type GenerateComponentsCommandOptions = SharedCommandOptions & {
  output: string
  optimize?: boolean

  // path options
  projectPath?: string
}

export type GenerateDocsCommandOptions = SharedCommandOptions & {
  output: string

  // path options
  componentsPath?: string
}

export type GenerateStylesheetCommandOptions = SharedCommandOptions & {
  output: string
  optimize?: boolean

  // path options
  componentsPath?: string
  projectPath?: string
}
