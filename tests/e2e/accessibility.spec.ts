import { expect, test } from "@playwright/test";

test("skip link and keyboard focus are available", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();

  const latestSection = page.locator("section", {
    has: page.getByRole("heading", { name: "Latest Scripts" })
  });
  await expect(latestSection).toBeVisible();

  const docsLink = page.getByRole("link", { name: /Open .* documentation/i }).first();
  await expect(docsLink).toBeVisible();

  for (let index = 0; index < 20; index += 1) {
    if (await docsLink.evaluate((element) => element === document.activeElement)) {
      break;
    }

    await page.keyboard.press("Tab");
  }

  await expect(docsLink).toBeFocused();
});
