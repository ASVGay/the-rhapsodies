import { deleteNewUser, getUserSession } from "./tasks"

module.exports = (on, config) => {
  on("task", {
    getUserSession,
    deleteNewUser,
  })

  return config
}
