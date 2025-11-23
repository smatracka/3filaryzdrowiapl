// tests/e2e/category.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Category CRUD', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/admin/kategorie');
    });

    test('should display category tree', async ({ page }) => {
        // Verify the page heading
        await expect(page.locator('h1')).toContainText('Kategorie');
        // Verify at least one category link is visible
        const firstCategory = page.locator('a').first();
        await expect(firstCategory).toBeVisible();
    });

    test('should navigate to create category page', async ({ page }) => {
        await page.click('text=Dodaj kategorię');
        await expect(page).toHaveURL(/\/admin\/kategorie\/nowa/);
        // Further steps would fill the form and submit
    });
});
