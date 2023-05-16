require("dotenv").config()
import createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
import admin = require("firebase-admin")
import PluginConfigOptions = Cypress.PluginConfigOptions
import { defineConfig } from "cypress"
import { plugin as cypressFirebasePlugin } from "cypress-firebase"

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      on("file:preprocessor", createBundler())
      config.env = {
        ...process.env,
        ...config.env,
      }
      // e2e testing node events setup code
      return cypressFirebasePlugin(on, config, admin, {
        // Here is where you can pass special options.
        // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
        //    databaseURL: 'some-project-default-rtdb.europe-west1.firebasedatabase.app',
      }) as PluginConfigOptions
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
