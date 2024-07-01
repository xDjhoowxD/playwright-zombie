const { test, expect } = require('../support/index'); 

  // test.beforeEach(async ({ page }) => {
  //   landingPage = new LandingPage(page); 
  //   loginPage = new LoginPage(page);
  //   moviesPage = new MoviesPage(page)
  // });

  test('deve logar como administrador', async ({ page }) => {
    await page.loginPage.visit();
    await page.loginPage.submitLogin("admin@zombieplus.com","pwd123");
    await page.moviesPage.isLoggedIn();
  });

  test('não deve logar como administrador quando senha é incorreta', async ({ page }) => {
    await page.loginPage.visit();
    await page.loginPage.submitLogin("admin@zombieplus.com","123");
    await page.loginPage.isNotLoggedIn()
  });

  test('não deve logar como administrador quando email é incorreto', async ({ page }) => {
    await page.loginPage.visit();
    await page.loginPage.submitLogin("aaa@aaa.com","123");
    await page.loginPage.isNotLoggedIn()
  });

  test('não deve logar como administrador quando email não é preenchido', async ({ page }) => {
    await page.loginPage.visit();
    await page.loginPage.submitLogin("","123");
    await page.loginPage.isNotLoggedIn()
    await page.loginPage.alertEmailHaveText('Campo obrigatório')
  });

  test('não deve logar como administrador quando senha não é preenchido', async ({ page }) => {
    await page.loginPage.visit();
    await page.loginPage.submitLogin("admin@zombieplus.com","");
    await page.loginPage.isNotLoggedIn()
    await page.loginPage.alertPasswordHaveText('Campo obrigatório')
  });

  test('não deve logar como administrador quando nenhum campo é preenchido', async ({ page }) => {
    await page.loginPage.visit();
    await page.loginPage.submitLogin("","");
    await page.loginPage.isNotLoggedIn()
    await page.loginPage.alertEmailHaveText('Campo obrigatório')
    await page.loginPage.alertPasswordHaveText('Campo obrigatório')
  });