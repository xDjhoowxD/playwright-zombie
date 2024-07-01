const { test, expect } = require('@playwright/test');

export class MoviesPage {
    constructor(page) {
        this.page = page
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
}
