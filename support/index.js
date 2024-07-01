const { test: base, expect, describe, APIRequestContext } = require('@playwright/test');

const { LandingPage } = require('../pages/LandingPage');
const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage');

const test = base.extend({
    page: async ({ page }, use) => {
        page.landingPage = new LandingPage(page);
        page.loginPage = new LoginPage(page);
        page.moviesPage = new MoviesPage(page);
        await use(page);
    },
    request: async ({}, use) => {
        const apiRequest = await APIRequestContext.create(); // Correct method if using Playwright v1.12 or newer
        await use(apiRequest);
        await apiRequest.dispose();
    },
});

module.exports = { test, expect, describe };
