export default {
  clearMocks: true,

  collectCoverage: false,

  collectCoverageFrom: [
    "packages/core/src/cli/generator.js",
    "packages/core/src/modules/**.js",
    "packages/core/src/imports.js",
    "packages/core/src/index.js"
  ],

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: [
    "text-summary",
    "lcov",
  ],

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },

  testMatch: [
    "**/__test__/**.spec.js",
  ],

  transform: {},
};
