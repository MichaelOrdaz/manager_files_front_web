module.exports = {
    extends: [
        "@vue/typescript/recommended",
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
    ],
    plugins: ['eslint-plugin-vue', 'vue', 'import'],
    globals: {
        chrome: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    rules: {
        'no-param-reassign': 'off',
        'no-void': 'off',
        'no-nested-ternary': 'off',
        'max-classes-per-file': 'off',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        'generator-star-spacing': 'off',
        'arrow-parens': 'off',
        'one-var': 'off',
        'import/first': 'off',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'prefer-promise-reject-errors': 'off',
        'vue/attribute-hyphenation': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "vue/multi-word-component-names": ["error", {
            "ignores": ["index"]
        }]
    },
}
