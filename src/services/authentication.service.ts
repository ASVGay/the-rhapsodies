import { IAdditionalUserData } from "@/interfaces/user"

export const signInUser = (email: string, password: string) => {
  // TODO Enter logic to sign in user
  return Promise.reject("Some Error Message")
}

export const signOutUser = () => {
  // TODO Enter logic to sign user out
  return Promise.reject("Some Error Message")
}

export const updateName = async (name: string) => {
  // TODO Enter logic to  update display name
  return Promise.reject("Some Error Message")
}

export const changePassword = async (password: string) => {
  // TODO Enter logic to change password
  // const documentRef = getUserDocument(user)
  // await updatePassword(auth.currentUser as User, password)
  // await updateDoc(documentRef, {isFirstLogin: false})
  // await signOutUser()
}

export const getAdditionalUserData = async () => {
  // TODO Enter logic to retrieve additional user data
  // const userDocument = getUserDocument(user)
  // const res = await getDoc(userDocument)
  // return res.data() as IAdditionalUserData
  return Promise.reject("Some Error Message")
}

export const setAdditionalUserData = (additionalUserData: IAdditionalUserData) => {
  // TODO Enter logic to set additional user data?
  // return setDoc(getUserDocument(user), additionalUserData)
  return Promise.reject("Some Error Message")
}

export const getUserDocument = () => {
  // TODO Enter logic to get user document
  // return doc(db, "users", user.uid)
}
