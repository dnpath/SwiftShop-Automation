import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../config/environments';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(`${ENV.baseUrl}${path}`);
  }

  async waitForElementHidden(locator: Locator, timeout: number = ENV.timeouts.medium): Promise<void> {
    await expect(locator).toBeHidden({ timeout });
  }
}