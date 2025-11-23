// tests/e2e/product.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Product CRUD', () => {
    test.beforeEach(async ({ page }) => {
        // Assuming admin is publicly accessible in dev; otherwise add login steps here
        await page.goto('/admin/produkty');
    });

    test('should display product list', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Produkty' })).toBeVisible();
        await expect(page.locator('table')).toBeVisible();
        // Verify at least one product row exists (mock data may be present)
        const rows = page.locator('tbody tr');
        await expect(rows.first()).toBeVisible();
    });

    // Placeholder for create product test – to be expanded later
    test('should navigate to create product page', async ({ page }) => {
        await page.click('text=Dodaj produkt');
        await expect(page).toHaveURL(/\/admin\/produkty\/nowy/);
        // Further steps would fill the multi‑step form and submit
    });
});
