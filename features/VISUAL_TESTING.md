# 🎥 Visual Testing Guide

This guide explains how to run Cucumber tests with visible browser windows so you can watch the tests execute.

## 🚀 Quick Start

### Option 1: Run in Headed Mode (Browser Visible)
```bash
npm run test:cucumber:headed
```

This will:
- Open a visible browser window
- Execute tests step by step
- Close browser after each scenario

### Option 2: Run with Slow Motion (Recommended for Watching)
```bash
npm run test:cucumber:slow
```

This will:
- Open a visible browser window
- Slow down operations by 500ms (0.5 seconds) for better visibility
- Perfect for watching and debugging

### Option 3: Custom Slow Motion Speed
```bash
npx cucumber-js --config cucumber.config.js --world-parameters '{"headed":true,"slowMo":1000}'
```

Adjust `slowMo` value:
- `100` = 0.1 second delay (fast)
- `500` = 0.5 second delay (medium) ⭐ Recommended
- `1000` = 1 second delay (slow)
- `2000` = 2 second delay (very slow)

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run test:cucumber` | Run tests in headless mode (no browser visible) |
| `npm run test:cucumber:headed` | Run tests with visible browser |
| `npm run test:cucumber:slow` | Run tests with visible browser + slow motion |

## 🎯 Run Specific Scenarios Visually

### Run a specific feature file:
```bash
npx cucumber-js --config cucumber.config.js --world-parameters '{"headed":true,"slowMo":500}' features/login.feature
```

### Run scenarios with specific tags:
```bash
# Run only positive scenarios
npx cucumber-js --config cucumber.config.js --world-parameters '{"headed":true,"slowMo":500}' --tags @positive

# Run only negative scenarios
npx cucumber-js --config cucumber.config.js --world-parameters '{"headed":true,"slowMo":500}' --tags @negative
```

### Run a single scenario by name:
```bash
npx cucumber-js --config cucumber.config.js --world-parameters '{"headed":true,"slowMo":500}' --grep "Successful login"
```

## 🔧 Configuration

The visual testing settings are controlled by `worldParameters` in `cucumber.config.js`:

```javascript
worldParameters: {
  headed: false,  // Set to true for visible browser
  slowMo: 0      // Delay in milliseconds (0 = no delay)
}
```

## 💡 Tips for Visual Testing

1. **Use Slow Motion**: Start with `slowMo: 500` to see each action clearly
2. **Don't Minimize Browser**: Keep the browser window visible and in focus
3. **Watch Console**: Check terminal for step-by-step progress
4. **Screenshots**: Failed tests automatically take screenshots in `screenshots/` folder
5. **Pause Execution**: You can add `await page.waitForTimeout(5000)` in step definitions to pause

## 🐛 Debugging Tips

If you want to pause and inspect:
1. Add a wait in your step definition:
   ```typescript
   await page.waitForTimeout(5000); // Pause for 5 seconds
   ```

2. Use Playwright Inspector (for advanced debugging):
   ```bash
   # This requires modifying the world.ts to use Playwright's inspector
   ```

## 📸 Screenshots

Screenshots are automatically saved on test failures in the `screenshots/` folder with timestamps.

## ⚙️ Advanced: Multiple Browsers

To test in different browsers visually, modify `features/support/world.ts`:

```typescript
// For Firefox
import { firefox } from 'playwright';
browser = await firefox.launch({ headless: !headed, slowMo: slowMo });

// For WebKit (Safari)
import { webkit } from 'playwright';
browser = await webkit.launch({ headless: !headed, slowMo: slowMo });
```

## 🎬 Example Workflow

1. **Start with slow motion** to understand the flow:
   ```bash
   npm run test:cucumber:slow
   ```

2. **Once familiar, use normal headed mode**:
   ```bash
   npm run test:cucumber:headed
   ```

3. **For CI/CD, use headless mode**:
   ```bash
   npm run test:cucumber
   ```

