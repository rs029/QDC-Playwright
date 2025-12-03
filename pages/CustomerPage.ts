import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Customer Page Object Model
 * Handles customer-related actions and menu navigation
 */
export class CustomerPage extends BasePage {
  /**
   * Helper method to find the first visible and clickable locator from a list
   * @param locators - Array of locator functions to try
   * @returns The first visible locator, or throws if none found
   */
  private async findVisibleLocator(locators: Array<() => any>): Promise<any> {
    for (const locatorFn of locators) {
      try {
        const locator = locatorFn();
        const isVisible = await locator.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          return locator;
        }
      } catch (error) {
        // Continue to next locator
        continue;
      }
    }
    // If none found, return the first one (will throw proper error with waitFor)
    return locators[0]();
  }

  // Locators for Add New Customer button
  readonly addNewCustomerButton = async () => {
    const locators = [
      () => this.page.getByRole('button', { name: /add new customer/i }),
      () => this.page.locator('button:has-text("Add New Customer")'),
      () => this.page.locator('a:has-text("Add New Customer")'),
      () => this.page.locator('[aria-label*="Add New Customer" i]')
    ];
    return await this.findVisibleLocator(locators);
  };

  // Generic menu locator - tries multiple strategies to find visible clickable menu
  readonly menuLocator = async (menuName: string) => {
    const locators = [
      // Most specific - Bootstrap dropdown menu
      () => this.page.locator(`li.nav-item.dropdown a.dropdown-toggle:has-text("${menuName}")`),
      // Role-based locators (most reliable)
      () => this.page.getByRole('button', { name: new RegExp(menuName, 'i') }),
      () => this.page.getByRole('link', { name: new RegExp(menuName, 'i') }),
      // Text-based locators for clickable elements
      () => this.page.locator(`a.dropdown-toggle:has-text("${menuName}")`),
      () => this.page.locator(`button:has-text("${menuName}")`),
      () => this.page.locator(`a:has-text("${menuName}")`),
      // Generic text locator (last resort)
      () => this.page.getByText(new RegExp(menuName, 'i'))
    ];
    return await this.findVisibleLocator(locators);
  };

  // Generic menu item locator - finds menu items in dropdowns
  readonly menuItemLocator = async (itemName: string) => {
    const locators = [
      // Role-based locators (most reliable)
      () => this.page.getByRole('link', { name: new RegExp(itemName, 'i') }).nth(0),
      () => this.page.getByRole('button', { name: new RegExp(itemName, 'i') }),
      () => this.page.getByRole('menuitem', { name: new RegExp(itemName, 'i') }),
      // Text-based locators for clickable elements
      () => this.page.locator(`a:has-text("${itemName}")`),
      () => this.page.locator(`button:has-text("${itemName}")`),
      () => this.page.locator(`li a:has-text("${itemName}")`),
      () => this.page.locator(`[aria-label*="${itemName}" i]`),
      // Generic text locator (last resort)
      () => this.page.locator(`text=${itemName}`)
    ];
    return await this.findVisibleLocator(locators);
  };

  // Error message locator - matches exact error text
  readonly errorMessageLocator = async () => {
    const locators = [
      () => this.page.locator('text=/oops, Something has gone wrong/i'),
      () => this.page.locator('text=/Reach out Support Team to get this resolved/i'),
      () => this.page.locator('text=/Reach out Support Team/i'),
      () => this.page.locator('[class*="error" i]:has-text("oops")'),
      () => this.page.locator('[role="alert"]:has-text("oops")'),
      () => this.page.locator('body:has-text("oops, Something has gone wrong")')
    ];
    // For error messages, we don't need to check visibility - just return first match
    return locators[0]();
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Click on "Add New Customer" button
   */
  async clickAddNewCustomer(): Promise<void> {
    const button = await this.addNewCustomerButton();
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.click();
    await this.page.waitForTimeout(1000); // Wait for navigation
    await this.handlePopups();
  }

  /**
   * Click on a menu (e.g., "Customer", "Drop", "Process", etc.)
   * @param menuName - Name of the menu to click
   */
  async clickMenu(menuName: string): Promise<void> {
    const menu = await this.menuLocator(menuName);
    // Wait for menu to be visible
    await menu.waitFor({ state: 'visible', timeout: 10000 });
    await menu.click();
    await this.page.waitForTimeout(1000); // Wait for dropdown to open
    await this.handlePopups();
  }

  /**
   * Click on a menu item (e.g., "Home", "Edit Order", etc.)
   * This will open in a new tab
   * @param itemName - Name of the menu item to click
   * @returns Promise that resolves when the click is complete
   */
  async clickMenuItem(itemName: string): Promise<void> {
    // Wait for the menu item to be visible
    const menuItem = await this.menuItemLocator(itemName);
    await menuItem.waitFor({ state: 'visible', timeout: 10000 });
    await menuItem.click();
    await this.page.waitForTimeout(1000); // Wait for new tab to open
    await this.handlePopups();
  }

  /**
   * Check if we're on the Add New Customer Screen
   * @returns True if on Add New Customer Screen
   */
  async isOnAddNewCustomerScreen(): Promise<boolean> {
    const url = this.getUrl().toLowerCase();
    // More flexible check - look for customer-related keywords in URL
    return url.includes('customer') || 
           url.includes('add') || 
           url.includes('new') ||
           url.includes('create') ||
           url.includes('register');
  }

  /**
   * Check if the current page has the error message
   * @returns True if error message is found
   */
  async hasErrorMessage(): Promise<boolean> {
    try {
      // Check for the exact error message text
      const errorText = 'oops, Something has gone wrong. Reach out Support Team to get this resolved:';
      const pageContent = await this.page.textContent('body').catch(() => '');
      
      if (pageContent && pageContent.toLowerCase().includes(errorText.toLowerCase())) {
        return true;
      }
      
      // Also check using locators
      const errorElement = await this.errorMessageLocator();
      const isVisible = await errorElement.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        const text = await errorElement.textContent();
        return text?.toLowerCase().includes('oops') || 
               text?.toLowerCase().includes('something has gone wrong') || 
               text?.toLowerCase().includes('reach out support team') || 
               false;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the error message text if present
   * @returns Error message text or null
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      const errorElement = await this.errorMessageLocator();
      if (await errorElement.isVisible({ timeout: 3000 }).catch(() => false)) {
        return await errorElement.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Verify screen is accessible (no error message)
   * @param screenName - Name of the screen for logging
   * @returns True if screen is accessible (no error), false otherwise
   */
  async verifyScreenAccessible(screenName: string): Promise<boolean> {
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      return this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
    });
    await this.handlePopups();
    await this.page.waitForTimeout(2000); // Wait for page to fully load
    
    const hasError = await this.hasErrorMessage();
    if (hasError) {
      const errorText = await this.getErrorMessage();
      console.log(`Screen "${screenName}" has error: ${errorText}`);
      return false;
    }
    console.log(`Screen "${screenName}" is accessible`);
    return true;
  }
}

