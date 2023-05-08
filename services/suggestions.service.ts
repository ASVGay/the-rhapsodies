import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import { ISuggestion } from "@/interfaces/Suggestion"

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
