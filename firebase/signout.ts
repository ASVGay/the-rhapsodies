import {getAuth, signOut} from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export default async function signOutUser() {
    try {
        return await signOut(auth);
    } catch (e) {
        return e;
    }
}