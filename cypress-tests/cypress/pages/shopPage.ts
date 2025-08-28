export default new class ShopPage {

    shopTitle = () => cy.get('[data-testid="shop-title"]')
    productGrid = () => cy.get('[data-testid="product-grid"]')
    cartCount = () => cy.get('[data-testid="cart-count"]')
    addedProductMessage = () => cy.get('li[data-type="success"]')

}

