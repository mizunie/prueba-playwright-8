import { test, expect } from '@playwright/test';
import { AddToCartPage } from '../pages/AddToCartPage';

test.describe('@Add to cart', () => {
  let addToCartPage: AddToCartPage;

  test.beforeEach(async ({ page }) => {
    addToCartPage = new AddToCartPage(page);
    await addToCartPage.goto();
  });

  test('Happy path - Add two items to cart and go to checkout', async ({ page }) => {
    await test.step('Add first two items to cart', async () => {
      const { totalFullPrice } = await addToCartPage.clickFirstTwoAddToCartButtons();
      expect(totalFullPrice).toBeGreaterThan(0);
    });

    await test.step('Verify cart total updates and click it', async () => {
      const cartTotalElement = addToCartPage.cartTotal();
      await expect(cartTotalElement).toBeVisible();
      const cartTotalText = await cartTotalElement.textContent();
      expect(cartTotalText).toContain('2 item(s)');
      await addToCartPage.clickCartTotal();
      await addToCartPage.gotoCheckout();
    });

    await test.step('Verify redirection to checkout', async () => {
      await page.waitForURL('**/index.php?route=checkout/checkout');
      expect(page.url()).toContain('route=checkout/checkout');
    });
  });
});