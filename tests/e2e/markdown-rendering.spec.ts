import { expect, test } from "@playwright/test";

test("markdown content renders headings, table, and code block", async ({ page }) => {
  await page.goto("/scripts/vehicle-keys/readme");

  await expect(page.locator("main h1", { hasText: "Vehicle Keys" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "/givekey <id>" })).toBeVisible();
  await expect(page.locator("pre code")).toHaveCount(1);
});
