module.exports = {
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

  testMatch: [
    "**/__test__/**.spec.js",
  ],
};
