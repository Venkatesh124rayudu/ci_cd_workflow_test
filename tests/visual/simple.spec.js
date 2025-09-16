// tests/visual/simple.spec.js
import { test, expect } from '@playwright/test';

test('simple page load test', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the search component to load
  await expect(page.getByText('Search City')).toBeVisible();
  
  // Take a simple screenshot
  await expect(page).toHaveScreenshot('homepage.png');
});