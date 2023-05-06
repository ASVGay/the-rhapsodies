import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import {FC, useEffect, useState} from "react";
import {getDoc} from "@firebase/firestore";
import {getUserDocument} from "@/util/auth/AuthHelpers";
import {IAditionalUserData} from "@/interfaces/User";
import {User} from "firebase/auth";



const WithProtectedRoute = <P extends object>(
    WrappedComponent: FC<P>
): FC<P> => {
    const Wrapper = (props: P) => {
        const router = useRouter();
        const { user, } = useAuthContext();
        const [loading, setLoading] = useState<boolean>(true);

        console.log(user)
        if (!user) {
            router.push("./sign-in");
        }

        useEffect(() => {
            if(user?.additionalUserData.isFirstLogin) {
                if(router.pathname !== "/change-password") {
                    router.push("/change-password");
                }
            }
        },[])

        return !loading ? null : <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default WithProtectedRoute;