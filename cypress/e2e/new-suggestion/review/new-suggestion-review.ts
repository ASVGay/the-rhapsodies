import { Area } from "@/constants/area"
import { areaInStateShouldBe } from "../new-suggestion"

const instrumentsArea = "area-instruments"
const areaSongInformation = "area-song-information"
const toReviewButton = "to-review-button"

export const shouldGoToReviewArea = () => {
  cy.data(toReviewButton).click()
  cy.data(instrumentsArea).should("not.exist")
  cy.data(areaSongInformation).should("not.exist")
  areaInStateShouldBe(Area.Review)
}
