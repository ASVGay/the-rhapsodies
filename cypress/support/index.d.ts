import { mount } from "cypress/react18"

declare global {
  namespace Cypress {
    interface Chainable {
      /** Custom command to mount a component
       * @example cy.mount(<Component />)
       */
      mount: typeof mount

      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.data('greeting')
       */
      data(value: string): Chainable<JQuery<HTMLElement>>

      /**
       * Custom command to log in through Supabase
       * @param useNewUser whether to use a new user for logging in or not
       */
      login(useNewUser?: boolean)

      /**
       * Custom command to log out through Supabase
       */
      logout()

      /**
       * Custom command to delete the new user from the member database
       *
       */
      deleteNewUser()
    }
  }
}

export {}
