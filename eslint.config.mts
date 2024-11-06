import js from '@eslint/js'
import vitestPlugin from '@vitest/eslint-plugin'
import type { Linter } from 'eslint'
import prettierConfig from 'eslint-config-prettier'
import { config, configs } from 'typescript-eslint'

export const rulesToDisable = {
  'no-undef': [0],
  '@typescript-eslint/no-unused-vars': [
    0,
    {
      vars: 'all',
      args: 'after-used',
      caughtErrors: 'all',
      ignoreRestSiblings: false,
      reportUsedIgnorePattern: false,
    },
  ],
  '@typescript-eslint/ban-ts-comment': [
    0,
    [
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 3,
      },
    ],
  ],
  'vitest/valid-describe-callback': [0],
} as const satisfies Linter.RulesRecord

const ESLintConfig = config(
  // `ignores` must be first.
  // config with just `ignores` is the replacement for `.eslintignore`
  {
    name: 'global-ignores',
    ignores: ['**/dist/', '**/html/', 'coverage/', 'extension/', 'examples/'],
  },
  { name: 'javascript', ...js.configs.recommended },
  ...configs.strictTypeChecked,
  ...configs.stylisticTypeChecked,
  vitestPlugin.configs.recommended,
  { name: 'prettier-config', ...prettierConfig },
  {
    name: 'main',
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['./*.?(m|c)js?(x)'],
          defaultProject: 'tsconfig.json',
        },
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { vitest: vitestPlugin },
    settings: { vitest: { typecheck: true } },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
      '@typescript-eslint/consistent-type-exports': [
        2,
        { fixMixedExportsWithInlineTypeSpecifier: false },
      ],
      '@typescript-eslint/no-explicit-any': [
        2,
        { fixToUnknown: false, ignoreRestArgs: false },
      ],
      '@typescript-eslint/no-empty-object-type': [
        2,
        { allowInterfaces: 'never', allowObjectTypes: 'never' },
      ],
      '@typescript-eslint/no-restricted-types': [
        2,
        {
          types: {
            '{}': {
              message: `
- If you want to represent an empty object, use \`type EmptyObject = Record<string, never>\`.
- If you want to represent an object literal, use either \`type AnyObject = Record<string, any>\` or \`object\`.
- If you want to represent any non-nullish value, use \`type AnyNonNullishValue = NonNullable<unknown>\`.`,
              suggest: [
                'AnyNonNullishValue',
                'EmptyObject',
                'AnyObject',
                'object',
                'Record<string, never>',
                'Record<string, any>',
                'NonNullable<unknown>',
              ],
            },
          },
        },
      ],
      '@typescript-eslint/no-namespace': [
        2,
        { allowDeclarations: false, allowDefinitionFiles: true },
      ],

      // TODO: We disable this for now but we _should_ fix it later.
      '@typescript-eslint/consistent-type-definitions': [0, 'type'],
      'sort-imports': [
        2,
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
      '@typescript-eslint/unified-signatures': [2],
      '@typescript-eslint/dot-notation': [2],
      '@typescript-eslint/no-unnecessary-type-parameters': [2],
      '@typescript-eslint/no-invalid-void-type': [
        2,
        { allowInGenericTypeArguments: true, allowAsThisParameter: false },
      ],
      '@typescript-eslint/no-confusing-void-expression': [2],
      '@typescript-eslint/no-duplicate-type-constituents': [2],
      '@typescript-eslint/require-await': [2],
      '@typescript-eslint/no-redundant-type-constituents': [2],
      '@typescript-eslint/no-unnecessary-type-arguments': [2],
      '@typescript-eslint/no-unnecessary-type-assertion': [2],
      '@typescript-eslint/prefer-nullish-coalescing': [2],
      '@typescript-eslint/no-inferrable-types': [2],
      'object-shorthand': [2],
      ...rulesToDisable,
    },
    linterOptions: { reportUnusedDisableDirectives: 2 },
  },
  {
    name: 'commonjs',
    files: ['**/*.c[jt]s'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': [
        0,
        [{ allow: [], allowAsImport: false }],
      ],
    },
  },
  {
    name: 'typescript-declaration-files',
    files: ['**/*.d.?(c|m)ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': [0],
      '@typescript-eslint/no-empty-interface': [
        2,
        { allowSingleExtends: true },
      ],
      '@typescript-eslint/consistent-type-definitions': [0, 'type'],
    },
  },
)

export default ESLintConfig