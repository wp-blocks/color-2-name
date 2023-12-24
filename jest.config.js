module.exports = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest', {
        jsc: {
          'parser': { 'syntax': 'typescript' }
        }
      }
    ],
  },
  collectCoverage: true
}
