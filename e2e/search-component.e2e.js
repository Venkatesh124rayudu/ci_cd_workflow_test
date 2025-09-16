// tests/visual/search-component.spec.js
import { test, expect } from '@playwright/test';

test.describe('SearchBox Visual Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock the weather API to ensure consistent responses
    await page.route('**/api.openweathermap.org/**', async (route) => {
      const url = route.request().url();
      
      if (url.includes('q=Paris')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            weather: [{ description: "Clear sky" }],
            main: { 
              temp: 22, 
              temp_max: 25, 
              temp_min: 18, 
              pressure: 1013, 
              humidity: 65 
            }
          })
        });
      } else if (url.includes('q=InvalidCity')) {
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ message: "city not found" })
        });
      }
    });
    
    await page.goto('/');
  });

  test('initial search form appearance', async ({ page }) => {
    // Wait for the component to load
    await expect(page.getByText('Search City')).toBeVisible();
    
    // Take screenshot of initial state
    await expect(page.locator('.search')).toHaveScreenshot('search-initial-state.png');
  });

  test('search form with input text', async ({ page }) => {
    const input = page.getByLabel(/city/i);
    await input.fill('Paris');
    
    // Take screenshot with input filled
    await expect(page.locator('.search')).toHaveScreenshot('search-with-input.png');
  });

  test('successful search result display', async ({ page }) => {
    const input = page.getByLabel(/city/i);
    const searchButton = page.getByRole('button', { name: /search/i });
    
    await input.fill('Paris');
    await searchButton.click();
    
    // Wait for the parent component to potentially update with weather info
    // Since we can't see the weather display component, we'll just wait a moment
    await page.waitForTimeout(1000);
    
    // Take screenshot after successful search (input should be cleared)
    await expect(page.locator('.search')).toHaveScreenshot('search-after-success.png');
  });

  test('error state display', async ({ page }) => {
    const input = page.getByLabel(/city/i);
    const searchButton = page.getByRole('button', { name: /search/i });
    
    await input.fill('InvalidCity');
    await searchButton.click();
    
    // Wait for error message to appear
    await expect(page.getByText(/No such City Found/i)).toBeVisible();
    
    // Take screenshot of error state
    await expect(page.locator('.search')).toHaveScreenshot('search-error-state.png');
  });

  test('mobile responsive view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.getByText('Search City')).toBeVisible();
    
    // Take screenshot of mobile view
    await expect(page.locator('.search')).toHaveScreenshot('search-mobile-view.png');
  });

  test('button hover state', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: /search/i });
    
    // Hover over the button
    await searchButton.hover();
    
    // Take screenshot of hover state
    await expect(page.locator('.search')).toHaveScreenshot('search-button-hover.png');
  });

  test('focus state on input', async ({ page }) => {
    const input = page.getByLabel(/city/i);
    
    // Focus on the input
    await input.focus();
    
    // Take screenshot of focused input
    await expect(page.locator('.search')).toHaveScreenshot('search-input-focus.png');
  });
});