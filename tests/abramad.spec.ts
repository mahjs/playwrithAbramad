import { test, expect } from "@playwright/test";
import PageHelper from "../utils/pageHelper";

test("go with mobile", async ({ page }) => {
  // await page.goto("https://develop.abramad.com/");
  const pageHelper = new PageHelper(page);
  await pageHelper.goto("https://develop.abramad.com/");

  // Expect a title "to contain" a substring.

  // await page.getByPlaceholder("۰۹۱۲۲۳۴۵۶۷۸").fill("09196971618");
  (await pageHelper.getInputWithLabelText("شماره موبایل")).fill("09358863982");
  (await pageHelper.getInputWithLabelText("کد امنیتی")).fill("1234");
  // await page.getByRole("button", { name: "دریافت کد" }).click();
  await pageHelper.clickButtonByName("دریافت کد");
  // await expect(page.getByText("کد ارسال شده را وارد کنید")).toBeVisible();
  // await pageHelper.expectTextToBeVisible("۰۹۳۵۸۸۶۳۹۸۲");
  await pageHelper.expectTextToBeVisible("وارد کردن کد امنیتی اجباری است.");
  // await expect(page.getByText("09196971618")).toBeVisible();
});

test("go with email", async ({ page }) => {
  await page.goto("https://develop.abramad.com/");
  await page.getByRole("link", { name: "ورود با ایمیل" }).click();
  await expect(page.getByPlaceholder("example@gmail.com")).toBeVisible();
});

test("create password", async ({ page }) => {
  await page.goto("https://develop.abramad.com/auth/login-email");
  await page.getByRole("link", { name: "ایجاد رمزعبور جدید" }).click();
  await expect(page.getByPlaceholder("example@gmail.com")).toBeVisible();
});
