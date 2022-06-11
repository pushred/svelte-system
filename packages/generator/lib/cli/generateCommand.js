import {
  generateComponentsCommand as generateComponents,
  generateDocsCommand as generateDocs,
  generateStylesheetCommand as generateStylesheet,
} from './index.js'

export async function generateCommand(options) {
  await generateComponents(options)
  await generateStylesheet(options)
  await generateDocs(options)
}
