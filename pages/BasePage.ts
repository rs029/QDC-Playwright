import { Page, Locator } from '@playwright/test';

/**
 * Base Page class that contains common functionality for all page objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async goto(url: string): Promise<void> {
    // Set up dialog handler before navigation (if not already set)
    this.page.once('dialog', async (dialog) => {
      console.log(`Dialog detected during navigation: ${dialog.type()} - ${dialog.message()}`);
      try {
        await dialog.accept();
        console.log('Dialog accepted');
      } catch (error) {
        console.log('Dialog handling error:', error);
      }
    });
    
    // Navigate with longer timeout
    await this.page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 // 60 seconds timeout
    });
    
    // Wait a moment for any pop-ups to appear after page load
    await this.page.waitForTimeout(1000);
    
    // Try to handle any permission prompts or installation buttons
    try {
      await this.page.evaluate(() => {
        // Auto-accept common permission prompts
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().then(() => {
            console.log('Notification permission requested');
          }).catch(() => {});
        }
        
        // Look for and click installation buttons/prompts
        // Priority: "Download Printer Setup" first, then other install buttons
        const installButtons = [
          'button:has-text("Download Printer Setup")',
          'a:has-text("Download Printer Setup")',
          '[aria-label*="Download Printer Setup" i]',
          'button[aria-label*="install" i]',
          'button:has-text("Install")',
          'button:has-text("Add to Home Screen")',
          '.install-prompt',
          '[data-install-prompt]'
        ];
        
        for (const selector of installButtons) {
          const button = document.querySelector(selector) as HTMLElement;
          if (button && button.offsetParent !== null) {
            console.log('Found install button, clicking:', selector);
            button.click();
            break;
          }
        }
        
        // Handle any beforeinstallprompt events
        if ((window as any).deferredPrompt) {
          const prompt = (window as any).deferredPrompt;
          prompt.prompt().then(() => {
            return prompt.userChoice;
          }).then((choiceResult: any) => {
            console.log('Installation choice:', choiceResult.outcome);
            (window as any).deferredPrompt = null;
          }).catch(() => {});
        }
      });
    } catch (e) {
      // Ignore errors - pop-ups may not always appear
      console.log('Pop-up handling completed (some may not have appeared)');
    }
  }
  
  /**
   * Handle any pop-ups that appear on the page
   */
  async handlePopups(): Promise<void> {
    // Wait a bit for pop-ups to appear
    await this.page.waitForTimeout(500);
    
    // Try to find and click common "Allow" or "Install" buttons
    // Priority: "Download Printer Setup" first
    const commonSelectors = [
      'button:has-text("Download Printer Setup")',
      'a:has-text("Download Printer Setup")',
      '[aria-label*="Download Printer Setup" i]',
      'button:has-text("Allow")',
      'button:has-text("Accept")',
      'button:has-text("Install")',
      'button:has-text("Yes")',
      'button:has-text("OK")',
      '[aria-label*="allow" i]',
      '[aria-label*="accept" i]',
      '[aria-label*="install" i]'
    ];
    
    for (const selector of commonSelectors) {
      try {
        const element = this.page.locator(selector).first();
        if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
          console.log(`Clicking pop-up button: ${selector}`);
          await element.click();
          await this.page.waitForTimeout(500);
        }
      } catch (e) {
        // Continue to next selector
      }
    }
  }

  /**
   * Get page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get page URL
   * @returns The current page URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for page to load
   */
  async waitForLoadState(): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (error) {
      // If networkidle times out, fall back to domcontentloaded
      console.log('Networkidle timeout, using domcontentloaded');
      await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    }
  }

  /**
   * Wait for a specific selector
   * @param selector - The selector to wait for
   */
  async waitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Click on an element
   * @param selector - The selector of the element to click
   */
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Fill an input field
   * @param selector - The selector of the input field
   * @param text - The text to fill
   */
  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   * @param selector - The selector of the element
   * @returns The text content
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  /**
   * Check if an element is visible
   * @param selector - The selector of the element
   * @returns True if element is visible, false otherwise
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Take a screenshot
   * @param path - The path where to save the screenshot
   */
  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path });
  }

  /**
   * Wait for a specific timeout
   * @param milliseconds - Time to wait in milliseconds
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Get a locator by selector
   * @param selector - The selector string
   * @returns A locator object
   */
  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get a locator by placeholder attribute
   * @param placeholder - The placeholder text
   * @returns A locator object
   */
  getByPlaceholder(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  /**
   * Get a locator by name attribute
   * @param name - The name attribute value
   * @returns A locator object
   */
  getByName(name: string): Locator {
    return this.page.locator(`[name="${name}"]`);
  }

  /**
   * Get a locator by label text
   * This finds form controls (input, select, textarea) by their associated label text
   * @param labelText - The label text (can be partial match)
   * @param options - Optional parameters for exact match
   * @returns A locator object
   */
  getByLabel(labelText: string, options?: { exact?: boolean }): Locator {
    return this.page.getByLabel(labelText, options);
  }

  /**
   * Get an input field by its label text
   * This is the most reliable way to find form inputs
   * @param labelText - The text of the label associated with the input
   * @returns A locator object
   */
  getInputByLabel(labelText: string): Locator {
    return this.page.getByLabel(labelText);
  }

  /**
   * Get an element using label with multiple strategies
   * Tries: label text -> placeholder -> name -> aria-label
   * @param identifier - Label text, placeholder, name, or aria-label
   * @returns A locator object
   */
  getByLabelOrPlaceholder(identifier: string): Locator {
    // Try label first (most reliable), then placeholder, then name, then aria-label
    return this.page.locator(
      `label:has-text("${identifier}") + input, 
       label:has-text("${identifier}") ~ input,
       input[placeholder*="${identifier}" i],
       input[name="${identifier}"],
       input[aria-label*="${identifier}" i]`
    ).first();
  }

  /**
   * Get a locator by role and name
   * @param role - The ARIA role
   * @param name - The accessible name
   * @returns A locator object
   */
  getByRole(role: 'button' | 'link' | 'textbox' | 'checkbox' | 'radio' | 'heading' | 'img' | 'option', name: string): Locator {
    return this.page.getByRole(role, { name });
  }

  /**
   * Get an input field by placeholder or name (flexible locator)
   * @param identifier - Placeholder text or name attribute value
   * @returns A locator object
   */
  getInputField(identifier: string): Locator {
    return this.page.locator(`input[placeholder="${identifier}"], input[name="${identifier}"]`);
  }
}

