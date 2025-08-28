export default new class CartPage {

    wrapper = () => cy.get('[data-testid="main"]')
    cartClearButton = () => this.wrapper().find('[data-testid="cart-clear"]')
    cartCheckoutButton = () => this.wrapper().find('[data-testid="cart-checkout"]')


}