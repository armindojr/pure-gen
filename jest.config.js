export default {
  clearMocks: true,

  collectCoverage: false,

  collectCoverageFrom: [
    "src/cli/generator.js",
    "src/modules/**.js",
    "src/imports.js",
    "src/index.js",
  ],

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: [
    "text-summary",
    "lcov",
  ],

  coverageThreshold: {
    global: {
      branches: 96,
      functions: 96,
      lines: 96,
      statements: 96,
    },
  },

  testMatch: [
    "**/__test__/**.spec.js",
  ],

  transform: {},
};
