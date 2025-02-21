import '@testing-library/jest-dom'

// Mock fetch globally
global.fetch = jest.fn()

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})

// Clean up after each test
afterEach(() => {
  jest.resetAllMocks()
})