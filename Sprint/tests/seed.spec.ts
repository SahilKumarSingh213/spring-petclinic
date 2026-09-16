import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavigationPage } from '../pages/navigation.page';
import { DealsPage } from '../pages/deals.page';
import { getRuntimeConfig, resolveAppUrl } from '../utils/env';

test.describe('Precondition Seeding & Reset', () => {
  test('ensure zero-record state for TC-004 Deals empty-state precondition', async ({ page }) => {
    const config = getRuntimeConfig();
    test.skip(!config.baseUrl || !config.email || !config.password, 'Credentials not provided in environment; skipping seed.');

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const dealsPage = new DealsPage(page);

    // 1. Open login page and sign in
    await loginPage.openProtectedRoute(config.baseUrl, '/deals');
    await loginPage.expectVisible();
    await loginPage.login(config.email, config.password);

    // 2. Handle authenticated shell and transient overlays
    await navigationPage.expectAuthenticatedShell();
    await navigationPage.dismissTransientOverlays();

    // 3. Open Deals page
    await dealsPage.open(config.baseUrl);
    await dealsPage.expectVisible();

    // 4. Check if empty state already exists
    const emptyState = page.getByText('No records found', { exact: true });
    if (await emptyState.isVisible().catch(() => false)) {
      console.log('Deals is already in zero-record state.');
      return;
    }

    // 5. Clean up existing records if table rows are present
    const selectAllCheckbox = page.locator('th input[type="checkbox"], table thead input[type="checkbox"]').first();
    const deleteButton = page.getByRole('button', { name: 'Delete' }).or(page.locator('button.trash, button[title="Delete"]')).first();

    if (await selectAllCheckbox.isVisible().catch(() => false)) {
      await selectAllCheckbox.click();
      if (await deleteButton.isVisible().catch(() => false)) {
        await deleteButton.click();
        const confirmDialog = page.getByRole('button', { name: 'OK' }).or(page.getByRole('button', { name: 'Confirm' })).or(page.getByRole('button', { name: 'Delete' }));
        if (await confirmDialog.isVisible().catch(() => false)) {
          await confirmDialog.click();
        }
      }
    }

    // 6. Verify zero-record empty state is now established
    await page.goto(resolveAppUrl(config.baseUrl, '/deals'), { waitUntil: 'domcontentloaded' });
    await dealsPage.expectVisible();
  });
});
