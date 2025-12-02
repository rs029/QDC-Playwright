import { Page } from '@playwright/test';

/**
 * Helper utility functions for tests
 */
export class Helpers {
  /**
   * Generate random string
   * @param length - Length of the random string
   * @returns Random string
   */
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @returns Random email address
   */
  static generateRandomEmail(): string {
    return `test${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Wait for element to be visible
   * @param page - Playwright page object
   * @param selector - CSS selector
   * @param timeout - Timeout in milliseconds
   */
  static async waitForElement(
    page: Page,
    selector: string,
    timeout: number = 5000
  ): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param page - Playwright page object
   * @param selector - CSS selector
   * @param timeout - Timeout in milliseconds
   */
  static async waitForElementHidden(
    page: Page,
    selector: string,
    timeout: number = 5000
  ): Promise<void> {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Take screenshot with timestamp
   * @param page - Playwright page object
   * @param testName - Name of the test
   */
  static async takeScreenshot(page: Page, testName: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `screenshots/${testName}-${timestamp}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

  /**
   * Scroll to element
   * @param page - Playwright page object
   * @param selector - CSS selector
   */
  static async scrollToElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Get current date in format YYYY-MM-DD
   * @returns Formatted date string
   */
  static getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get current timestamp
   * @returns Timestamp string
   */
  static getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Format date to readable string
   * @param date - Date object
   * @returns Formatted date string
   */
  static formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

