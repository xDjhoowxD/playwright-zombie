const { test, expect } = require('../support/index');

test.beforeEach(async ({ page }) => {
    await page.loginPage.visit();
    // await page.landingPage.openLeadModal();
    await page.loginPage.submitLogin("admin@zombieplus.com", "pwd123");
    await page.moviesPage.isLoggedIn();
});

test('deve cadastrar um novo filme', async ({ page }) => {
    await page.moviesPage.registerMovie('title', 'overview', 'Netflix', '1996');
});
