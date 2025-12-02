import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, loginPage, homePage } from '../support/world';

/**
 * Common step definitions that can be used across multiple features
 */

// Navigation steps
Given('I navigate to {string}', async (url: string) => {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
});

// Generic visibility steps
Then('I should see {string}', async (elementText: string) => {
  const element = page.locator(`text=${elementText}`);
  await expect(element).toBeVisible();
});

Then('I should not see {string}', async (elementText: string) => {
  const element = page.locator(`text=${elementText}`);
  await expect(element).not.toBeVisible();
});

// Generic click steps
When('I click on {string}', async (elementText: string) => {
  await page.locator(`text=${elementText}`).click();
});

// Generic input steps using placeholder or name
When('I enter {string} into the {string} field', async (text: string, fieldIdentifier: string) => {
  // Try multiple strategies: placeholder, name, label
  const field = page.locator(`input[placeholder="${fieldIdentifier}"], input[name="${fieldIdentifier}"], input[aria-label="${fieldIdentifier}"]`).first();
  await field.fill(text);
});

When('I enter {string} into field with placeholder {string}', async (text: string, placeholder: string) => {
  const field = page.getByPlaceholder(placeholder);
  await field.fill(text);
});

When('I enter {string} into field with name {string}', async (text: string, name: string) => {
  const field = page.locator(`[name="${name}"]`);
  await field.fill(text);
});

// Wait steps
When('I wait for {int} seconds', async (seconds: number) => {
  await page.waitForTimeout(seconds * 1000);
});

// URL verification
Then('I should be on {string}', async (expectedUrl: string) => {
  const currentUrl = page.url();
  expect(currentUrl).toContain(expectedUrl);
});

Then('the page title should contain {string}', async (expectedTitle: string) => {
  const title = await page.title();
  expect(title.toLowerCase()).toContain(expectedTitle.toLowerCase());
});

