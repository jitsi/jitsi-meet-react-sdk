const { rules } = require('eslint-config-jitsi');

module.exports = {
    env: {
        browser: true,
        jest: true,
        node: true
    },
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-import'
    ],
    rules: {
        ...rules,
        semi: 'off',
        'no-confusing-arrow': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off'
    }
}
