export default new class RequestPage {
    //selektory
    requestTitle = () => cy.get('[data-testid="request-title"]')

    formWrapper = () => cy.get('[data-testid="request-form"]')

    nameInput = () => this.formWrapper().find('[data-testid="input-name"]')
    emailInput = () => this.formWrapper().find('[data-testid="input-email"]')
    phoneNumberInput = () => this.formWrapper().find('[data-testid="input-phone"]')
    breedInput = () => this.formWrapper().find('[data-testid="input-breed"]')
    budgetInput = () => this.formWrapper().find('[data-testid="input-budget"]')
    messageInput = () => this.formWrapper().find('[data-testid="textarea-message"]')

    dogSizeInput = () => this.formWrapper().find('[data-testid="select-size"]')
    dogSizeSmall = () => cy.contains('span', 'Malé')
    dogSizeMiddle = () => cy.contains('span', 'Střední')
    dogSizeBid = () => cy.contains('span', 'Velké')

    dogExperience = () => this.formWrapper().find('[data-testid="select-experience"]')
    dogExperienceBeginner = () => cy.contains('span', 'Začátečník')
    dogExperienceIntermediate = () => cy.contains('span', 'Pokročilý')
    dogExperienceExpert = () => cy.contains('span', 'Expert')

    calendar = () => this.formWrapper().find('[data-testid="datepicker-trigger"]')
    calendarDay = () => cy.get('button[name="day"]')
    calendarNextMonth = () => cy.get('button[name="next-month"]')

    dogGenderFemale = () => this.formWrapper().find('[data-testid="gender-female"]')
    dogGenderMale = () => this.formWrapper().find('[data-testid="gender-male"]')
    dogGenderNoPreference = () => this.formWrapper().find('[data-testid="gender-no-preference"]')

    dogTemperamentFriendly = () => this.formWrapper().find('[data-testid="checkbox-friendly"]')
    dogTemperamentActive = () => this.formWrapper().find('[data-testid="checkbox-active"]')
    dogTemperamentCalm = () => this.formWrapper().find('[data-testid="checkbox-calm"]')
    dogTempramentHypoallergenic = () => this.formWrapper().find('[data-testid="checkbox-hypoallergenic"]')

    chooseImageButton = () => this.formWrapper().find('[data-testid="request-photo"]')


    submitButton = () => this.formWrapper().find('[data-testid="request-submit"]')
    resetButton = () => this.formWrapper().find('[data-testid="request-reset"]')

    submitSuccessMessage = () => cy.get('[data-testid="request-message"]')

    confirmationWrapper = () => cy.get('[data-testid="confirmation-dialog"]')
    confirmationCancelButton = () => this.confirmationWrapper().find('[data-testid="confirmation-cancel"]')
    confirmationSubmitButton = () => this.confirmationWrapper().find('[data-testid="confirmation-confirm"]')


    //funkce
    submitForm() {
        this.submitButton().click({ force: true })
    }

    resetForm() {
        this.resetButton().click({ force: true })
    }

    submitConfirmation() {
        this.confirmationSubmitButton().click({ force: true })
    }

    cancelConfirmation() {
        this.confirmationCancelButton().click({ force: true })
    }

    submitRequest() {
        this.submitForm()
        this.submitConfirmation()
    }


    fillForm(data: FormData) {
        this.nameInput().clear().type(data.name)
        this.emailInput().clear().type(data.email)

        if (data.phoneNumber) {
            this.phoneNumberInput().clear().type(data.phoneNumber)
        }

        if (data.breed) {
            this.breedInput().clear().type(data.breed)
        }

        if (data.budget) {
            this.budgetInput().clear().type(data.budget)
        }

        if (data.message) {
            this.messageInput().clear().type(data.message)
        }

        if (data.dogSize) {
            this.dogSizeInput().click()

            switch (data.dogSize) {
                case DogSize.Male:
                    this.dogSizeSmall().click()
                    break
                case DogSize.Stredni:
                    this.dogSizeMiddle().click()
                    break
                case DogSize.Velke:
                    this.dogSizeBid().click()
                    break
                default:
                    throw new Error(`Unknown dog size: ${data.dogSize}`)
            }
        }

        if (data.experience) {
            this.dogExperience().click()

            switch (data.experience) {
                case Experience.Zacatecnik:
                    this.dogExperienceBeginner().click({ force: true })
                    break
                case Experience.Pokrocily:
                    this.dogExperienceIntermediate().click({ force: true })
                    break
                case Experience.Expert:
                    this.dogExperienceExpert().click({ force: true })
                    break
                default:
                    throw new Error(`Unknown experience: ${data.experience}`)
            }
        }

        if (data.date) {
            this.calendar().click()
            this.calendarNextMonth().click()
            this.calendarDay().contains(data.date).click()
        }

        switch (data.gender) {
            case GenderItem.Fenka:
                this.dogGenderFemale().click()
                break
            case GenderItem.Pes:
                this.dogGenderMale().click()
                break
            case GenderItem.Nezalezi:
                this.dogGenderNoPreference().click()
                break
            default:
                throw new Error(`Unknown gender ${data.gender}`);

        }

        if (data.temperament) {
            data.temperament.forEach((temperament: TemperamentItem) => {
                switch (temperament) {
                    case TemperamentItem.Aktivni:
                        this.dogTemperamentActive().click()
                        break
                    case TemperamentItem.Pratelsky:
                        this.dogTemperamentFriendly().click()
                        break
                    case TemperamentItem.Klidny:
                        this.dogTemperamentCalm().click()
                        break
                    case TemperamentItem.Hypoalergenni:
                        this.dogTempramentHypoallergenic().click()
                        break
                    default: throw new Error(`Unknown temperament ${temperament}`);
                }
            })
        }

        this.chooseImageButton().selectFile('cypress/fixtures/' + data.imagePath)


    }

}

export interface FormData {
    name: string,
    email: string,
    phoneNumber?: string,
    breed?: string,
    dogSize: DogSize,
    experience: Experience,
    date: string,
    gender?: GenderItem,
    temperament?: TemperamentItem[]
    budget?: string,
    imagePath?: string
    message?: string,
}

export enum DogSize {
    Male = 'Malé',
    Stredni = 'Střední',
    Velke = 'Velké'
}

export enum Experience {
    Zacatecnik = 'Začátečník',
    Pokrocily = 'Pokročilý',
    Expert = 'Expert'
}

export enum GenderItem {
    Fenka = 'Fenka',
    Pes = 'Pes',
    Nezalezi = 'Nezáleží'

}

export enum TemperamentItem {
    Pratelsky = 'Přátelský',
    Aktivni = 'Aktivní',
    Klidny = 'Klidný',
    Hypoalergenni = 'Hypoalergenní'

}