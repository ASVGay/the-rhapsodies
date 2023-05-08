const { relative } = require("path")
const relativeFileNames = (fileNames) =>
  `${fileNames.map((f) => relative(process.cwd(), f)).join(" --file ")}`

module.exports = {
  // This will check Typescript files
  "**/*.(ts|tsx)": () => "npx tsc --noEmit",

  // This will lint and format TypeScript and JavaScript files
  "**/*.{js,jsx,ts,tsx}": (filenames) => [
    `next lint --fix --file ${relativeFileNames(filenames)}`,
    `npx prettier --write ${filenames.join(" ")}`,
  ],

  // This will format MarkDown and JSON
  "**/*.(md|json)": (filenames) =>
    `npx prettier --write ${filenames.join(" ")}`,
}
