import { test, expect } from "@playwright/test";

// Example E2E test for the booking flow
test("Booking Flow", async ({ page }) => {
  // 1. Visit Home
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/BusX/);

  // 2. Search for a trip
  // Assuming defaults are fine, just click search
  await page.click('button[type="submit"]');

  // 3. Select a trip (expand accordion)
  const selectButton = page
    .locator("button", { hasText: "Koltuk Seç" })
    .first();
  await selectButton.click();

  // 4. Select seats (wait for seat map to load)
  // Clicking seat 1 and 3
  const seat1 = page.locator("button").filter({ hasText: /^1$/ });
  await seat1.click();
  const seat3 = page.locator("button").filter({ hasText: /^3$/ });
  await seat3.click();

  // 5. Verify total and continue
  await expect(page.locator("text=Toplam")).toBeVisible();
  await page.click('button:has-text("Ödemeye Geç")');

  // 6. Fill Passenger Form
  await page.waitForURL("**/checkout");

  // Passenger 1
  await page.fill('input[name="passengers.0.firstName"]', "Ali");
  await page.fill('input[name="passengers.0.lastName"]', "Yilmaz");
  await page.fill('input[name="passengers.0.idNo"]', "12345678901");

  // Passenger 2
  await page.fill('input[name="passengers.1.firstName"]', "Ayse");
  await page.fill('input[name="passengers.1.lastName"]', "Demir");
  await page.fill('input[name="passengers.1.idNo"]', "10987654321");

  // Contact
  await page.fill('input[name="email"]', "test@example.com");
  await page.fill('input[name="phone"]', "5551234567");

  // Agreement
  await page.check('input[name="agreement"]');

  // 7. Confirm
  await page.click('button:has-text("Ödemeyi Tamamla")');

  // 8. Success
  await page.waitForURL("**/success");
  await expect(page.locator("text=Ödeme Başarılı!")).toBeVisible();
});
