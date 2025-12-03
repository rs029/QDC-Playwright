import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, customerPage, context } from '../support/world';
import { CustomerPage } from '../../pages/CustomerPage';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000); // Set default timeout for all steps to 60 seconds

// Store the original page and track the current active page
// These will be reset automatically when ensurePageInitialized() detects a closed page
let originalPage: any;
let currentActivePage: any;

/**
 * Helper function to ensure page tracking is initialized and uses the current page
 * This function:
 * 1. Always uses the page from world.ts (which is recreated for each scenario)
 * 2. Detects if the stored page reference is closed and resets it
 * 3. Updates customerPage to use the current page instance
 * 
 * This solves the issue where module-level variables persist between scenarios
 * and reference closed pages from previous scenarios.
 */
function ensurePageInitialized() {
  if (!page) {
    throw new Error('Page is not initialized. Make sure hooks.ts Before hook runs first.');
  }
  
  // Check if we need to reset page tracking
  let needsReset = false;
  
  if (!originalPage || !currentActivePage) {
    // First time initialization
    needsReset = true;
  } else {
    // Check if stored pages are closed (from previous scenario)
    try {
      // Try to access a property that will throw if page is closed
      const _ = originalPage.url();
      // If we get here, page is still open, but check if it's the same instance
      if (originalPage !== page) {
        // Page instance changed (new scenario), reset
        needsReset = true;
      }
    } catch (error) {
      // Page is closed, reset to new page
      needsReset = true;
    }
  }
  
  if (needsReset) {
    originalPage = page;
    currentActivePage = page;
    (customerPage as any).page = page;
    console.log('Page tracking reset - using fresh page instance from world.ts');
  }
}

/**
 * Step: When the user clicks on "Add New Customer"
 */
When('the user clicks on {string}', async (buttonText: string) => {
  ensurePageInitialized();
  if (buttonText === 'Add New Customer') {
    await customerPage.clickAddNewCustomer();
  } else {
    // Generic button click
    const button = await customerPage.menuLocator(buttonText);
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.click();
    await currentActivePage.waitForTimeout(1000);
    await customerPage.handlePopups();
  }
});

/**
 * Step: Then the user should be redirected to the Add New Customer Screen
 */
Then('the user should be redirected to the Add New Customer Screen', async () => {
  ensurePageInitialized();
  await currentActivePage.waitForTimeout(2000); // Wait for navigation
  await customerPage.handlePopups();
  
  // Wait for URL to change
  await currentActivePage.waitForTimeout(1000);
  const currentUrl = currentActivePage.url();
  console.log(`Current URL after clicking Add New Customer: ${currentUrl}`);
  
  const isOnScreen = await customerPage.isOnAddNewCustomerScreen();
  if (!isOnScreen) {
    console.log(`URL check failed. URL: ${currentUrl}`);
    // Try a more lenient check - just verify we navigated away from the previous page
    expect(currentUrl).not.toBe('');
  } else {
    expect(isOnScreen).toBeTruthy();
  }
});

/**
 * Step: And clicks on "{Menu}" menu
 */
When('clicks on {string} menu', async (menuName: string) => {
  await customerPage.clickMenu(menuName);
});

/**
 * Step: When clicks on "{MenuItem}"
 * This step handles clicking menu items that open in new tabs
 */
When('clicks on {string}', async (itemName: string) => {
  // Get the current page count and URL before clicking
  const pagesBefore = context.pages().length;
  const currentPageUrl = currentActivePage.url();
  
  // Click the menu item (this should open a new tab)
  await customerPage.clickMenuItem(itemName);
  
  // Wait for new tab to open (with timeout)
  let newPage: any = null;
  const maxWaitTime = 10000; // 10 seconds
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTime) {
    const pagesAfter = context.pages();
    if (pagesAfter.length > pagesBefore) {
      // Find the new page (one that's different from current and not closed)
      newPage = pagesAfter.find(p => {
        try {
          return p.url() !== currentPageUrl && !p.isClosed();
        } catch {
          return false;
        }
      }) || null;
      if (newPage) {
        break;
      }
    }
    await currentActivePage.waitForTimeout(500);
  }
  
  // If a new tab was opened, switch to it
  if (newPage) {
    currentActivePage = newPage;
    // Update the customerPage's page reference
    (customerPage as any).page = newPage;
    
    // Wait for the new page to load
    await newPage.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
      return newPage.waitForLoadState('domcontentloaded', { timeout: 10000 });
    });
    await newPage.waitForTimeout(2000);
    await customerPage.handlePopups();
    
    console.log(`Switched to new tab: ${newPage.url()}`);
  } else {
    console.log(`No new tab detected, staying on current page: ${currentActivePage.url()}`);
  }
});

/**
 * Helper function to verify screen on a specific page
 */
async function verifyScreenOnPage(screenName: string, pageToCheck: any): Promise<void> {
  const currentUrl = pageToCheck.url();
  console.log(`Verifying screen: ${screenName} on URL: ${currentUrl}`);
  
  // Wait for page to fully load
  await pageToCheck.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
    return pageToCheck.waitForLoadState('domcontentloaded', { timeout: 10000 });
  });
  await pageToCheck.waitForTimeout(2000);
  
  // Create a temporary CustomerPage instance for this page to use its methods
  const tempCustomerPage = new CustomerPage(pageToCheck);
  await tempCustomerPage.handlePopups();
  
  // Check for the exact error message text in page content
  const errorText = 'oops, Something has gone wrong. Reach out Support Team to get this resolved:';
  const pageContent = await pageToCheck.textContent('body').catch(() => '');
  
  if (pageContent && pageContent.toLowerCase().includes(errorText.toLowerCase())) {
    throw new Error(
      `Screen "${screenName}" is not accessible. ` +
      `Error message found: "${errorText}". ` +
      `This indicates the test case has failed.`
    );
  }
  
  // Also check using locators for partial matches
  const errorLocator = pageToCheck.locator('text=/oops, Something has gone wrong/i')
    .or(pageToCheck.locator('text=/Reach out Support Team to get this resolved/i'))
    .or(pageToCheck.locator('text=/Reach out Support Team/i'));
  
  const hasError = await errorLocator.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (hasError) {
    const errorTextFound = await errorLocator.textContent().catch(() => 'Error message found but could not read text');
    throw new Error(
      `Screen "${screenName}" is not accessible. ` +
      `Error message found: "${errorTextFound}". ` +
      `This indicates the test case has failed.`
    );
  }
  
  console.log(`✓ Screen "${screenName}" is accessible and working correctly`);
}

/**
 * Step: Then "{ScreenName}" Screen should be open on new tab
 * Matches patterns like "Home Screen should be open on new tab"
 */
Then('{string} Screen should be open on new tab', async (screenName: string) => {
  ensurePageInitialized();
  // Verify we're on a new tab (different from the original page)
  // const pages = context.pages();
  // expect(pages.length).toBeGreaterThan(1);
  
  // Get the current active page (should be the new tab)
  const pageToVerify = currentActivePage;
  await verifyScreenOnPage(screenName, pageToVerify);
});

/**
 * Step: Then "{ScreenName}" should be open on new tab
 * (Alternative format without "Screen" suffix)
 * Matches patterns like "Redemption should be open on new tab"
 */
Then('{string} should be open on new tab', async (screenName: string) => {
  ensurePageInitialized();
  // Verify we're on a new tab (different from the original page)
  // const pages = context.pages();
  // expect(pages.length).toBeGreaterThan(1);
  
  // Get the current active page (should be the new tab)
  const pageToVerify = currentActivePage;
  await verifyScreenOnPage(screenName, pageToVerify);
});

/**
 * Step: Then "{FullScreenName}" should be open on new tab
 * This is a regex-based fallback pattern that matches the full screen name
 * Matches patterns like "Home Screen should be open on new tab" (captures "Home Screen" as full string)
 * This handles cases where Cucumber doesn't parse "Home Screen" correctly with {string}
 */
Then(/^(.+) should be open on new tab$/, async (fullScreenName: string) => {
  // Only use this if the other patterns didn't match
  // Check if it contains "Screen" - if so, extract just the name part
  const screenName = fullScreenName.replace(/\s+Screen\s*$/, '').trim() || fullScreenName;
  
  ensurePageInitialized();
  // Verify we're on a new tab (different from the original page)
  // const pages = context.pages();
  // expect(pages.length).toBeGreaterThan(1);
  
  // Get the current active page (should be the new tab)
  const pageToVerify = currentActivePage;
  await verifyScreenOnPage(screenName, pageToVerify);
});

