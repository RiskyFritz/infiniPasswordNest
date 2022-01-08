module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "tsconfig.json",
      "sourceType": "module"
  },
  "plugins": ["@typescript-eslint/eslint-plugin"],
  "extends": ["plugin:prettier/recommended"],
  "root": true,
  "env": {
      "node": true,
      "jest": true
  },
  "ignorePatterns": [".eslintrc.js"],
  "rules": {
      "@typescript-eslint/interface-name-prefix": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-explicit-any": 2,
      "@typescript-eslint/no-unused-vars": [
          "error",
          {
              "argsIgnorePattern": "^_"
          }
      ],
      "prettier/prettier": [
          "error",
          {
              "trailingComma": "all",
              "singleQuote": true,
              "printWidth": 80,
              "tabWidth": 4
          }
      ]
  }
}
