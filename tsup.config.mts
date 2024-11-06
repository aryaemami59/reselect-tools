import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

export default defineConfig((overrideOptions) => {
  const commonOptions = {
    clean: true,
    entry: {
      index: 'src/index.ts',
    },
    removeNodeProtocol: false,
    shims: true,
    sourcemap: true,
    splitting: false,
    target: ['esnext'],
    tsconfig: './tsconfig.build.json',
    ...overrideOptions,
  } satisfies Options

  return [
    {
      ...commonOptions,
      name: 'Modern ESM',
      format: ['esm'],
    },
    {
      ...commonOptions,
      name: 'CJS Development',
      format: ['cjs'],
    },
    {
      ...commonOptions,
      name: 'ESM Type definitions',
      dts: { only: true },
      format: ['esm'],
    },
    {
      ...commonOptions,
      name: 'CJS Type definitions',
      dts: { only: true },
      format: ['cjs'],
    },
  ]
})
