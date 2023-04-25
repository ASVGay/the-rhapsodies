import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
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
        <AuthContext.Provider value={{ user }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;