import { collection, getDocs } from "firebase/firestore"
import { ISuggestion } from "@/interfaces/suggestion"
import { doc, getDoc, updateDoc } from "@firebase/firestore"

export const getSuggestions = async (): Promise<ISuggestion[]> => {
  // TODO Enter logic to get suggestions
  // const querySnapshot = await getDocs(collection(db, "suggestions"))
  //
  // const suggestions: ISuggestion[] = []
  // querySnapshot.forEach((doc) => {
  //   const suggestion = doc.data() as ISuggestion
  //   suggestion.id = doc.id
  //   suggestions.push(suggestion)
  // })
  //
  // return suggestions
  return Promise.reject("Some Error Message")
}

export const getSuggestion = async (id: string): Promise<ISuggestion> => {
  // TODO Enter logic to get a singular suggestion
  // const querySnapshot = await getDoc(doc(db, "suggestions", id))
  // return {
  //   ...querySnapshot.data(),
  //   id: querySnapshot.id,
  //   date: querySnapshot.data()?.date.toDate(),
  // } as ISuggestion
  return Promise.reject("Some Error Message")
}

export const updateSuggestion = (suggestion: ISuggestion) => {
  // TODO Enter logic to update a suggestion (or just the division)
  // return updateDoc(doc(db, "suggestions", suggestion.id), {
  //   roles: suggestion.roles,
  // })
  return Promise.reject("Some Error Message")
}
