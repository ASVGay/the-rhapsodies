import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export const getSuggestions = async () => {
    const querySnapshot = await getDocs(collection(db, "suggestions"))

    const suggestions = []
    querySnapshot.forEach(doc => suggestions.push(doc.data()))

    return suggestions
}