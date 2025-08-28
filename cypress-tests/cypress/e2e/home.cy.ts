import homePage from "../pages/homePage"
import menuComponent, { MenuItem } from "../components/menuComponent"


describe('Home Page tests', () => {

  //Arrange
  beforeEach(() => {
    cy.visit('/')
    menuComponent.navigate(MenuItem.HOME)
  })


  it('should validate all html element on home page are visible', () => {

    //Assert
    homePage.logo().should('be.visible')
    homePage.title().should('be.visible').and('contain', 'Eshop štěňátek')
    homePage.subtitle().should('be.visible')
    homePage.shopButton().should('be.visible').and('have.attr', 'href')
    homePage.requestButton().should('be.visible').and('have.attr', 'href')

  })

  it('should validate request button on home page', () => {

    //Act
    homePage.requestButton().click()

    //Assert
    cy.url().should('include', '/request')



  })

  it('should validate shop button on home page', () => {

    //Act
    homePage.shopButton().click()

    //Assert
    cy.url().should('include', '/shop')
  })



})