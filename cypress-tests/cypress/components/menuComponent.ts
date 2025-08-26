export default new class MenuComponent {
    homeMenuItem = () => cy.get('[data-testid="nav-home"]')
    shopMenuItem = () => cy.get('[data-testid="nav-shop"]')
    requestMenuItem = () => cy.get('[data-testid="nav-request"]')
    cartMenuItem = () => cy.get('[data-testid="nav-cart"]')
    loginMenuItem = () => cy.get('[data-testid="nav-login"]')

    navigate(pagename: MenuItem) {
        switch (pagename) {
            case (MenuItem.HOME):
                this.homeMenuItem().click()
                break
            case (MenuItem.SHOP):
                this.shopMenuItem().click()
                break
            case (MenuItem.REQUEST):
                this.requestMenuItem().click()
                break
            case (MenuItem.CART):
                this.cartMenuItem().click()
                break
            case (MenuItem.LOGIN):
                this.loginMenuItem().click()
                break
        }
    }


}

export enum MenuItem {
    HOME = 'Home',
    SHOP = 'Shop',
    REQUEST = 'Request',
    CART = 'Cart',
    LOGIN = 'Login'

}