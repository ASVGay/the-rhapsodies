import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ISuggestion } from "@/interfaces/Suggestion";

export const getSuggestions = async (): Promise<ISuggestion[]> => {
    const querySnapshot = await getDocs(collection(db, "suggestions"))

    const suggestions: ISuggestion[] = []
    querySnapshot.forEach(doc => suggestions.push(<ISuggestion>doc.data()))

    return suggestions
}