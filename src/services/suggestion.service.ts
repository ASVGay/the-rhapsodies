import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import { ISuggestion } from "@/interfaces/suggestion"
import { doc, getDoc, Timestamp, updateDoc } from "@firebase/firestore"

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
  const data = querySnapshot.data() as ISuggestion
  data.id = querySnapshot.id
  if (data.date instanceof Timestamp) {
    data.date = data.date.toJSON()
  }

  return data
}

export const updateSuggestion = async (suggestion: ISuggestion) => {
  await updateDoc(doc(db, "suggestions", suggestion.id), {
    roles: suggestion.roles,
  })

  return {
    id: suggestion.id,
    artists: suggestion.artists,
    date: suggestion.date,
    motivation: suggestion.motivation,
    roles: suggestion.roles,
    title: suggestion.title,
    user: suggestion.user,
  }
}
