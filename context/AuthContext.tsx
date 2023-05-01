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
import { getDoc, setDoc} from "@firebase/firestore";
import { getUserDocument} from "@/util/auth/AuthHelpers";
import {IAditionalUserData} from "@/interfaces/User";

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null,
    signInUser: (email: string, password: string) => Promise<void>,
    signOutUser: () => void,
    isFirstLogin: boolean | undefined,
    changePassword: (password: string) => Promise<void>,
    loading: boolean;
}

const signInUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
}


const signOutUser = async () => {
    return await signOut(auth);
}

const changePassword = async (password: string) => {
    return await updatePassword(auth.currentUser as User, password )
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signInUser: signInUser,
    signOutUser: signOutUser,
    isFirstLogin: undefined,
    changePassword: changePassword,
    loading: true
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isFirstLogin, setIsFirstLogin] = useState<boolean | undefined>(true)
    const [loading, setLoading] = useState<boolean>(false);
    const handleFirstSignInUser = async (user: User) => {
        const userDoc = await getDoc(getUserDocument(user));
        const userData: IAditionalUserData = {
            isFirstLogin: true
        }
        if (!userDoc.exists()) {
            return await setDoc(getUserDocument(user), userData);
        }
    }
    const setFirstLogin = async () => {
        if (user) {
            const data = await getDoc(getUserDocument(user));
            const additionalUserData = data.data() as IAditionalUserData;
            setIsFirstLogin(additionalUserData.isFirstLogin);
            setLoading(false);
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
        if(user) {
            handleFirstSignInUser(user).then(() => {
                setFirstLogin()
            })
        }
    },[user])

    return (
        <AuthContext.Provider value={{user, signInUser, signOutUser, isFirstLogin, changePassword}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;