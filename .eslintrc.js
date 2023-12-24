module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
}
