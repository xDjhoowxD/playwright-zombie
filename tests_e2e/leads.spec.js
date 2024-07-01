const { test, expect } = require('../support/index'); 
const { faker } = require('@faker-js/faker');
const axios = require('axios');

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email(); 

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
    await page.landingPage.visit();
    await page.landingPage.openLeadModal();
    await page.landingPage.submitLeadModal(randomName, randomEmail);
    await page.landingPage.validateSubmitLeadToast("Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!");
});

test('não deve cadastrar um lead quando o email ja for cadastrado', async ({ page }) => {
    // const response = await axios.post('http://localhost:3333/leads', {
    //   data: {
    //     name: 'aaa',
    //     email: 'email@provider.com'
    //   }
    // });

    // expect(response.status).toBe(400); 

    await page.landingPage.visit();
    await page.landingPage.openLeadModal();
    await page.landingPage.submitLeadModal("aaa", "email@provider.com");
    await page.landingPage.validateSubmitLeadToast("O endereço de e-mail fornecido já está registrado em nossa fila de espera.");
});
