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
