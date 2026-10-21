module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser

  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },

  plugins: ['react', '@typescript-eslint', 'react-hooks', 'simple-import-sort'],

  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  rules: {
    /** TYPESCRIPT RULES */
    // Предпочитать Array<...> формат с параметром (https://github.com/palantir/tslint/issues/2946)
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    // Не использовать any
    '@typescript-eslint/no-explicit-any': 'warn',
    // У функций нужно определять return type
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    // Можно использовать переменные до их объявления (нужно для Styled-components)
    '@typescript-eslint/no-use-before-define': 'off',
    // FIXME: Отдаем unused-vars на откуп tsc-lint ('noUnusedLocals': true)
    '@typescript-eslint/no-unused-vars': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    /** COMMON RULES */
    // Нельзя console.log
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-expressions': 'error',
    'max-len': ['error', 100],
    'eol-last': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

    /** REACT RULES */
    // Можно прокидывать пропсы без значения в компоненты <A fullWidth />
    'react/jsx-boolean-value': ['error', 'never'],
    // Можно не проверять propTypes, так как есть Typescript Props
    'react/prop-types': 'off',
    // JSX Transform v2 (CRA) — React импортировать не нужно
    'react/react-in-jsx-scope': 'off',
    // FIXME: Сделать хотя бы уровня warn
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect',
    },
  },
};
