# Playwright Testing Framework with TypeScript and Page Object Model

This is a comprehensive Playwright testing framework built with TypeScript using the Page Object Model (POM) design pattern. The framework provides a scalable and maintainable structure for writing end-to-end tests.

## 📁 Project Structure

```
QDC-Playwright/
├── pages/                  # Page Object Model classes
│   ├── BasePage.ts        # Base page class with common functionality
│   ├── LoginPage.ts       # Login page object
│   └── HomePage.ts        # Home page object
├── tests/                  # Test files (Playwright)
│   ├── example.spec.ts    # Example test file
│   └── login.spec.ts      # Login page tests
├── features/               # Cucumber BDD feature files
│   ├── login.feature      # Login feature scenarios
│   ├── home.feature       # Home page feature scenarios
│   ├── step-definitions/  # Cucumber step definitions
│   └── support/           # Cucumber support files
├── utils/                  # Utility files and helpers
│   ├── TestData.ts        # Test data constants
│   ├── Helpers.ts         # Helper functions
│   └── constants.ts       # Framework constants
├── playwright.config.ts    # Playwright configuration
├── cucumber.config.js      # Cucumber configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 📝 Usage

### Running Tests

- **Run all tests:**
  ```bash
  npm test
  ```

- **Run tests in headed mode (with browser UI):**
  ```bash
  npm run test:headed
  ```

- **Run tests in debug mode:**
  ```bash
  npm run test:debug
  ```

- **Run tests with UI mode:**
  ```bash
  npm run test:ui
  ```

- **View test report:**
  ```bash
  npm run test:report
  ```

- **Generate code with Playwright Codegen:**
  ```bash
  npm run test:codegen
  ```

### Running Cucumber BDD Tests

- **Run all Cucumber tests:**
  ```bash
  npm run test:cucumber
  ```

- **Run Cucumber tests in headed mode:**
  ```bash
  npm run test:cucumber:headed
  ```

- **Run specific feature file:**
  ```bash
  npx cucumber-js --config cucumber.config.js features/login.feature
  ```

### Running Specific Tests

- **Run a specific test file:**
  ```bash
  npx playwright test tests/login.spec.ts
  ```

- **Run tests matching a pattern:**
  ```bash
  npx playwright test --grep "login"
  ```

- **Run tests in a specific browser:**
  ```bash
  npx playwright test --project=chromium
  ```

## 🏗️ Page Object Model Structure

### Base Page Class

The `BasePage` class provides common functionality that all page objects inherit:

- Navigation methods
- Element interaction methods
- Wait methods
- Screenshot capabilities

### Creating a New Page Object

1. **Create a new page class extending BasePage:**
   ```typescript
   import { Page } from '@playwright/test';
   import { BasePage } from './BasePage';

   export class NewPage extends BasePage {
     readonly someElement = () => this.page.locator('#some-element');

     constructor(page: Page) {
       super(page);
     }

     async navigate(): Promise<void> {
       await this.goto('/new-page');
       await this.waitForLoadState();
     }
   }
   ```

2. **Use the page object in tests:**
   ```typescript
   import { test } from '@playwright/test';
   import { NewPage } from '../pages/NewPage';

   test('example test', async ({ page }) => {
     const newPage = new NewPage(page);
     await newPage.navigate();
     await newPage.someElement().click();
   });
   ```

## 🧪 Writing Tests

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should login successfully', async () => {
    await loginPage.navigate();
    await loginPage.login('username', 'password');
    // Add assertions here
  });
});
```

## 🛠️ Utilities

### TestData

Centralized test data constants:
```typescript
import { TestData } from '../utils/TestData';

await loginPage.login(TestData.VALID_USERNAME, TestData.VALID_PASSWORD);
```

### Helpers

Utility functions for common operations:
```typescript
import { Helpers } from '../utils/Helpers';

const randomEmail = Helpers.generateRandomEmail();
await Helpers.takeScreenshot(page, 'test-name');
```

### Constants

Framework constants:
```typescript
import { Constants } from '../utils/constants';

await page.waitForTimeout(Constants.TIMEOUT.MEDIUM);
```

## ⚙️ Configuration

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- Browser projects (Chromium, Firefox, WebKit)
- Test directory
- Timeouts and retries
- Screenshots and videos
- Reporters

### TypeScript Configuration

Edit `tsconfig.json` to customize TypeScript compiler options.

## 📊 Best Practices

1. **Use Page Object Model:** Keep page-specific logic in page objects
2. **Reuse BasePage:** Extend BasePage for common functionality
3. **Use Utilities:** Centralize test data and helper functions
4. **Descriptive Test Names:** Use clear, descriptive test names
5. **Isolated Tests:** Each test should be independent
6. **Proper Wait Strategies:** Use Playwright's built-in waiting mechanisms
7. **Error Handling:** Implement proper error handling in page objects

## 🔍 Debugging

- Use `test.only()` to run a single test
- Use `test.debug()` or run with `--debug` flag
- Use Playwright Inspector: `npx playwright test --debug`
- Check screenshots and videos in `test-results/` folder

## 🥒 Cucumber BDD Testing

This framework also supports Cucumber BDD testing with Playwright. See the [features/README.md](features/README.md) for detailed documentation on Cucumber integration.

### Quick Start with Cucumber

1. **Feature files** are located in `features/` directory
2. **Step definitions** are in `features/step-definitions/`
3. **Run Cucumber tests:**
   ```bash
   npm run test:cucumber
   ```

### Example Feature File

```gherkin
Feature: Login Functionality
  Scenario: Successful login
    Given I am on the login page
    When I enter username "user@example.com" and password "password123"
    And I click the login button
    Then I should be redirected to the home page
```

All step definitions use the Page Object Model pattern, ensuring consistency between Playwright and Cucumber tests.

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)

## 🤝 Contributing

1. Create a new branch for your feature
2. Write tests following the POM pattern
3. Ensure all tests pass
4. Submit a pull request

## 📄 License

ISC

