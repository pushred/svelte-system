const config = {
  extensionsToTreatAsEsm: ['.svelte'],
  moduleFileExtensions: ['js', 'svelte'],
  projects: [
    {
      displayName: 'generator',
      moduleNameMapper: {
        'estree-walker': '<rootDir>/node_modules/estree-walker/src/index.js',
      },
      testMatch: ['<rootDir>/packages/generator/**/*.test.js'],
      testEnvironment: 'jsdom',
      transform: {
        '\\.js$': 'babel-jest',
        '\\.svelte$': 'svelte-jester',
      },
      transformIgnorePatterns: [
        '/node_modules/(?!(estree-walker|globby|slash)/)',
      ],
    },
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}

export default config
