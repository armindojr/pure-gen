export default {
  clearMocks: true,

  collectCoverage: false,

  collectCoverageFrom: [
    'src/modules/**.js',
    'src/imageProviders/**.js',
    'src/cli/generator.js',
    'src/imports.js',
    'src/index.js'
  ],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  coverageReporters: ['text-summary', 'lcov'],

  testMatch: ['**/test/**.spec.js'],

  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  }
};
