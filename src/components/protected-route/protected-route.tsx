import { useAuthContext } from "@/context/auth-context"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"

const WithProtectedRoute = <P extends object>(
  WrappedComponent: FC<P>
): ((props: P) => false | JSX.Element) => {
  const Wrapper = (props: P) => {
    const router = useRouter()
    const { user, loading } = useAuthContext()

    if (!user) {
      router.push("/sign-in")
    }

    const checkIfFirstLogIn = () => {
      if (
        user?.additionalUserData.isFirstLogin &&
        router.pathname !== "/change-password"
      ) {
        router.push("/change-password")
      }
    }

    useEffect(() => {
      checkIfFirstLogIn()
    }, [user])

    return !loading && <WrappedComponent {...props} />
  }

  return Wrapper
}

export default WithProtectedRoute
