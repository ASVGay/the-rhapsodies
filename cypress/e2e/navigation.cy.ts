type NavigationItem = {
    path: string,
    text: string
}

describe('navigation components', () => {
    const topNavigation: string = '.top-navigation';
    const bottomNavigation: string = '.bottom-navigation';
    const pages: NavigationItem[] = [
        {
            path: "/",
            text: "Home"
        },
        // {
        //     path: "/repertoire",
        //     text: "Repertoire"
        // },
        {
            path: "/suggestions",
            text: "Suggestions"
        },
        // {
        //     path: "/events",
        //     text: "Events"
        // },
        // {
        //     path: "/settings",
        //     text: "Settings"
        // },
    ]

    context('when logged out', () => {
        it('should not render navigation on devices with a width of >=1024', () => {
            cy.viewport(1024, 768)
            cy.logout()
            cy.visit('/')
            cy.get(topNavigation).should('not.be.exist')
            cy.get(bottomNavigation).should('not.be.exist')
        })

        it('should not render bottom navigation on devices with a width of <1024', () => {
            cy.viewport(768, 1024)
            cy.logout()
            cy.visit('/')
            cy.get(topNavigation).should('not.be.exist')
            cy.get(bottomNavigation).should('not.be.exist')
        })
    })

    context('when logged in', () => {
        before(() => {
            cy.login()
        })

        context('on devices with a width of >=1024', () => {
            beforeEach(() => {
                cy.viewport(1024, 768)
            })

            it('should render top navigation', () => {
                cy.visit('/')
                cy.get(topNavigation).should('be.visible')
                cy.get(bottomNavigation).should('not.be.visible')
            })

            it('should be able to navigate to all pages', function () {
                cy.visit('/')
                pages.forEach(page => {
                    cy.get(topNavigation).contains(page.text).click()
                    cy.location('pathname').should('equal', page.path)
                })
            });
        })

        context('on devices with a width of <1024', () => {
            beforeEach(() => {
                cy.viewport(768, 1024)
            })

            it('should render bottom navigation', () => {
                cy.visit('/')
                cy.get(topNavigation).should('not.be.visible')
                cy.get(bottomNavigation).should('be.visible')
            })

            it('should be able to navigate to all pages', function () {
                cy.visit('/')
                pages.forEach(page => {
                    cy.get(bottomNavigation).contains(page.text).click()
                    cy.location('pathname').should('equal', page.path)
                })
            });
        })
    })
})