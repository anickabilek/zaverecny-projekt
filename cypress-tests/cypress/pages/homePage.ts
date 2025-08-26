export default new class HomePage {

    wrapper = () => cy.get('[data-testid="hero"]')
    logo = () => this.wrapper().find('[data-testid="hero-logo"]')
    title = () => this.wrapper().find('[data-testid="hero-title"]')
    subtitle = () => this.wrapper().find('[data-testid="hero-subtitle"]')
    shopButton = () => this.wrapper().find('[data-testid="cta-go-shop"]')
    requestButton = () => this.wrapper().find('[data-testid="cta-request"]')


}