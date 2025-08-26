import menuComponent, { MenuItem } from "../components/menuComponent";
import shopPage from "../pages/shopPage";
import ProductComponent from "../components/productComponent";


describe('Shop tests', () => {

    //Arrange
    beforeEach(() => {
        cy.visit('/')
        menuComponent.navigate(MenuItem.SHOP)
    })

    it('should validate all html elemets on shop page', () => {

        //kazdy z jednotlivych ctverecku gridu 
        // ma jednotlive parametry jako nazev, obrazek, popis
        cy.fixture('dogProducts.json').then((dogProducts: string[]) => {
            dogProducts.forEach((product) => {
                cy.verifyProductStructure(product)
            })
        })


    });

    it('should add item to cart with add to cart button', () => {

        //const productName = 'golden-1'

        cy.fixture('dogProducts.json').then((dogProducts: string[]) => {
            const productName = dogProducts[0]
            const productDog = new ProductComponent(productName)
            productDog.addToCart()

        })

        //Assert
        shopPage.addedProductMessage().should('be.visible')
        shopPage.cartCount().should('have.text', '1')

    });

    it('should open detail with open detail button', () => {

        cy.fixture('dogProducts.json').then((dogProducts: string[]) => {
            const productName = dogProducts[1]
            const productDog = new ProductComponent(productName)
            productDog.clickOnDetail()


            //Assert - ze naviguje na stranku tohoto daneho produktu
            //https://puppy-shop-automation-test.lovable.app/shop/collie-1

            cy.url().should('eq', `https://puppy-shop-automation-test.lovable.app/shop/${productName}`)


        })



    });

});



