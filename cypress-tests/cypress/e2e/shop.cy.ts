import menuComponent, { MenuItem } from "../components/menuComponent";
import shopPage from "../pages/shopPage";
import ProductComponent from "../components/productComponent";
import CartProductComponent from "../components/cartProductComponent";

interface DogProduct {
    id: string
    name: string
    price: string
}

describe('Shop tests', () => {

    //Arrange
    beforeEach(() => {
        cy.visit('/')
        menuComponent.navigate(MenuItem.SHOP)
    })

    it('should validate all html elemets on shop page', () => {

        //Assert
        shopPage.shopTitle().should('be.visible').and('contain', 'Nabídka štěňátek')
        shopPage.productGrid().should('be.visible')

        //kazdy z jednotlivych prvku gridu ma vsechny udaje jako nazev, obrazek, cenu a tlacitka detail a pridat
        cy.fixture<DogProduct[]>('dogProducts.json').then((dogProducts) => {
            dogProducts.forEach((product) => {
                const productId = product.id
                cy.verifyProductStructure(productId)
            })
        })
    });


    it('should add item to cart with add to cart button', () => {

        //Act
        cy.fixture('dogProducts.json').then((dogProducts) => {
            const product = dogProducts[0]
            const productDog = new ProductComponent(product.id)
            productDog.addToCart()

            //Assert
            shopPage.addedProductMessage().should('be.visible').and('contain', product.name + ' přidán/a do košíku')
            shopPage.cartCount().should('have.text', '1')

            //Assert na spravny produkt v kosiku
            menuComponent.navigate(MenuItem.CART)
            const cartProduct = new CartProductComponent(product.id)
            cartProduct.cartProductName().should('contain.text', product.name)
            cartProduct.cartProductPrice().should('contain.text', product.price + " Kč")

        })

    });

    it('should open detail with open detail button', () => {

        //Act
        cy.fixture('dogProducts.json').then((dogProducts) => {
            const productName = dogProducts[1]
            const productDog = new ProductComponent(productName.id)
            productDog.clickOnDetail()

            //Assert
            cy.url().should('eq', `https://puppy-shop-automation-test.lovable.app/shop/${productName.id}`)

        })



    });

});



