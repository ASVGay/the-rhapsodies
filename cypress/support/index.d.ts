declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.data('greeting')
       */
      data(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

export {}
