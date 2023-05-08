import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ISuggestion } from "@/interfaces/Suggestion";

export const getSuggestions = async (): Promise<ISuggestion[]> => {
    const querySnapshot = await getDocs(collection(db, "suggestions"))

    const suggestions = []
    querySnapshot.forEach(doc => suggestions.push(doc.data()))

    return suggestions
}