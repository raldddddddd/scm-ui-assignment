/**
 * Jest configuration for testing accessibility animations
 */

export default {
  // Use jsdom environment to simulate browser
  testEnvironment: 'jsdom',
  
  // Transform ES6 modules using babel-jest
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json'],
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!babel.config.js'
  ],
  
  // Setup files
  setupFilesAfterEnv: [],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  
  // Verbose output
  verbose: true,
  
  // Mock canvas and other browser APIs
  setupFiles: ['<rootDir>/jest.setup.js']
};