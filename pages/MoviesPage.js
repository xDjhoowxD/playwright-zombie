const { test, expect } = require('@playwright/test');
// const fs = require('fs');
// const moviesCover = require('../support/fixtures/covers/movies');
// const moviesData = require('../support/fixtures/movies.json')

export class MoviesPage {
    constructor(page) {
        this.page = page;
    }

        // Elements

    registerIcon() {
        return this.page.locator('a[href$="register"]')
    }

    movieTitleField() {
        return this.page.getByLabel('Titulo do filme')
    }

    movieSinopseField() {
        return this.page.getByLabel('Sinopse')
    }

    movieDistribuidoField() {
        return this.page.locator('#select_company_id')
    }

    movieDistribuidoList() {
        return this.page.locator('.react-select __option')
    }

    movieAnoLancamentoField() {
        return this.page.locator('#select_year')
    }

    movieAnoLancamentoList() {
        return this.page.locator('.react-select __option')
    }

    escolherArquivoButton() {
        return this.page.getByLabel('Poster')
    }

    alert() {
        return this.page.locator('.alert')
    }

    cadastrarButton() {
        return this.page.getByRole('button', {name: 'Cadastrar'})
    }





    


    // Methods
    

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');
        await expect (this.page).toHaveURL(/.*admin\/movies/)
    }

    async registerMovie(title,overview,company,release_year) {
        await this.registerIcon().click()
        await this.movieTitleField().fill(title)
        await this.movieSinopseField().fill(overview)
        await this.movieDistribuidoField().click()
        await this.movieDistribuidoField().getByText(company).click()
        await this.movieAnoLancamentoField().click()
        await this.movieAnoLancamentoField().getByText(release_year).click()

    }    

    async alertHaveTexts(expectedTexts) {
        await this.page.waitForSelector('.alert', { state: 'visible' });
        for (const expectedText of expectedTexts) {
            const alert = this.page.locator('.alert:has-text("' + expectedText + '")');
            await expect(alert).toHaveText(expectedText, { timeout: 5000 });  
        }
    }

    async create(title,overview,company,release_year,cover) {
        await this.registerIcon().click()
        await this.movieTitleField().fill(title)
        await this.movieSinopseField().fill(overview)
        await this.movieDistribuidoField().click()
        await this.movieDistribuidoField().getByText(company).click()
        await this.movieAnoLancamentoField().click()
        await this.movieAnoLancamentoField().getByText(release_year).click()
        await this.escolherArquivoButton().setInputFiles('support/fixtures'+cover)
    }
    
    
    
    
    
}

