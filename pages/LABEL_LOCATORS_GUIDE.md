# 🏷️ Using Labels for Element Detection - Guide

This guide explains how to use labels to find web elements, which is one of the most reliable locator strategies.

## 📚 What are Labels?

Labels are HTML elements (`<label>`) that are associated with form inputs. They provide:
- Better accessibility
- Better user experience (clicking label focuses input)
- More reliable locators for testing

### Example HTML Structure:

```html
<!-- Method 1: Label with 'for' attribute -->
<label for="username">User Name</label>
<input id="username" type="text" />

<!-- Method 2: Label wrapping input -->
<label>
  Password
  <input type="password" />
</label>

<!-- Method 3: Label with aria-label -->
<input type="text" aria-label="User Name" />
```

## 🎯 Why Use Labels?

1. **Most Reliable**: Labels are less likely to change than IDs or classes
2. **User-Centric**: Labels match what users see on screen
3. **Accessible**: Labels are required for accessibility compliance
4. **Stable**: Labels rarely change during UI updates

## 🔧 How Playwright Finds Elements by Label

### Method 1: Using `getByLabel()` (Recommended)

```typescript
// Find input by label text
const usernameInput = page.getByLabel('User Name');
await usernameInput.fill('testuser');

// Find input by partial label text
const passwordInput = page.getByLabel('Password');
await passwordInput.fill('password123');

// Exact match
const emailInput = page.getByLabel('Email Address', { exact: true });
```

### Method 2: Using CSS Selectors with Label

```typescript
// Find input that comes after a label
const input = page.locator('label:has-text("User Name") + input');

// Find input that is a sibling of label
const input = page.locator('label:has-text("Password") ~ input');

// Find input by label's 'for' attribute
const input = page.locator('label[for="username"] + input');
```

### Method 3: Using Label's 'for' Attribute

```typescript
// If label has for="username", find input with id="username"
const input = page.locator('label[for="username"] + input, #username');
```

## 📝 Updated LoginPage Locators

The `LoginPage.ts` now uses a **priority-based approach**:

1. **First Priority: Label Text** (Most Reliable)
   ```typescript
   label:has-text("User Name") + input
   label:has-text("Password") + input
   label:has-text("Store Code") + input
   ```

2. **Second Priority: Placeholder**
   ```typescript
   input[placeholder*="User Name" i]
   ```

3. **Third Priority: Name Attribute**
   ```typescript
   input[name="txtUserId"]
   ```

4. **Fallback: Type or Other Attributes**
   ```typescript
   input[type="password"]
   ```

## 🎨 BasePage Helper Methods

### `getByLabel(labelText)`
Finds form controls by their label text:
```typescript
const usernameField = basePage.getByLabel('User Name');
await usernameField.fill('testuser');
```

### `getInputByLabel(labelText)`
Specifically for input fields:
```typescript
const passwordField = basePage.getInputByLabel('Password');
await passwordField.fill('password123');
```

### `getByLabelOrPlaceholder(identifier)`
Flexible method that tries multiple strategies:
```typescript
// Tries: label -> placeholder -> name -> aria-label
const field = basePage.getByLabelOrPlaceholder('User Name');
```

## 💡 Best Practices

### ✅ DO:
- Use label text when available (most reliable)
- Use partial text matching for flexibility
- Combine multiple strategies for robustness
- Use `getByLabel()` for form inputs

### ❌ DON'T:
- Don't rely only on IDs (they change frequently)
- Don't use complex CSS selectors if label is available
- Don't use XPath for labels (Playwright's getByLabel is better)

## 🔍 Examples

### Example 1: Simple Label
```html
<label for="email">Email Address</label>
<input id="email" type="email" />
```

**Playwright Code:**
```typescript
const emailInput = page.getByLabel('Email Address');
await emailInput.fill('user@example.com');
```

### Example 2: Label Wrapping Input
```html
<label>
  Password
  <input type="password" name="pwd" />
</label>
```

**Playwright Code:**
```typescript
const passwordInput = page.getByLabel('Password');
await passwordInput.fill('secret123');
```

### Example 3: Multiple Labels (Use Partial Match)
```html
<label>User Name</label>
<input type="text" />
<label>User Name (Required)</label>
<input type="text" />
```

**Playwright Code:**
```typescript
// Matches both - uses first one
const input = page.getByLabel('User Name');
```

## 🎯 Updated Code Structure

The framework now uses this priority order:

1. **Label Text** → Most reliable, user-visible
2. **Placeholder** → Good fallback, user-visible
3. **Name Attribute** → Stable, semantic
4. **Type/ID/Class** → Last resort

## 📖 Reference

- [Playwright getByLabel() Documentation](https://playwright.dev/docs/locators#locate-by-label)
- [HTML Label Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [Accessibility Best Practices](https://www.w3.org/WAI/tutorials/forms/labels/)

