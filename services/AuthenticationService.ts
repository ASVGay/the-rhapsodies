import {getAuth, signInWithEmailAndPassword, signOut, updatePassword, User} from "firebase/auth";
import {doc, getDoc, setDoc, updateDoc} from "@firebase/firestore";
import firebase_app, {db} from "@/firebase/config";
import {IAdditionalUserData} from "@/interfaces/User";

const auth = getAuth(firebase_app);
export const signInUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser =  () => {
    return signOut(auth);
}

export const changePassword = async (password: string, user: User) => {
    const documentRef = getUserDocument(user);
    await updatePassword(auth.currentUser as User, password);
    await updateDoc(documentRef, {isFirstLogin: false})
    await signOutUser();
}

export const getAditionalUserData = async (user: User) => {
    const userDocument = getUserDocument(user);
    const res = await getDoc(userDocument);
    return res.data() as IAdditionalUserData;
}

export const setAdditionalUserData =  (additionalUserData: IAdditionalUserData, user: User) => {
    return setDoc(getUserDocument(user), additionalUserData)
}

export const getUserDocument = (user: User) => {
    return doc(db, "users", user.uid);
}