import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model
 * Example page object demonstrating POM pattern
 */
export class HomePage extends BasePage {
  // Locators using placeholder/name attributes
  // Update these with your actual placeholder or name attribute values
  readonly welcomeMessage = () => this.page.locator('.welcome-message, [data-testid="welcome"], [class*="welcome" i]');
  readonly userProfile = () => this.page.locator('.user-profile, [data-testid="user-profile"], [class*="profile" i]');
  
  readonly logoutButton = () => {
    // Try role with text, then text content
    return this.page.getByRole('button', { name: /logout/i }).or(this.page.locator('button:has-text("Logout")')).first();
  };
  
  readonly navigationMenu = () => this.page.locator('.nav-menu, nav, [role="navigation"]');
  
  readonly searchInput = () => {
    // Try placeholder first, then name, then fallback
    return this.page.locator('input[placeholder*="Search" i], input[id="txtCustomer"]').first();
  };
  
  readonly searchButton = () => {
    // Try role with text, then type submit
    return this.page.getByRole('button', { name: /search/i }).or(this.page.locator('button[type="submit"]')).first();
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to home page / dashboard
   */
  async navigate(): Promise<void> {
    const { TestData } = await import('../utils/TestData');
    await this.goto(TestData.HOME_URL);
    await this.waitForLoadState();
  }

  /**
   * Check if user is on dashboard
   * @returns True if on dashboard
   */
  async isOnDashboard(): Promise<boolean> {
    const url = this.getUrl();
    return url.includes('home') || url.includes('dashboard');
  }

  /**
   * Get welcome message text
   * @returns Welcome message text
   */
  async getWelcomeMessage(): Promise<string | null> {
    return await this.welcomeMessage().textContent();
  }

  /**
   * Perform logout action
   */
  async logout(): Promise<void> {
    await this.logoutButton().click();
    await this.waitForLoadState();
  }

  /**
   * Perform search action
   * @param searchTerm - The term to search for
   */
  async search(searchTerm: string): Promise<void> {
    await this.searchInput().fill(searchTerm);
    await this.searchButton().click();
  }

  /**
   * Check if user is logged in
   * @returns True if user profile is visible
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.userProfile().isVisible();
  }

  /**
   * Navigate to a menu item
   * @param menuItem - The menu item text to click
   */
  async navigateToMenuItem(menuItem: string): Promise<void> {
    await this.navigationMenu().locator(`text=${menuItem}`).click();
    await this.waitForLoadState();
  }
}

