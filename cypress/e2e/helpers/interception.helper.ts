import { HttpResponseInterceptor, RouteMatcher, StaticResponse } from "cypress/types/net-stubbing"

/**
 * Intercept a response until you call [object].sendResponse() on it
 * @param requestMatcher request matcher (same as Cypress)
 * @param response response to be sent
 */
export function interceptIndefinitely(
  requestMatcher: RouteMatcher,
  response?: StaticResponse | HttpResponseInterceptor
): { sendResponse: () => void } {
  let sendResponse
  const trigger = new Promise((resolve) => {
    sendResponse = resolve
  })
  cy.intercept(requestMatcher, (request) => {
    return trigger.then(() => {
      request.reply(response)
    })
  })
  return { sendResponse }
}
