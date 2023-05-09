import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import { ISuggestion } from "@/interfaces/Suggestion"
import { doc, getDoc, updateDoc } from "@firebase/firestore";

export const getSuggestions = async (): Promise<ISuggestion[]> => {
  const querySnapshot = await getDocs(collection(db, "suggestions"))

  const suggestions: ISuggestion[] = []
  querySnapshot.forEach((doc) => {
    const suggestion = doc.data() as ISuggestion
    suggestion.id = doc.id
    suggestions.push(suggestion)
  })

  return suggestions
}

export const getSuggestion = async (id: string): Promise<ISuggestion> => {
  const querySnapshot = await getDoc(doc(db, "suggestions", id))
  return querySnapshot.data() as ISuggestion
}

export const updateSuggestion = async (suggestion: ISuggestion) => {
  // return {
  //   id: suggestion.id,
  //   artists: suggestion.artists,
  //   motivation: suggestion.motivation,
  //   roles: suggestion.roles,
  //   title: suggestion.title,
  //   user: suggestion.user
  // }

  // console.log(suggestion.id)
  // const washingtonRef = doc(db, "suggestions", suggestion.id);
  //
  // await updateDoc(washingtonRef, {
  //   roles: suggestion.roles,
  // });
}
