import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut, updatePassword,
    User,
    UserCredential
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import {getDoc, setDoc, updateDoc} from "@firebase/firestore";
import {getUserDocument} from "@/util/auth/AuthHelpers";
import {IAditionalUserData} from "@/interfaces/User";

const auth = getAuth(firebase_app);

const signInUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
}


const signOutUser = async () => {
    return await signOut(auth);
}

const changePassword = async (password: string, user: User) => {
    const documentRef = getUserDocument(user);
    await updateDoc(documentRef, {isFirstLogin: false})
    return await updatePassword(auth.currentUser as User, password)
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signInUser: signInUser,
    signOutUser: signOutUser,
    changePassword: changePassword,
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

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

    const getIsFirstLogin = async (user: User) => {
        const data = await getDoc(getUserDocument(user));
        return data.data() as IAditionalUserData;
    }

    const handleUser = async (user: User | null) => {
        if (!user) {
            setUser(user);
            return
        }

        await handleFirstSignInUser(user);
        const additionalUserData = await getIsFirstLogin(user);
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
        <AuthContext.Provider value={{user, signInUser, signOutUser, changePassword}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

interface AuthContextType {
    user: AuthenticatedUser | null,
    signInUser: (email: string, password: string) => Promise<void>,
    signOutUser: () => void,
    changePassword: (password: string, user: User) => Promise<void>,
}

interface AuthenticatedUser {
    user: User,
    additionalUserData: IAditionalUserData
}