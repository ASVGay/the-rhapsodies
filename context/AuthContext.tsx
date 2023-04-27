import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential
} from 'firebase/auth';
import firebase_app, {db} from '@/firebase/config';
import {doc, getDoc, setDoc} from "@firebase/firestore";
import firebase from "firebase/compat";
import {getAditionalUserData} from "@/util/auth/AuthHelpers";
import {IAditionalUserData} from "@/interfaces/User";

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null,
    signInUser: (email: string, password: string) => Promise<UserCredential>,
    signOutUser: () => void,
    handleFirstSignInUser: (user: UserCredential) => Promise<void>,
    isFirstLogin: boolean | undefined;
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

    if (!userDoc.exists()) {
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
    isFirstLogin: undefined
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isFirstLogin, setIsFirstLogin] = useState<boolean | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true);

    const setFirstLogin = async (user: User | null)  => {
        if (user) {
            const additionalUserData = await getAditionalUserData(user);
            setIsFirstLogin(additionalUserData.isFirstLogin)
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setFirstLogin(user)
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, signInUser, signOutUser, handleFirstSignInUser, isFirstLogin}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;