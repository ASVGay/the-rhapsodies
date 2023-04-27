import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    AuthError,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut, updatePassword,
    User,
    UserCredential
} from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null,
    signInUser: (email: string, password: string) => Promise<UserCredential>,
    signOutUser: () => void,
    changePassword: (password: string) => Promise<void>
}

const signInUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
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
    changePassword: changePassword
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
        <AuthContext.Provider value={{user, signInUser, signOutUser, changePassword}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;