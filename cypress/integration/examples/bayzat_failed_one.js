/// <reference types="cypress" />

context('Bayzat Test', () => {
    beforeEach(() => {
        cy.visit('https://www.bayzat.com/')
    })

    it('login, create user. delete created user and logout', () => {

        // find login button and click
        cy.get('a[href*="/profile/login"]').click()

        // fill form and click submit
        cy.get('#ember12-field').type(' test+testcompany@bayzat.com')

        cy.get('#ember13-field').type('123456789')

        cy.get('#ember16').click()


        cy.location('pathname', {timeout: 60000})
            .should('include', '/enterprise/dashboard/index');

        // click on view employees
        cy.get('#ember145').click()
        cy.wait(1500)

        // open add employee page
        cy.get('a[href*="/enterprise/dashboard/import-users"]').click()

        cy.wait(1500)
        cy.get('a[href*="/enterprise/dashboard/employees/create"]').click()
        cy.wait(1500)


        // fill user data and create user
        cy.get('label').contains('First Name').siblings().type('yakup oğuzhan')
        cy.get('label').contains('Last Name').siblings().type('kaya')
        cy.get('label').contains('Work Email').siblings().type('yakupoguzhankaya2@gmail.com')
        cy.get('button').contains('Create').click()
        cy.wait(1500)

        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('typeerror')

            // using mocha's async done callback to finish
            // this test so we prove that an uncaught exception
            // was thrown
            done()

            // return false to prevent the error from
            // failing this test
            return false
        })
        // open team page again
        cy.get('span').contains('View Team').click()

        // type user name to filter
        cy.wait(2000)
        cy.get('.search > :nth-child(2)').type('yakup oğuzhan kaya')
        //check data is there
        cy.wait(2000)
        cy.get('tbody > :nth-child(1) > :nth-child(3) > span').should('contain.text', 'Yakup Oğuzhan Kaya')
        cy.get('tbody > :nth-child(1) > :nth-child(1) > i').click()
        cy.get('.col-12 > :nth-child(2)').click()
        cy.get('button').contains('Confirm').click()
        cy.get('span').contains('Logout').click()

        cy.url().should('eq', 'https://www.bayzat.com')



    })
})
