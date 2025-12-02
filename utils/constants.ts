/**
 * Constants used across the test framework
 */
export const Constants = {
  // Timeouts
  TIMEOUT: {
    SHORT: 2000,
    MEDIUM: 5000,
    LONG: 10000,
    VERY_LONG: 30000,
  },

  // Selectors
  SELECTORS: {
    LOADING: '.loading',
    ERROR: '.error',
    SUCCESS: '.success',
    MODAL: '.modal',
    TOAST: '.toast',
  },

  // Test data paths
  TEST_DATA: {
    USERS: './test-data/users.json',
    CONFIG: './test-data/config.json',
  },

  // Browser settings
  BROWSER: {
    WIDTH: 1920,
    HEIGHT: 1080,
  },

  // API endpoints
  API: {
    BASE_URL: 'https://cleankart.quickdrycleaning.com',
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
    USER: '/api/user',
  },
} as const;

