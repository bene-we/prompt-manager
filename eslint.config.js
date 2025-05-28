import antfu from '@antfu/eslint-config'
import stylistic from '@stylistic/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default antfu(
  {
    name: 'antfu-overrides',
    typescript: true,
    stylistic: true,
    test: false,
    jsonc: {
      overrides: {
        'jsonc/indent': ['warn', 4],
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': 'warn',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
