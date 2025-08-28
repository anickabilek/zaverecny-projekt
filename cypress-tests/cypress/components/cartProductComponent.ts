export default class CartProductComponent {
    private cartProductId: string
    constructor(cartProductId: string) {
        this.cartProductId = cartProductId

    }

    //cartProductWrapper = () => cy.get(`[data-testid="cart-item-${this.cartProductId}"]`)
    cartProductName = () => cy.get(`[data-testid="cart-item-name-${this.cartProductId}"]`)
    cartProductPrice = () => cy.get(`[data-testid="cart-item-price-${this.cartProductId}"]`)
    cartProductRemoveButton = () => cy.get(`[data-testid="remove-from-cart-${this.cartProductId}"]`)


}