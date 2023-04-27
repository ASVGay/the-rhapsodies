import {User, UserCredential} from "firebase/auth";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "@/firebase/config";
import {IAditionalUserData} from "@/interfaces/User";

export const getAditionalUserData = async (user: User) => {
    const userDocRef = doc(db, "users", user.uid);
    const res = await getDoc(userDocRef);
    return res.data() as IAditionalUserData;
}