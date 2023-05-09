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
    }
  }
}

export {}
