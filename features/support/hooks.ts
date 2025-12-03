import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { initializeBrowser, cleanupBrowser, page } from './world';


/**
 * Cucumber hooks for test setup and teardown
 */

setDefaultTimeout(60 * 1000); // 60 seconds default timeout for steps

interface WorldParameters {
  headed?: boolean;
  slowMo?: number; // Slow motion in milliseconds (e.g., 500 = 0.5 second delay)
}

// Before all scenarios
BeforeAll(async function () {
  console.log('Starting Cucumber tests...');
});

// After all scenarios
AfterAll(async function () {
  console.log('Cucumber tests completed.');
});

// Before each scenario
Before(async function (this: { parameters?: WorldParameters }, scenario: any) {
  // Get headed parameter from world parameters or default to false
  const headed = this.parameters?.headed || false;
  const slowMo = this.parameters?.slowMo || 0; // Slow motion in milliseconds
  
  console.log(`Starting scenario: ${scenario.pickle.name}`);
  // Initialize browser first
  await initializeBrowser(headed, slowMo);
  
  // Now page is available
  page.setDefaultNavigationTimeout(60000); // 60 seconds
  page.setDefaultTimeout(60000); // 60 seconds
});

// After each scenario
After(async function (scenario: any) {
  console.log(`Finished scenario: ${scenario.pickle.name}`);
  
  // Take screenshot on failure
  if (scenario.result?.status === 'FAILED') {
    const screenshotPath = `screenshots/failed-${scenario.pickle.name.replace(/\s+/g, '-')}-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath}`);
  }
  
  // Safe cleanup without blocking
  try {
    await cleanupBrowser?.();
  } catch (e) {
    console.log("cleanupBrowser error:", e);
  }
});

