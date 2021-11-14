import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { build, defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function buildDocs({ components, outputPath }) {
  const root = join(__dirname, 'vite-root')

  writeFileSync(
    join(root, 'src', 'components.json'),
    JSON.stringify(components, null, 2)
  )

  return build(
    defineConfig({
      root,
      build: {
        emptyOutDir: true,
        outDir: outputPath,
      },
      logLevel: 'warn',
      plugins: [svelte()],
    })
  )
}
