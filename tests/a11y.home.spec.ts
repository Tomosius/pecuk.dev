import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home has title and no critical a11y issues", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/My Website/i);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
