/**
 * Test data utility class
 * Centralized location for test data
 */
export class TestData {
  // Login credentials
  static readonly VALID_USERNAME = 'S_admin';
  static readonly VALID_PASSWORD = 'admin@123';
  static readonly VALID_STORE_CODE = 'SUB1';
  static readonly INVALID_USERNAME = 'R_admin1';
  static readonly INVALID_PASSWORD = '1234';
  static readonly INVALID_STORE_CODE = 's000';

  // URLs
  static readonly BASE_URL = 'https://cleankart.quickdrycleaning.com';
  static readonly LOGIN_URL = `${TestData.BASE_URL}/login`;
  static readonly HOME_URL = `${TestData.BASE_URL}/sub1/App/home?EventClick=True`;

  // Timeouts
  static readonly DEFAULT_TIMEOUT = 5000;
  static readonly SHORT_TIMEOUT = 2000;
  static readonly LONG_TIMEOUT = 10000;

  // Test user data
  static readonly TEST_USER = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
  };

  // Search terms
  static readonly SEARCH_TERMS = {
    valid: 'test search',
    invalid: '!@#$%^&*()',
    empty: '',
  };
}

