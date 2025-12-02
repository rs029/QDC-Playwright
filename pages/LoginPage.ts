import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model
 * Example page object demonstrating POM pattern
 */
export class LoginPage extends BasePage {
  // Locators using LABEL TEXT (most reliable), then placeholder/name as fallback
  // Priority: Label > Placeholder > Name > Fallback selector
  // Labels are the most stable and user-visible way to find elements
  
  readonly usernameInput = () => {
    // Try label first (most reliable), then placeholder, then name, then fallback
    return this.page.locator(
      `label:has-text("User Name") + input,
       label:has-text("User Name") ~ input,
       label:has-text("User Id") + input,
       label:has-text("User Id") ~ input,
       label:has-text("Email") + input,
       label:has-text("Email") ~ input,
       input[placeholder*="User Name" i],
       input[placeholder*="User Id" i],
       input[placeholder*="Email" i],
       input[name="txtUserId"],
       input[type="email"],
       input[type="text"]`
    ).first();
  };
  
  readonly passwordInput = () => {
    // Try label first, then placeholder, then name, then fallback
    return this.page.locator(
      `label:has-text("Password") + input,
       label:has-text("Password") ~ input,
       input[placeholder*="Password" i],
       input[name="txtPassword"],
       input[type="password"]`
    ).first();
  };

  readonly storeCodeInput = () => {
    // Try placeholder first, then name, then fallback
    return this.page.locator('input[placeholder*="Store Code" i], input[name="txtBranchPin"]').first();
  };
  
  readonly loginButton = () => {
    // Try role with text, then type submit, then text content
    return this.page.getByRole('button', { name: /login/i }).or(this.page.locator('button[value*="Login"], button[type="submit"], button[id=btnLogin]')).first();
  };
  
  readonly errorMessage = () => this.page.locator('#DivContainerInnerStatus, .error-message, [role="alert"], [class*="error" i], .alert-danger, .validation-error');
  readonly successMessage = () => this.page.locator('.success-message, [role="status"], [class*="success" i]');
  
  /**
   * Get all validation error messages
   * @returns Array of error message texts
   */
  async getAllErrorMessages(): Promise<string[]> {
    const errorElements = this.page.locator('.error-message, [role="alert"], [class*="error" i], .alert-danger, .validation-error, .field-validation-error, #DivContainerInnerStatus');
    const count = await errorElements.count();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await errorElements.nth(i).textContent();
      if (text) messages.push(text.trim());
    }
    return messages;
  }

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigate(): Promise<void> {
    const { TestData } = await import('../utils/TestData');
    
    // Grant permissions after we have a URL
    try {
      const context = this.page.context();
      await context.grantPermissions(['notifications', 'geolocation', 'camera', 'microphone'], { 
        origin: TestData.LOGIN_URL 
      });
    } catch (error) {
      console.log('Permission grant note (may be expected):', error);
    }
    
    await this.goto(TestData.LOGIN_URL);
    
    // Handle any pop-ups that might appear
    await this.handlePopups();
    
    // Wait for page load with longer timeout
    await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
      // If networkidle times out, try domcontentloaded
      return this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    });
    
    // Handle any pop-ups that appear after page fully loads
    await this.handlePopups();
  }

  /**
   * Perform login action
   * @param username - Username to login with
   * @param password - Password to login with
   * @param storeCode - Store code (optional)
   */
  async login(username: string, password: string, storeCode?: string): Promise<void> {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    if (storeCode) {
      await this.storeCodeInput().fill(storeCode);
    }
    await this.loginButton().click();
  }

  /**
   * Enter store code
   * @param storeCode - Store code to enter
   */
  async enterStoreCode(storeCode: string): Promise<void> {
    await this.storeCodeInput().fill(storeCode);
  }

  /**
   * Get error message text
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage().textContent();
  }

  /**
   * Get success message text
   * @returns Success message text
   */
  async getSuccessMessage(): Promise<string | null> {
    return await this.successMessage().textContent();
  }

  /**
   * Check if error message is visible
   * @returns True if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage().isVisible();
  }

  /**
   * Check if login button is enabled
   * @returns True if login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton().isEnabled();
  }
}

