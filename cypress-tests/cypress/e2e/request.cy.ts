import menuComponent, { MenuItem } from "../components/menuComponent";
import requestPage, { DogSize, Experience, FormData, GenderItem, TemperamentItem } from "../pages/requestPage";
import { faker } from '@faker-js/faker';


//Arrange
beforeEach(() => {
    cy.visit('/')
    menuComponent.navigate(MenuItem.REQUEST)
})

describe('Request page tests', () => {

    it('should fill all fields correctly and send request', () => {

        //Arrange
        cy.fixture('formData.json').then((formData) => {
            const data: FormData = {
                name: faker.internet.displayName(),
                email: faker.internet.email(),
                phoneNumber: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
                breed: formData.breed,
                budget: formData.budget,
                message: formData.validMessage,
                gender: GenderItem.Fenka,
                temperament: [TemperamentItem.Klidny, TemperamentItem.Pratelsky],
                imagePath: "UglyDog.jpg",
                dogSize: DogSize.Male,
                experience: Experience.Expert,
                //vybere den podle zadaneho cisla a pristi mesic
                date: faker.number.int({ min: 1, max: 28 }).toString(),
            }

            //Act
            requestPage.fillForm(data)

        })

        //cy.wait(5000)

        requestPage.submitRequest()

        //Assert
        requestPage.submitSuccessMessage().should('be.visible')
            .and('have.text', '✅ Poptávka byla úspěšně odeslána! Děkujeme za váš zájem. Brzy se vám ozveme s personalizovanou nabídkou na míru.')

        //ze jsou data ve formulari vycistena
        requestPage.assertClearForm()


    });

    it('should clear all input fields when Reset button is clicked', () => {

        //Arrange
        cy.fixture('formData.json').then((formData) => {
            const data: FormData = {
                name: faker.internet.displayName(),
                email: faker.internet.email(),
                phoneNumber: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
                breed: formData.breed,
                budget: formData.budget,
                message: formData.validMessage,
                gender: GenderItem.Pes,
                temperament: [TemperamentItem.Aktivni, TemperamentItem.Hypoalergenni],
                imagePath: "UglyDog.jpg",
                dogSize: DogSize.Velke,
                experience: Experience.Zacatecnik,
                //vybere den podle zadaneho cisla a pristi mesic
                date: faker.number.int({ min: 1, max: 28 }).toString(),
            }

            //Act
            requestPage.fillForm(data)

        })

        requestPage.resetButton().click()

        //Assert
        requestPage.assertClearForm()


    });

    it('should show error when message is too short', () => {
        //Arrange
        cy.fixture('formData.json').then((formData) => {
            const data: FormData = {
                name: faker.internet.displayName(),
                email: faker.internet.email(),
                message: formData.invalidMessage,
                dogSize: DogSize.Stredni,
                experience: Experience.Pokrocily,
                //vybere den podle zadaneho cisla a pristi mesic
                date: faker.number.int({ min: 1, max: 28 }).toString(),
            }

            //Act
            requestPage.fillForm(data)

        })

        //Assert
        requestPage.messageInputErrorMessage().should('be.visible').and('contain', 'Popište své požadavky (min. 10 znaků)')



    });

    it('should show error when email is invalid', () => {

        //Arrange
        cy.fixture('formData.json').then((formData) => {
            const data: FormData = {
                name: faker.internet.displayName(),
                email: formData.invalidEmail,
                message: formData.validMessage,
                dogSize: DogSize.Velke,
                experience: Experience.Zacatecnik,
                //vybere den podle zadaneho cisla a pristi mesic
                date: faker.number.int({ min: 1, max: 28 }).toString(),
            }

            //Act
            requestPage.fillForm(data)

        })

        //Assert
        requestPage.emailInputErrorMessage().should('be.visible').and('contain', 'Zadejte platný e‑mail')

    });

});