import {UserCredential} from "firebase/auth";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "@/firebase/config";

export const getAditionalUserData = async (user: UserCredential) => {
    const userDocRef = doc(db, "users", user.user.uid);
    return await getDoc(userDocRef);
}