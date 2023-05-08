import { User } from "firebase/auth"
import { doc, getDoc } from "@firebase/firestore"
import { db } from "@/firebase/config"
import { IAditionalUserData } from "@/interfaces/User"

export const getAditionalUserData = async (user: User) => {
  const userDocument = getUserDocument(user)
  const res = await getDoc(userDocument)
  return res.data() as IAditionalUserData
}

export const getUserDocument = (user: User) => {
  return doc(db, "users", user.uid)
}
