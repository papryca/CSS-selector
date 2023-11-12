module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-base"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["tsconfig.json"]
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        "indent": ["error", 4],
        "no-param-reassign": "off",
        "class-methods-use-this": "off",
        "no-use-before-define": 'off'
    },
    root: true,
    "ignorePatterns": [".eslintrc.js","webpack.config.js","jest.config.ts", '/test/*']
}
