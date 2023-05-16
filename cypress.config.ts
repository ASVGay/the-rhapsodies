require("dotenv").config()
import { defineConfig } from "cypress"

const tasks = require("./cypress/plugins/index")

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 1000 * parseInt(process.env.CYPRESS_TIMEOUT_SECONDS || "12"),
    baseUrl: process.env.CYPRESS_BASE_URL,
    retries: {
      runMode: parseInt(process.env.CYPRESS_RETRY_MODE_RUN || "0"),
    },
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
