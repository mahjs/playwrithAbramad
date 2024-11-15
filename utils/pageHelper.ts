// utils/pageHelper.ts

import { expect } from "@playwright/test";
import { Page } from "playwright";

class PageHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getInputWithLabelText(text: string) {
    await this.page.waitForSelector("f-field");

    const inputLocator = await this.page.evaluateHandle(
      ({ text }) => {
        const fieldElement = Array.from(
          document.querySelectorAll("f-field")
        ).find((field) => {
          const label = field.shadowRoot?.querySelector("label");

          return label?.textContent?.includes(text);
        });

        if (!fieldElement) throw new Error();

        const inputElement = fieldElement
          .querySelector("f-textbox")
          ?.shadowRoot?.querySelector("input");
        if (!inputElement)
          throw new Error(`Field with label "${text}" not found`);

        return inputElement;
      },
      { text }
    );

    return inputLocator;
  }

  async clickButtonByName(name: string) {
    // await this.page.getByRole("f-button", { name }).click();
    await this.page.locator(`f-button:has-text("${name}")`).click();
  }

  async clickLinkByName(name: string) {
    await this.page.getByRole("link", { name }).click();
  }

  async expectTextToBeVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectPlaceholderToBeVisible(placeholder: string) {
    await expect(this.page.getByPlaceholder(placeholder)).toBeVisible();
  }

  // Add more methods as needed...
}

export default PageHelper;
