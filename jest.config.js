module.exports = {
  roots: [
    '<rootDir>/tests',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(.*|(\\.|/)(test|spec))\\.tsx?$',
  testPathIgnorePatterns: ['./tests/index.ts', './tests/isMobile.ts', './tests/defaultUI.ts', './tests/customUI.ts'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  preset: 'jest-puppeteer',
};
