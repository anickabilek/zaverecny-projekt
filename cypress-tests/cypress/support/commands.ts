/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import ProductComponent from "../components/productComponent";

export { }
declare global {
    namespace Cypress {
        interface Chainable {
            verifyProductStructure(productId: string): Chainable<void>

        }
    }
}

//custom command na assert jednotlivych polozek produktu v gridu produktu
Cypress.Commands.add('verifyProductStructure', (productId: string) => {
    const product = new ProductComponent(productId)

    product.productTitle().should('be.visible')
    product.productImage().should('be.visible')
    product.productPrice().should('be.visible')
    product.productDetailButton().should('be.visible')
    product.productAddToCartButton().should('be.visible')
})


