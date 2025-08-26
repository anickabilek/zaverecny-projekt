import homePage from "../pages/homePage"
import menuComponent, { MenuItem } from "../components/menuComponent"


describe('Home Page tests', () => {

  //Arrange
  beforeEach(() => {
    cy.visit('/')
    menuComponent.navigate(MenuItem.HOME)
  })

  it('should validate all html element on home page are visible', () => {

    //Act
    homePage.logo().should('be.visible')

    //Assert


  })

  it('should validate request button on home page', () => {

    //Act
    homePage.requestButton().click()

    //Assert


  })

  it('should validate shop button on home page', () => {

    //Act
    homePage.shopButton().click()

    //Assert
  });;



})