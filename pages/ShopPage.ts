import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {
  readonly shopView: Locator;
  readonly navPanel: Locator;
  readonly cartCounter: Locator;
  private readonly addCartButtons: Locator;
  private readonly latencyTrigger: Locator;
  private readonly loadingSpinner: Locator;

  constructor(page: Page) {
    super(page);
    this.shopView = page.locator('#shop-view');
    this.navPanel = page.locator('#nav');
    this.cartCounter = page.locator('#cart-count');
    this.addCartButtons = page.locator('.btn-add-cart');
    this.latencyTrigger = page.locator('text=Simulate Latency').or(page.locator('button:has-text("Delay")'));
    this.loadingSpinner = page.locator('#loading-spinner');
  }

  async addFirstItemToCart(): Promise<void> {
    await this.addCartButtons.first().click();
  }

  async triggerLatencySimulation(): Promise<void> {
    if (await this.latencyTrigger.count() > 0) {
      await this.latencyTrigger.click();
    }
  }

  async handleAsyncSpinnerResolution(): Promise<void> {
    await this.triggerLatencySimulation();
    // Use inherited helper to abstract waiting rules cleanly
    await this.waitForElementHidden(this.loadingSpinner);
  }
}