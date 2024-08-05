const { test, expect } = require('../support');
const data = require('../support/fixtures/movies.json')

test.beforeEach(async ({ page }) => {
    await page.loginPage.visit();
    // await page.landingPage.openLeadModal();
    await page.loginPage.submitLogin("admin@zombieplus.com", "pwd123");
    await page.moviesPage.isLoggedIn();
});

test('deve cadastrar um novo filme', async ({ page }) => {
    const movie = data.guerra_mundial_z
    await page.moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year,movie.cover);
});

test('não deve cadastrar um novo filme sem dados', async ({ page }) => {
    await page.moviesPage.registerIcon().click();
    await page.moviesPage.cadastrarButton().click();
    await page.moviesPage.alertHaveTexts([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]);
});