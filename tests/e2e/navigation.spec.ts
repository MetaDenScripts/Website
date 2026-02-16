import { expect, test } from "@playwright/test";

test("homepage shows latest scripts cards with store and docs links", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Latest Scripts" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Police Tools" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Vehicle Keys" })).toBeVisible();

  const policeCard = page.locator(".latest-script-card", {
    has: page.getByRole("heading", { name: "Police Tools" })
  });

  await expect(policeCard.getByRole("link", { name: "Store" })).toBeVisible();
  await expect(policeCard.getByRole("link", { name: "Documentation" })).toBeVisible();
});

test("script pages expose all required sections", async ({ page }) => {
  await page.goto("/scripts/");

  await expect(page.getByRole("link", { name: "Vehicle Keys" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Police Tools" }).first()).toBeVisible();

  await page.getByRole("link", { name: "Vehicle Keys" }).first().click();
  await expect(page.locator("main h1", { hasText: "Vehicle Keys" })).toBeVisible();

  await page.goto("/scripts/vehicle-keys/api");
  await expect(page.getByRole("heading", { name: "Vehicle Keys API" })).toBeVisible();

  await page.goto("/scripts/vehicle-keys/config-examples");
  await expect(page.getByRole("heading", { name: "Vehicle Keys Config Examples" })).toBeVisible();

  await page.goto("/scripts/vehicle-keys/changelog");
  await expect(page.getByRole("heading", { name: "Vehicle Keys Changelog" })).toBeVisible();
});
