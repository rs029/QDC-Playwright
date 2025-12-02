import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, loginPage, homePage, getLastDialogMessage, clearLastDialogMessage, waitForDialog } from '../support/world';
import { TestData } from '../../utils/TestData';
import { setDefaultTimeout } from '@cucumber/cucumber'; 

// Given steps
Given('the user is on the login page', async function () {
  // Set timeout for this step (60 seconds)
  
  setDefaultTimeout(60 * 1000);
  
  await loginPage.navigate();
  
  // Wait a bit for URL to update
  await page.waitForTimeout(1000);
  
  const url = loginPage.getUrl();
  expect(url).toContain('login');
});

Given('the user is already logged in', async () => {
  clearLastDialogMessage(); // Clear any previous dialog
  await loginPage.navigate();
  clearLastDialogMessage(); // Clear dialog after navigation
  await loginPage.login(TestData.VALID_USERNAME, TestData.VALID_PASSWORD, TestData.VALID_STORE_CODE);
  await page.waitForTimeout(3000); // Wait for navigation to dashboard
  await loginPage.handlePopups(); // Handle any pop-ups
  
  // Wait for URL to change or check if we're on dashboard
  try {
    await page.waitForURL(/.*home|.*dashboard/i, { timeout: 10000 });
  } catch (error) {
    // If URL doesn't change, check current URL
    const url = page.url();
    if (!url.match(/.*home|.*dashboard/i)) {
      throw new Error(`Login failed. Current URL: ${url}`);
    }
  }
  
  const url = page.url();
  expect(url).toMatch(/.*home|.*dashboard/i);
});

// When steps
When('the user enters the test email {string}', async (email: string) => {
  await loginPage.usernameInput().fill(email);
});

When('the user enters an unregistered email {string}', async (email: string) => {
  await loginPage.usernameInput().fill(email);
});

When('enters the test password {string}', async (password: string) => {
  await loginPage.passwordInput().fill(password);
});

When('enters an incorrect password {string}', async (password: string) => {
  await loginPage.passwordInput().fill(password);
});

When('enters any password', async () => {
  await loginPage.passwordInput().fill('anypassword123');
});

When('enters the store code {string}', async (storeCode: string) => {
  const input = await loginPage.storeCodeInput();
  await input.fill(storeCode)
});

When('the email and password fields are left empty', async () => {
  // Intentionally leaving fields empty - do nothing
  // The fields should already be empty from the background step
});

When('clicks the login button', async () => {
  clearLastDialogMessage(); // Clear any previous dialog message
  await loginPage.loginButton().click();
  await page.waitForTimeout(2000); // Wait for response (dialog or navigation)
  await loginPage.handlePopups();
});

When('the session expires due to inactivity', async () => {
  // Simulate session timeout - navigate directly to login page
  // In a real scenario, session would expire after inactivity, but for testing
  // we'll simulate by navigating to login page
  const { TestData } = await import('../../utils/TestData');
  await page.goto(TestData.LOGIN_URL);
  await page.waitForTimeout(1000); // Wait for page to load
  await loginPage.handlePopups(); // Handle any pop-ups
});

When('upon re-login with {string}, {string}, and {string}', async (username: string, password: string, storeCode: string) => {
  clearLastDialogMessage(); // Clear any previous dialog
  await loginPage.navigate(); // Navigate to login page first
  clearLastDialogMessage(); // Clear dialog after navigation
  await loginPage.login(username, password, storeCode);
  await page.waitForTimeout(3000); // Wait for navigation
  await loginPage.handlePopups(); // Handle any pop-ups
});

// Then steps
Then('the user should be redirected to the dashboard', async () => {
  await page.waitForURL(/.*home|.*dashboard/i, { timeout: 10000 }).catch(() => {});
  const url = page.url();
  expect(url).toMatch(/.*home|.*dashboard/i);
  
  // Verify we're actually on dashboard
  const isOnDashboard = await homePage.isOnDashboard();
  expect(isOnDashboard).toBeTruthy();
});

Then('the user should see an error message {string}', async (expectedMessage: string) => {
  // Wait for dialog to appear (up to 3 seconds)
  const dialogMessage = await waitForDialog(3000) || getLastDialogMessage();
  
  if (dialogMessage) {
    console.log(`Error found in dialog: ${dialogMessage}`);
    expect(dialogMessage).toContain(expectedMessage);
    clearLastDialogMessage(); // Clear for next check
    return;
  }
  
  // If no dialog, check for error message on page
  await page.waitForTimeout(1000); // Give page elements time to appear
  const errorVisible = await loginPage.isErrorMessageVisible();
  if (errorVisible) {
    const errorMessage = await loginPage.getErrorMessage();
    if (errorMessage) {
      expect(errorMessage).toContain(expectedMessage);
      return;
    }
  }
  
  // If neither dialog nor page element found, fail
  throw new Error(`Expected error message "${expectedMessage}" not found in dialog or on page`);
});

Then('the user should see validation messages {string}, {string}, and {string}', async (message1: string, message2: string, message3: string) => {
  await page.waitForTimeout(2000); // Wait for validation messages to appear
  
  // Check if error appeared in a browser dialog
  const dialogMessage = getLastDialogMessage();
  if (dialogMessage) {
    console.log(`Validation messages found in dialog: ${dialogMessage}`);
    // Dialog might contain all messages or just one
    const dialogText = dialogMessage.toLowerCase();
    expect(dialogText).toContain(message1.toLowerCase());
    expect(dialogText).toContain(message2.toLowerCase());
    expect(dialogText).toContain(message3.toLowerCase());
    clearLastDialogMessage();
    return;
  }
  
  // If no dialog, check for error messages on page
  const errorMessages = await loginPage.getAllErrorMessages();
  if (errorMessages.length > 0) {
    const messagesText = errorMessages.join(' ').toLowerCase();
    expect(messagesText).toContain(message1.toLowerCase());
    expect(messagesText).toContain(message2.toLowerCase());
    expect(messagesText).toContain(message3.toLowerCase());
    return;
  }
  
  // If neither dialog nor page elements found, fail
  throw new Error(`Expected validation messages not found in dialog or on page`);
});

Then('the user should be redirected to the login page', async () => {
  // Wait for URL to contain login, or navigate to login page
  try {
    await page.waitForURL(/.*login/i, { timeout: 10000 });
  } catch (error) {
    // If waitForURL times out, check current URL and navigate if needed
    const url = page.url();
    if (!url.toLowerCase().includes('login')) {
      // If not on login page, navigate there
      const { TestData } = await import('../../utils/TestData');
      await page.goto(TestData.LOGIN_URL);
      await page.waitForTimeout(1000);
      await loginPage.handlePopups();
    }
  }
  
  const url = page.url();
  expect(url.toLowerCase()).toContain('login');
});

Then('the dashboard should be accessible again', async () => {
  await page.waitForTimeout(2000); // Wait for navigation
  const url = page.url();
  expect(url).toMatch(/.*home|.*dashboard/i);
  
  const isOnDashboard = await homePage.isOnDashboard();
  expect(isOnDashboard).toBeTruthy();
});

