const config = {
  extensionsToTreatAsEsm: ['.svelte'],
  moduleFileExtensions: ['js', 'svelte'],
  projects: [
    {
      displayName: 'generator',
      testMatch: ['<rootDir>/packages/generator/**/*.test.js'],
      testEnvironment: 'jsdom',
      transform: {
        '\\.js$': 'babel-jest',
        '\\.svelte$': 'svelte-jester',
      },
    },
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}

export default config
