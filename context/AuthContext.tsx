import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    AuthError,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential
} from 'firebase/auth';
import firebase_app, {db} from '@/firebase/config';
import {doc, DocumentData, getDoc, setDoc} from "@firebase/firestore";
import firebase from "firebase/compat";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {getAditionalUserData} from "@/util/auth/AuthHelpers";
import {IAditionalUserData} from "@/interfaces/User";

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null,
    signInUser: (email: string, password: string) => Promise<UserCredential>,
    signOutUser: () => void,
    handleFirstSignInUser: (user: UserCredential) => Promise<void>;
}

const setFirstLogin = async (user: UserCredential) => {
    const isLoggedIn = await getAditionalUserData(user);
}

const signInUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

const handleFirstSignInUser = async (user: UserCredential) => {
    const userDocRef = doc(db, "users", user.user.uid);
    const userDoc = await getDoc(userDocRef);
    const userData: IAditionalUserData = {
        isFirstLogin: true
    }

    if(!userDoc.exists()) {
        return await setDoc(userDocRef, userData);
    }
}


const signOutUser = async () => {
    return await signOut(auth);
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signInUser: signInUser,
    signOutUser: signOutUser,
    handleFirstSignInUser: handleFirstSignInUser,
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [isFirstLogin, setIsFirstLogin] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, signInUser, signOutUser, handleFirstSignInUser}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;