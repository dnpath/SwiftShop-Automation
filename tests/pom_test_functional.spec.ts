import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';
import { TEST_DATA } from '../data/users.data';

test.describe('SwiftShop QA Sandbox Regression Suite (POM + TypeScript)', () => {
  let loginPage: LoginPage;
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    shopPage = new ShopPage(page);
    
    // Navigate straight to target environment setup
    await loginPage.navigate();
  });

  test('Should strictly display login view on initial app boot', async () => {
    await expect(loginPage.loginView).toBeVisible();
    await expect(shopPage.shopView).toBeHidden();
  });

  test('Should navigate to the shop dashboard upon successful authentication', async () => {
    await loginPage.login(TEST_DATA.validUser.username, TEST_DATA.validUser.password);

    await expect(loginPage.loginView).toBeHidden();
    await expect(shopPage.shopView).toBeVisible();
    await expect(shopPage.navPanel).toBeVisible();
  });

  test('Should increment cart counter badge when product items are added', async () => {
    await loginPage.login(TEST_DATA.validUser.username, TEST_DATA.validUser.password);
    await shopPage.addFirstItemToCart();

    await expect(shopPage.cartCounter).toHaveText('1');
  });

  test('Should handle synthetic API delays and wait for elements gracefully', async () => {
    await loginPage.login(TEST_DATA.validUser.username, TEST_DATA.validUser.password);
    await shopPage.handleAsyncSpinnerResolution();

    // Verify view has parsed cards successfully after spinner falls out of DOM
    await expect(shopPage.shopView.locator('.product-card').first()).toBeVisible();
  });
});