import { expect, test } from "@playwright/test";

test("latest scripts card opens markdown docs page", async ({ page }) => {
  await page.goto("/");

  const docsLink = page
    .locator(".latest-script-card", { has: page.getByRole("heading", { name: "Police Tools" }) })
    .getByRole("link", { name: "Documentation" });

  await docsLink.click();
  await expect(page.locator("main h1", { hasText: "Police Tools" })).toBeVisible();
});

test("markdown content renders headings, table, and code block", async ({ page }) => {
  await page.goto("/scripts/vehicle-keys/readme");

  await expect(page.locator("main h1", { hasText: "Vehicle Keys" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "/givekey <id>" })).toBeVisible();
  await expect(page.locator("pre code")).toHaveCount(1);
});
