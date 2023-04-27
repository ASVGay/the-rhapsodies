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

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null,
    signInUser: (email: string, password: string) => Promise<UserCredential>,
    signOutUser: () => void,
    handleFirstSignInUser: (user: UserCredential) => Promise<void>;
}

const signInUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

const handleFirstSignInUser = async (user: UserCredential) => {
    const userDocRef = doc(db, "users", user.user.uid);
    const userDoc = await getDoc(userDocRef);

    const userData = {
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
    handleFirstSignInUser: handleFirstSignInUser
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
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