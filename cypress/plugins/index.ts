import {
  deleteNewUser,
  getUserSession,
  giveUserAdminPrivileges,
  removeUserAdminPrivileges,
} from "./tasks"

module.exports = (on, config) => {
  on("task", {
    getUserSession,
    deleteNewUser,
    removeUserAdminPrivileges,
    giveUserAdminPrivileges,
  })

  return config
}
