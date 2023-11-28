import { mount } from "cypress/react18"
import { User } from "./user.enum"

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
       * @param user The user to log in as, defaults to User.ADMIN
       */
      login(user?: User): void

      /**
       * Custom command to log out through Supabase
       */
      logout(): void

      /**
       * Custom command to delete the new user from the member database
       *
       */
      deleteNewUser(): void
    }
  }
}

export {}
