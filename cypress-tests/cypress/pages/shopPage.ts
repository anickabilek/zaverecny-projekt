export default new class ShopPage {

    shopTitle = () => cy.get('[data-testid="shop-title"]')
    productGrid = () => cy.get('[data-testid="product-grid"]')



    //pocet polozek v kosiku
    cartCount = () => cy.get('[data-testid="cart-count"]')

    //message o pridani produktu do kosiku
    addedProductMessage = () => cy.get('li[data-type="success"]')


}

