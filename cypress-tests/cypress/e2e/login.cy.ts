import menuComponent, { MenuItem } from "../components/menuComponent";
import loginPage from "../pages/loginPage";

describe('Login page tests', () => {

    //Arrange

    beforeEach(() => {
        cy.visit('/')
        menuComponent.navigate(MenuItem.LOGIN)
    })

    it('should validate all html elements on Login page', () => {

    });

    it.only('should login with valid credentials', () => {

        //Act
        loginPage.login(Cypress.env('validUserName'), Cypress.env('validPassword'))

        //Assert
        loginPage.loginMessage().should('be.visible')
            .and('contain', 'Přihlášení úspěšné.')
        loginPage.loginConfirmationMessage().should('be.visible')
            .and('contain', 'Přihlášený uživatel: ' + Cypress.env('validUserName'))
        loginPage.loggedEmailOnTop().should('be.visible')
            .and('contain', Cypress.env('validUserName'))


    });

    it('should try to login with invalid email', () => {

    });

    it('should try to login with invalid password', () => {

    });

    it('should try to login with blocked user', () => {

    });

});