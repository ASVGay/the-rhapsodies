import { getUserSession } from "./tasks"

module.exports = (on, config) => {
  on("task", {
    getUserSession,
  })

  return config
}
