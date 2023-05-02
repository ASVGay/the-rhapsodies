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

interface AuthContextType {
    user: User | null,
    signInUser: (email: string, password: string) => Promise<void>,
    signOutUser: () => void,
    changePassword: (password: string, user: User) => Promise<void>,
}

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
    const [user, setUser] = useState<User | null>(null);
    const [isFirstLogin, setIsFirstLogin] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(true);
    const handleFirstSignInUser = async (user: User) => {
        const userDoc = await getDoc(getUserDocument(user));
        const userData: IAditionalUserData = { isFirstLogin: true }
        if (!userDoc.exists()) {
            return await setDoc(getUserDocument(user), userData);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const handleFirstLogin = async () => {
            if (user) {
                try {
                    await handleFirstSignInUser(user);
                } catch (e) {
                    console.error(e);
                    await signOutUser();
                }
            }
        }
        handleFirstLogin();
    }, [user])

    return (
        <AuthContext.Provider value={{user, signInUser, signOutUser, changePassword}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;