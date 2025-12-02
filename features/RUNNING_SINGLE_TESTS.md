# 🎯 Running Single Test Cases

This guide shows you how to run a single test case or specific scenarios in Cucumber.

## 📋 Methods to Run Single Tests

### Method 1: Using Scenario Name (Grep) ⭐ Recommended

Run a test by matching part of the scenario name:

```bash
# Run tests matching "Successful login"
npm run test:cucumber:single "Successful login"

# Run in headed mode
cucumber-js --config cucumber.config.headed.js --grep "Successful login"

# Run with slow motion
cucumber-js --config cucumber.config.slow.js --grep "Successful login"
```

**Examples:**
```bash
# Run "Successful login with valid credentials"
cucumber-js --config cucumber.config.headed.js --grep "Successful login"

# Run "Login with incorrect password"
cucumber-js --config cucumber.config.headed.js --grep "incorrect password"

# Run "Login with empty fields"
cucumber-js --config cucumber.config.headed.js --grep "empty fields"
```

### Method 2: Using Tags

Run tests by their tags:

```bash
# Run only positive scenarios
cucumber-js --config cucumber.config.headed.js --tags @positive

# Run only negative scenarios
cucumber-js --config cucumber.config.headed.js --tags @negative

# Run only validation scenarios
cucumber-js --config cucumber.config.headed.js --tags @validation

# Run only session scenarios
cucumber-js --config cucumber.config.headed.js --tags @session
```

**Combine tags:**
```bash
# Run positive OR negative (both)
cucumber-js --config cucumber.config.headed.js --tags "@positive or @negative"

# Run positive AND specific scenario
cucumber-js --config cucumber.config.headed.js --tags "@positive" --grep "Successful"
```

### Method 3: Run Specific Feature File

```bash
# Run all scenarios in login.feature
cucumber-js --config cucumber.config.headed.js features/login.feature
```

### Method 4: Run by Line Number

```bash
# Run scenario starting at line 10
cucumber-js --config cucumber.config.headed.js features/login.feature:10
```

## 🚀 Quick Reference

### Headed Mode (Visible Browser)
```bash
cucumber-js --config cucumber.config.headed.js --grep "scenario name"
```

### Slow Motion (Visible + Slow)
```bash
cucumber-js --config cucumber.config.slow.js --grep "scenario name"
```

### Headless Mode (No Browser)
```bash
cucumber-js --config cucumber.config.js --grep "scenario name"
```

## 📝 Current Test Scenarios

Based on `features/login.feature`, you have these scenarios:

1. **Successful login with valid credentials** (`@positive`)
   ```bash
   cucumber-js --config cucumber.config.headed.js --grep "Successful login"
   ```

2. **Login with incorrect password** (`@negative`)
   ```bash
   cucumber-js --config cucumber.config.headed.js --grep "incorrect password"
   ```

3. **Login with incorrect store code** (`@negative`)
   ```bash
   cucumber-js --config cucumber.config.headed.js --grep "incorrect store code"
   ```

4. **Login with non-existent user** (`@negative`)
   ```bash
   cucumber-js --config cucumber.config.headed.js --grep "non-existent user"
   ```

5. **Login with empty fields** (`@validation`)
   ```bash
   cucumber-js --config cucumber.config.headed.js --grep "empty fields"
   ```

6. **Session timeout and re-login** (`@session`)
   ```bash
   cucumber-js --config cucumber.config.headed.js --grep "Session timeout"
   ```

## 💡 Tips

1. **Use grep for partial matches**: `--grep "login"` will match any scenario with "login" in the name
2. **Case insensitive**: Grep is case-insensitive by default
3. **Combine methods**: You can combine grep and tags:
   ```bash
   cucumber-js --config cucumber.config.headed.js --tags @positive --grep "Successful"
   ```
4. **Use quotes**: Always use quotes around grep patterns with spaces

## 🎬 Example Commands

```bash
# Run single test in headed mode
cucumber-js --config cucumber.config.headed.js --grep "Successful login with valid credentials"

# Run single test with slow motion
cucumber-js --config cucumber.config.slow.js --grep "incorrect password"

# Run all positive tests
cucumber-js --config cucumber.config.headed.js --tags @positive

# Run all negative tests
cucumber-js --config cucumber.config.headed.js --tags @negative
```

