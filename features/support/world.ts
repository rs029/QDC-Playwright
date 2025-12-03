import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { CustomerPage } from '../../pages/CustomerPage';
import { setWorldConstructor, World } from '@cucumber/cucumber';
/**
 * World object for sharing state between step definitions
 * This is a Cucumber pattern for dependency injection
 */
export let browser: Browser;
export let context: BrowserContext;
export let page: Page;
export let loginPage: LoginPage;
export let homePage: HomePage;
export let customerPage: CustomerPage;

// Store for dialog messages
let lastDialogMessage: string | null = null;

export function getLastDialogMessage(): string | null {
  return lastDialogMessage;
}

export function clearLastDialogMessage(): void {
  lastDialogMessage = null;
}

/**
 * Wait for a dialog to appear and return its message
 * @param timeout - Maximum time to wait in milliseconds
 * @returns The dialog message or null if timeout
 */
export async function waitForDialog(timeout: number = 5000): Promise<string | null> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (lastDialogMessage) {
      return lastDialogMessage;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return null;
}

/**
 * Initialize browser and page objects
 * Called in hooks.ts before scenarios
 * @param headed - Run browser in headed mode (visible)
 * @param slowMo - Slow down operations by specified milliseconds
 */
export async function initializeBrowser(headed: boolean = false, slowMo: number = 0): Promise<void> {
  browser = await chromium.launch({
    headless: !headed,
    slowMo: slowMo, // Slow down operations for better visibility
  });
  
  // Grant permissions for notifications, geolocation, etc.
  context = await browser.newContext({
    viewport: { width: 1400, height: 1080 },
    permissions: ['notifications', 'geolocation', 'camera', 'microphone'],
    // Auto-accept downloads
    acceptDownloads: true,
  });
  
  page = await context.newPage();
  
  // Handle all dialogs (alerts, confirms, prompts) - auto accept but store message
  page.on('dialog', async (dialog) => {
    lastDialogMessage = dialog.message();
    console.log(`Dialog detected: ${dialog.type()} - ${lastDialogMessage}`);
    try {
      await dialog.accept();
      console.log('Dialog accepted');
    } catch (error) {
      console.log('Dialog handling error:', error);
    }
  });
  
  // Grant permissions will be done after navigation to specific URL
  // This avoids the "Invalid URL" error
  
  // Handle installation prompts (PWA install prompts) - auto accept
  await page.addInitScript(() => {
    // Override beforeinstallprompt event to auto-accept installation
    window.addEventListener('beforeinstallprompt', (e: any) => {
      console.log('PWA installation prompt detected');
      e.preventDefault();
      // Store the event for later use
      (window as any).deferredPrompt = e;
      // Auto-accept the install prompt
      if (e.prompt) {
        e.prompt().then(() => {
          console.log('PWA installation accepted');
          return e.userChoice;
        }).then((choiceResult: any) => {
          console.log('User choice:', choiceResult.outcome);
          (window as any).deferredPrompt = null;
        }).catch((error: any) => {
          console.log('PWA installation prompt handled:', error);
        });
      }
    });
    
    // Also handle appinstalled event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
    });
  });
  
  // Initialize page objects
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  customerPage = new CustomerPage(page);
}

/**
 * Cleanup browser and context
 * Called in hooks.ts after scenarios
 */
export async function cleanupBrowser(): Promise<void> {
  if (page) {
    await page.close();
  }
  if (context) {
    await context.close();
  }
  if (browser) {
    await browser.close();
  }
}

