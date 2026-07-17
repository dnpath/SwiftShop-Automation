import { test, expect, Page, Locator } from '@playwright/test';

// Target the production application sandbox url hosted on GitHub Pages
const TARGET_URL: string = 'https://dnpath.github.io/SwiftShop/';

test.describe('SwiftShop Enterprise Remote Functional Suite (TypeScript)', () => {

  test.beforeEach(async ({ page }: { page: Page }) => {
    // Navigate straight to the live hosted application environment
    await page.goto(TARGET_URL);
  });

  test('Should strictly display login view on initial load', async ({ page }: { page: Page }) => {
    const loginView: Locator = page.locator('#login-view');
    const shopView: Locator = page.locator('#shop-view');

    await expect(loginView).toBeVisible();
    await expect(shopView).toBeHidden();
  });

  test('Should navigate to the shop dashboard upon successful login', async ({ page }: { page: Page }) => {
    await page.fill('#username', 'ts_automation_engineer');
    await page.fill('#password', 'SecurePass123!');
    await page.click('#login-form button[type="submit"]');

    await expect(page.locator('#login-view')).toBeHidden();
    await expect(page.locator('#shop-view')).toBeVisible();
  });

  test('Should increment cart counter badge when product items are added', async ({ page }: { page: Page }) => {
    await page.fill('#username', 'ts_automation_user');
    await page.fill('#password', 'SecurePass123!');
    await page.click('#login-form button[type="submit"]');

    const firstAddBtn: Locator = page.locator('.btn-add-cart').first();
    await firstAddBtn.click();

    const cartCount: Locator = page.locator('#cart-count');
    await expect(cartCount).toHaveText('1');
  });

  test('Should handle synthetic API delays and wait for elements', async ({ page }: { page: Page }) => {
    await page.fill('#username', 'ts_automation_user');
    await page.fill('#password', 'SecurePass123!');
    await page.click('#login-form button[type="submit"]');

    const delayTrigger: Locator = page.locator('text=Simulate Latency').or(page.locator('button:has-text("Delay")'));
    
    if (await delayTrigger.count() > 0) {
      await delayTrigger.click();

      const spinner: Locator = page.locator('#loading-spinner');
      await expect(spinner).toBeVisible();
      // TypeScript safety ensures timeout property configuration matches expected options profiles
      await expect(spinner).toBeHidden({ timeout: 5000 });
    }
    
    await expect(page.locator('.product-card').first()).toBeVisible();
  });
});