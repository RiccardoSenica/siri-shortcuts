/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/app/api/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1'
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage'
};

module.exports = config;
