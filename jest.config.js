module.exports = {
  coveragePathIgnorePatterns: ["<rootDir>/src/server.ts"],
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  moduleFileExtensions: ["js","ts"],
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["<rootDir>/test/**/*.test.(j|t)s"],
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  }
}