import globals from 'globals'

export default [{
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },

    ecmaVersion: 'latest',
    sourceType: 'module',

    parserOptions: {
      ecmaFeatures: {
        impliedStrict: true,
        jsx: true,
      },
    },
  },

  rules: {
    'array-bracket-spacing': ['warn', 'never'],
    'arrow-body-style': ['warn', 'as-needed'],
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': 'warn',
    'block-scoped-var': 'error',
    'brace-style': ['warn', '1tbs'],

    'comma-spacing': ['warn', {
      before: false,
      after: true,
    }],

    'computed-property-spacing': ['warn', 'never'],
    'constructor-super': 'error',
    curly: ['warn', 'multi'],
    'dot-notation': 'warn',
    'getter-return': 'error',

    indent: ['warn', 2, {
      SwitchCase: 1,
    }],

    'key-spacing': ['warn', {
      afterColon: true,
    }],

    'keyword-spacing': 'warn',
    'no-class-assign': ['error'],
    'no-cond-assign': 'error',
    'no-const-assign': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-global-assign': 'error',
    'no-invalid-this': 'error',

    'no-multi-spaces': ['warn', {
      ignoreEOLComments: true,
    }],

    'no-multiple-empty-lines': ['warn', {
      max: 1,
      maxEOF: 1,
    }],

    'no-param-reassign': 'warn',
    'no-redeclare': 'error',
    'no-return-assign': ['warn', 'always'],
    'no-shadow-restricted-names': 'error',
    'no-this-before-super': 'error',
    'no-trailing-spaces': 'warn',
    'no-undef': 'error',
    'no-unexpected-multiline': 'error',
    'no-unneeded-ternary': 'warn',
    'no-unreachable': 'error',
    'no-unused-private-class-members': 'warn',

    'no-unused-vars': ['warn', {
      args: 'after-used',
    }],

    'no-use-before-define': ['error', {
      functions: false,
    }],

    'no-useless-constructor': 'warn',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-curly-spacing': ['warn', 'always'],
    'object-shorthand': 'warn',
    'operator-assignment': ['warn', 'always'],
    'prefer-arrow-callback': 'warn',

    'prefer-const': ['warn', {
      ignoreReadBeforeAssign: true,
    }],

    'prefer-destructuring': ['warn', {
      object: true,
      array: false,
    }],

    'prefer-spread': 'error',
    quotes: ['warn', 'single'],

    semi: ['warn', 'never', {
      beforeStatementContinuationChars: 'always',
    }],

    'semi-spacing': ['warn', {
      before: false,
      after: true,
    }],

    'space-before-blocks': 'warn',
    'space-before-function-paren': ['warn', 'never'],
    'space-in-parens': ['warn', 'never'],
    'space-infix-ops': 'warn',
    'spaced-comment': ['warn', 'always'],
    'vars-on-top': 'error',

    yoda: ['error', 'never', {
      exceptRange: true,
    }],
  },
}]
