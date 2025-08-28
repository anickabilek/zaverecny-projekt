import homePage from "../pages/homePage";
import menuComponent, { MenuItem } from "../components/menuComponent";
import shopPage from "../pages/shopPage";
import ProductComponent from "../components/productComponent";
import cartPage from "../pages/cartPage";
import checkoutPage, { CheckoutFormData, Payment } from "../pages/checkoutPage";
import { faker } from '@faker-js/faker';

describe('Checkout process', () => {

    it('should add product to cart and finish checkout process', () => {

        //Arrange
        cy.visit('/')

        //Act
        homePage.shopButton().click()

        cy.fixture('dogProducts.json').then((dogProducts) => {
            const product = dogProducts[0]
            const productDog = new ProductComponent(product.id)
            productDog.addToCart()
        })

        menuComponent.navigate(MenuItem.CART)

        cartPage.cartCheckoutButton().click()

        const data: CheckoutFormData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address: faker.location.streetAddress(),
            zipCode: faker.location.zipCode('#####'),
            payment: Payment.HotovePriPrevzeti,

        }

        checkoutPage.fillCheckoutForm(data)
        checkoutPage.checkout()


        //Assert
        checkoutPage.confiramtionDialog().should('be.visible').and('contain', 'Objednávka odeslána! 🎉')
        shopPage.cartCount().should('not.exist')

    });

});