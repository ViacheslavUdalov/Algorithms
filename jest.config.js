/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './coverage',
        outputName: 'junit.xml',
      },
    ],
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },


  transform: {
    '^.+\\.ts$': 'ts-jest', 
  },
  "transformIgnorePatterns": [
    "node_modules/(?!(<package-name>)/)"
  ]
};
