/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getSbToken = () =>
  `sb-${Cypress.env("NEXT_PUBLIC_SUPABASE_URL").match(/(\w+)\./)[1]}-auth-token`

Cypress.Commands.add("data", (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add("login", (useNewUser: boolean = false) => {
  let user = "ADMIN"
  if (useNewUser) user = "NEW"
  cy.task("getUserSession", {
    email: Cypress.env(`CYPRESS_${user}_EMAIL`),
    password: Cypress.env(`CYPRESS_${user}_PASSWORD`),
  }).then((sessionData) => {
    cy.setCookie(getSbToken(), JSON.stringify(sessionData))
  })
})

Cypress.Commands.add("logout", () => {
  cy.setCookie(getSbToken(), "")
})

const executeTask = (taskName: string) => {
  return cy.task(taskName).then((response: PostgrestSingleResponse<null>) => {
    cy.log(JSON.stringify(response))
    if (response.error) {
      throw new Error(response.error.message)
    }
  })
}

Cypress.Commands.add("deleteNewUser", () => {
  return executeTask("deleteNewUser")
})
