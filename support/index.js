const { test: base, expect, describe, APIRequestContext } = require('@playwright/test');

const { LandingPage } = require('../pages/LandingPage');
const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;
        
        context['landingPage'] = new LandingPage(page);
        context['loginPage'] = new LoginPage(page);
        context['moviesPage'] = new MoviesPage(page);

        await use(context);
    },
    request: async ({}, use) => {
        const apiRequest = new APIRequestContext();
        await use(apiRequest);
    },
});

module.exports = { test, expect, describe };
