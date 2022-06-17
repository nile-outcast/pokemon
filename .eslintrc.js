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
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
  ],

  rules: {
    /** TYPESCRIPT RULES */
    //'@typescript-eslint/ban-ts-ignore': 1,
    // Предпочитать Array<...> формат с параметром (https://github.com/palantir/tslint/issues/2946)
    '@typescript-eslint/array-type': [0, { generic: true }], //[0, { generic: 0 }], // [2, { 'generic' }], // ['error', 'generic'],
    '@typescript-eslint/object-literal-sort-keys': 0,
    // I в IProps не нужно писать для интерфейсов (правильно просто Props)
    //'@typescript-eslint/interface-name-prefix': ['error', 'never'],
    // Разрешает type A = {} вместо interface A {}
    '@typescript-eslint/prefer-interface': 'off',
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
    '@typescript-eslint/no-unused-vars': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    /** COMMON RULES */
    // Нельзя console.log
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-expressions': 'error',
    //'max-len': ['error', 100],
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
    // FIXME: Сделать хотя бы уровня warn
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // FIXME: Группировка импортов
    // '@typescript-eslint/ordered-imports': [
    //   2,
    //   {
    //     'import-sources-order': 'any',
    //     'named-imports-order': 'lowercase-first',
    //     'grouped-imports': true,
    //     groups: [
    //       { name: 'root import', match: '^@components', order: 20 },
    //       { name: 'current dir', match: '^[.]', order: 20 },
    //       { name: 'parent dir', match: '^[.][.]', order: 20 },
    //       { name: 'others', match: '^', order: 10 },
    //     ],
    //   },
    // ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
