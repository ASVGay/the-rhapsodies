import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut, updatePassword,
    User
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import {getDoc, setDoc, updateDoc} from "@firebase/firestore";
import {getAditionalUserData, getUserDocument} from "@/util/auth/AuthHelpers";
import {IAditionalUserData} from "@/interfaces/User";
import {FirebaseError} from "@firebase/util";

const auth = getAuth(firebase_app);

const signInUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
}

const signOutUser = async () => {
    return await signOut(auth);
}

const changePassword = async (password: string, user: User) => {
    const documentRef = getUserDocument(user);
    try {
        await updateDoc(documentRef, {isFirstLogin: false})
        await updatePassword(auth.currentUser as User, password);
        await signOutUser();
    } catch(e) {
        return e as FirebaseError;
    }
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signInUser: signInUser,
    signOutUser: signOutUser,
    changePassword: changePassword,
    loading: true
});

export const useAuthContext = () => useContext(AuthContext);
export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFirstSignInUser = async (authenticatedUser: User) => {
        const userDoc = await getDoc(getUserDocument(authenticatedUser));
        const userData: IAditionalUserData = {isFirstLogin: true}
        if (!userDoc.exists()) {
            return await setDoc(getUserDocument(authenticatedUser), userData);
        }
    }

    const handleUser = async (user: User | null) => {
        if (!user) {
            setUser(user);
            return;
        }

        await handleFirstSignInUser(user);
        const additionalUserData = await getAditionalUserData(user);
        const authenticatedUser: AuthenticatedUser = {
            user,
            additionalUserData
        }

        setUser(authenticatedUser)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            await handleUser(user)
            setLoading(false)
        });
        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{user, signInUser, signOutUser, changePassword, loading}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

interface AuthContextType {
    user: AuthenticatedUser | null,
    signInUser: (email: string, password: string) => Promise<void>,
    signOutUser: () => void,
    changePassword: (password: string, user: User) => Promise<FirebaseError | undefined>,
    loading: boolean
}

interface AuthenticatedUser {
    user: User,
    additionalUserData: IAditionalUserData
}

interface AuthContextProviderProps {
    children: ReactNode;
}