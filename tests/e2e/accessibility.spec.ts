import { expect, test } from "@playwright/test";

test("skip link and keyboard focus are available", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
});
