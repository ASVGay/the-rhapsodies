require("dotenv").config()
import { defineConfig } from "cypress"

const tasks = require("./cypress/plugins/index")

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      tasks(on, config)
    },
    experimentalRunAllSpecs: true,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
