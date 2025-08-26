export default class ProductComponent {
    private productId: string
    constructor(productId: string) {
        this.productId = productId

    }


    productWrapper = () => cy.get(`[data-testid="product-card-${this.productId}"]`)
    productTitle = () => this.productWrapper().find(`[data-testid="product-link-${this.productId}"]`)
    productImage = () => this.productWrapper().find(`[data-testid="product-image-${this.productId}"]`)
    productPrice = () => this.productWrapper().find(`[data-testid="product-price-${this.productId}"]`)
    productDetailButton = () => this.productWrapper().find(`[data-testid="product-detail-${this.productId}"]`)
    productAddToCartButton = () => this.productWrapper().find(`[data-testid="add-to-cart-${this.productId}"]`)

    addToCart() {
        this.productAddToCartButton().click()
    }

    clickOnDetail() {
        this.productDetailButton().click()
    }

}