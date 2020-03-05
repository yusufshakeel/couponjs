module.exports = {
  testEnvironment: 'node',
  verbose: true,
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/jest.config.js',
    '!**/coverage/**',
    '!**/docs/**',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  coverageThreshold: {
    'global': {
      'branches': 80,
      'functions': 80,
      'lines': 80
    }
  }
};