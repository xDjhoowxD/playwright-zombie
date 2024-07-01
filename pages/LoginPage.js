const { test, expect } = require('@playwright/test');

export class LoginPage {
    constructor(page) {
        this.page = page
    }


    // Elements

    emailAdmin(){
        const emailAdmin = "admin@zombieplus.com"
    }

    passwordAdmin(){
        const passwordAdmin = "pwd123"
    }

    loginForm() {
        return this.page.locator('.login-form');
    }

    emailField() {
        return this.page.locator('[placeholder="E-mail"]');
    }

    passwordField() {
        return this.page.locator('[placeholder="Senha"]');
    }

    entrarButton() {
        return this.page.locator('text=Entrar');
    }

    logoutLink() {
        return this.page.locator('a[href="/logout"]')
    }

    toast() {
        return this.page.locator('.toast')
    }

    alertEmail() {
        return this.page.locator('.email-alert')
    }

    alertPassword() {
        return this.page.locator('.password-alert')
    }



    // Methods
    async visit() {
        await this.page.goto('http://localhost:3000/admin/login');
        await expect(this.loginForm()).toBeVisible();
    }

    async submitLogin(email, password) {
        await this.emailField().fill(email);
        await this.passwordField().fill(password);
        await this.entrarButton().click();
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');
        await expect (this.page).toHaveURL(/.*admin\/movies/)
    }

    async isNotLoggedIn() {
        await this.page.waitForLoadState('networkidle');
        await expect (this.page).toHaveURL(/.*admin\/login/)
    }

    async toastHaveText(target) {
        await expect(this.toast()).toHaveText(target,{timeout:30000})
    }

    async alertEmailHaveText(target) {
        await expect(this.alertEmail()).toHaveText(target)
    }

    async alertPasswordHaveText(target) {
        await expect(this.alertPassword()).toHaveText(target)
    }

}
