import { test } from "@playwright/test";

test.beforeEach(({ page }) => {
  page.on("console", (m) => {
    if (m.type() === "error") throw new Error(m.text());
  });
  page.on("pageerror", (err) => {
    throw err;
  });
  page.on("response", (res) => {
    const rt = res.request().resourceType();
    if (rt !== "document" && res.status() >= 400) {
      throw new Error(`Asset/request failed: ${res.url()} ${res.status()}`);
    }
  });
});
