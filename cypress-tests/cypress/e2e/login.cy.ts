import menuComponent, { MenuItem } from "../components/menuComponent";
import loginPage from "../pages/loginPage";

describe('Login page tests', () => {

    //Arrange
    beforeEach(() => {
        cy.visit('/')
        menuComponent.navigate(MenuItem.LOGIN)
    })

    it('should validate all html elements on Login page', () => {

        //Assert
        loginPage.loginPageTitle().should('be.visible').and('contain', 'Přihlášení')
        loginPage.loginEmailInput().should('exist').and('have.value', '')
        loginPage.loginPasswordInput().should('exist').and('have.value', '')
        loginPage.loginButton().should('exist').and('be.visible').and('be.enabled')

    });

    it('should login with valid credentials', () => {

        //Act
        cy.login(Cypress.env('validUserEmail'), Cypress.env('validPassword'))

        //Assert
        loginPage.loginMessage().should('be.visible')
            .and('contain', 'Přihlášení úspěšné.')
        loginPage.loginConfirmationMessage().should('be.visible')
            .and('contain', 'Přihlášený uživatel: ' + Cypress.env('validUserEmail'))
        loginPage.loggedEmailOnTop().should('be.visible')
            .and('contain', Cypress.env('validUserEmail'))


    });

    it('should try to login with invalid email', () => {

        //Act
        cy.login(Cypress.env('invalidUserEmail'), Cypress.env('validPassword'))

        //Assert
        loginPage.loginEmailError().should('be.visible')
            .and('contain', 'Do e-mailové adresy zahrňte znak @.')


    });

    it('should try to login with invalid password', () => {

        //Act
        cy.login(Cypress.env('validUserEmail'), Cypress.env('invalidPassword'))

        //Assert
        loginPage.loginMessage().should('be.visible')
            .and('contain', 'Neplatné přihlašovací údaje.')

    });

    it('should try to login with blocked user', () => {

        //Act
        cy.login(Cypress.env('blockedUserEmail'), Cypress.env('blockedPassword'))

        //Assert
        loginPage.loginMessage().should('be.visible')
            .and('contain', 'Účet je zablokován.')

    });

});