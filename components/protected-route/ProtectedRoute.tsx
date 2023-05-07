import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/router";
import {FC, useEffect} from "react";


const WithProtectedRoute = <P extends object>(
    WrappedComponent: FC<P>
): FC<P> => {
    const Wrapper = (props: P) => {
        const router = useRouter();
        const {user, loading} = useAuthContext();


        if (!user) {
            router.push("./sign-in");
        }

        const checkIfFirstLogIn = () => {
            if (!user?.additionalUserData.isFirstLogin) {
                return;
            }

            if (router.pathname !== "/change-password") {
                router.push("/change-password");
            }
        }

        useEffect(() => {
            checkIfFirstLogIn()
        }, [user])

        return loading ? null : <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default WithProtectedRoute;