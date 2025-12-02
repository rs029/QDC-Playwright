# Cucumber BDD Testing with Playwright

This directory contains Cucumber BDD feature files and step definitions integrated with Playwright Page Object Model.

## 📁 Directory Structure

```
features/
├── login.feature              # Login feature scenarios
├── home.feature               # Home page feature scenarios
├── step-definitions/          # Step definition files
│   ├── login.steps.ts        # Login step definitions
│   ├── home.steps.ts         # Home page step definitions
│   └── common.steps.ts       # Common reusable step definitions
└── support/                   # Support files
    ├── world.ts              # World object for shared state
    └── hooks.ts              # Cucumber hooks for setup/teardown
```

## 🚀 Running Cucumber Tests

### Run all Cucumber tests:
```bash
npm run test:cucumber
```

### Run in headed mode (with browser UI):
```bash
npm run test:cucumber:headed
```

### Run specific feature file:
```bash
npx cucumber-js --config cucumber.config.js features/login.feature
```

### Run tests matching a tag:
```bash
npx cucumber-js --config cucumber.config.js --tags @login
```

## 📝 Writing Feature Files

### Example Feature File Structure:

```gherkin
Feature: Login Functionality
  As a user
  I want to login to the application
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter username "user@example.com" and password "password123"
    And I click the login button
    Then I should be redirected to the home page
```

## 🔧 Step Definitions

### Step Definition Pattern

Step definitions use Playwright Page Object Model:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { page, loginPage } from '../support/world';

Given('I am on the login page', async () => {
  await loginPage.navigate();
});

When('I enter username {string} and password {string}', async (username: string, password: string) => {
  await loginPage.login(username, password);
});
```

### Using Page Objects

All step definitions use the Page Object Model classes:
- `LoginPage` - For login-related actions
- `HomePage` - For home page actions
- `BasePage` - Common functionality available to all pages

### World Object

The `world.ts` file provides shared state between step definitions:
- `page` - Playwright page object
- `loginPage` - Login page object instance
- `homePage` - Home page object instance
- `browser` - Browser instance
- `context` - Browser context

### Hooks

The `hooks.ts` file provides:
- `BeforeAll` - Runs once before all scenarios
- `AfterAll` - Runs once after all scenarios
- `Before` - Runs before each scenario (initializes browser)
- `After` - Runs after each scenario (cleans up, takes screenshots on failure)

## 🎯 Best Practices

1. **Use Page Objects**: Always use page objects in step definitions, never direct Playwright API calls
2. **Reusable Steps**: Create common step definitions in `common.steps.ts`
3. **Descriptive Scenarios**: Write clear, descriptive scenario names
4. **Data Tables**: Use data tables for multiple test cases
5. **Tags**: Use tags to organize and filter tests
6. **Background**: Use Background for common setup steps

## 📚 Example Step Definitions

### Login Steps:
- `Given I navigate to the login page`
- `Given I am on the login page`
- `When I enter username {string} and password {string}`
- `When I click the login button`
- `Then I should be redirected to the home page`
- `Then I should see an error message {string}`

### Home Page Steps:
- `Given I navigate to the home page`
- `Given I am on the home page`
- `When I search for {string}`
- `When I click the logout button`
- `Then I should see the welcome message`
- `Then I should see the user profile`

### Common Steps:
- `Given I navigate to {string}`
- `When I click on {string}`
- `Then I should see {string}`
- `Then I should be on {string}`

## 🔍 Debugging

- Add `console.log()` statements in step definitions
- Use `--world-parameters` to pass configuration
- Check screenshots in `screenshots/` folder on test failures
- Review cucumber reports in `reports/cucumber-report.json`

## 📖 Additional Resources

- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [Playwright Documentation](https://playwright.dev/)

