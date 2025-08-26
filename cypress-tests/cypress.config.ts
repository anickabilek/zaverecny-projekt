import { defineConfig } from "cypress";
import { readFileSync } from "fs";

export default defineConfig({
  watchForFileChanges: false,
  projectId: "o8u3es",
  e2e: {
    baseUrl: 'https://puppy-shop-automation-test.lovable.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const loginData = readFileSync("cypress/fixtures/loginData.json", "utf-8")
      const loginDataParsed = JSON.parse(loginData)
      config.env = { ...loginDataParsed }

      return config
    },
  },
});
