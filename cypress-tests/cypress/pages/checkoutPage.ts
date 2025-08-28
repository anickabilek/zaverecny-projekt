export default new class CheckoutPage {

    checkoutFormWrapper = () => cy.get('[data-testid="checkout-form"]')
    checkoutFirstNameInput = () => this.checkoutFormWrapper().find('[data-testid="checkout-firstname"]')
    checkoutLastNameInput = () => this.checkoutFormWrapper().find('[data-testid="checkout-lastname"]')
    checkoutAddressInput = () => this.checkoutFormWrapper().find('[data-testid="checkout-address"]')
    checkoutZipCodeInput = () => this.checkoutFormWrapper().find('[data-testid="checkout-zipcode"]')
    checkoutPaymentCart = () => this.checkoutFormWrapper().find('[data-testid="payment-card"]')
    checkoutPaymentBank = () => this.checkoutFormWrapper().find('[data-testid="payment-bank"]')
    checkoutPaymentCash = () => this.checkoutFormWrapper().find('[data-testid="payment-cash"]')
    checkouBackButton = () => this.checkoutFormWrapper().find('[data-testid="checkout-back"]')
    checkoutSubmitButton = () => this.checkoutFormWrapper().find('[data-testid="checkout-submit"]')

    checkoutConfirmationDialogWrapper = () => cy.get('[data-testid="checkout-confirmation-dialog"]')
    confirmationCancelButton = () => this.checkoutConfirmationDialogWrapper().find('[data-testid="checkout-confirmation-cancel"]')
    confirmationSubmitButton = () => this.checkoutConfirmationDialogWrapper().find('[data-testid="checkout-confirmation-confirm"]')

    confiramtionDialog = () => cy.get('[data-testid="order-success"]')

    fillCheckoutForm(data: CheckoutFormData) {
        this.checkoutFirstNameInput().clear().type(data.firstName)
        this.checkoutLastNameInput().clear().type(data.lastName)
        this.checkoutAddressInput().clear().type(data.address)
        this.checkoutZipCodeInput().clear().type(data.zipCode)

        switch (data.payment) {
            case Payment.PlatebniKarta:
                this.checkoutPaymentCart().click()
                break
            case Payment.BankovniPrevod:
                this.checkoutPaymentBank().click()
                break
            case Payment.HotovePriPrevzeti:
                this.checkoutPaymentCash().click()
                break
            default:
                throw new Error(`Unknown payment type: ${data.payment}`)
        }

    }

    checkout() {
        this.checkoutSubmitButton().click()
        this.confirmationSubmitButton().click()
    }



}

export interface CheckoutFormData {
    firstName: string,
    lastName: string,
    address: string,
    zipCode: string,
    payment: Payment
}

export enum Payment {
    PlatebniKarta = "Platební karta",
    BankovniPrevod = "Bankovní převod",
    HotovePriPrevzeti = "Hotově při převzetí"
}

