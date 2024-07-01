const { test, expect } = require('@playwright/test');

export class LandingPage {

    constructor(page) {
        this.page = page
    }

    //elements
    toast() {
        return this.page.locator('.toast')
    }

    alert() {
        return this.page.locator('.alert')
    }


    //methods

    async visit(){
        await this.page.goto('http://localhost:3000');
    }

    async openLeadModal(){
        await this.page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()
        expect (this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')
    }

    async submitLeadModal(nome,email){
        await this.page.locator('#name').fill(nome)
        await this.page.getByPlaceholder('Informe seu email').fill(email)
        await this.page.getByRole('button', {name: 'Quero entrar na fila!'}).click()
    }

    async validateSubmitLeadToast(mensagem) {
        await expect(this.toast()).toHaveText(mensagem)
        await expect(this.toast()).toBeHidden({timeout:5000})
    }

    async toastHaveText(target) {
        await expect(this.toast()).toHaveText(target)
    }

    async alertHaveText(target) {
        await expect(this.alert()).toHaveText(target)
    }
}