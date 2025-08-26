export default new class LoginPage {

    wrapper = () => cy.get('[data-testid="main"]')
    loginEmailInput = () => this.wrapper().find('[data-testid="login-email"]')
    loginPasswordInput = () => this.wrapper().find('[data-testid="login-password"]')
    loginButton = () => this.wrapper().find('[data-testid="login-submit"]')
    loginConfirmationMessage = () => this.wrapper().find('[data-testid="logged-email"]')
    loggedEmailOnTop = () => cy.get('[data-testid="user-email"]')
    logoutButton = () => this.wrapper().find('[data-testid="logout-now"]')
    logoutOnTopButton = () => cy.get('[data-testid="logout-button"]')
    //loginMessage muze byt bud "Přihlášení úspěšné." nebo "Účet je zablokován."
    loginMessage = () => cy.get('[data-testid="login-message"]')


    login(loginEmail: string, password: string) {
        this.loginEmailInput().clear().type(loginEmail)
        this.loginPasswordInput().clear().type(password)
        this.loginButton().click()
    }
}