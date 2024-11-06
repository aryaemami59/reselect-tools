import { defaultExclude, defineConfig } from 'vitest/config'
import packageJson from './package.json' with { type: 'json' }

const vitestConfig = defineConfig({
  test: {
    name: packageJson.name,
    root: import.meta.dirname,
    exclude: [...defaultExclude, 'extension'],
    globals: true,
    watch: false,
  },
})

export default vitestConfig
