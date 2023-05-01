import {useAuthContext} from "@/context/AuthContext";
import { useState} from "react";
import {useRouter} from "next/router";
import MainButton from "@/components/buttons/main-button/MainButton";
import ErrorPopup from "@/components/popups/error-popup/ErrorPopup";
import WithProtectedRoute from "@/components/protected-route/ProtectedRoute";

function Home() {
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);
  const { signOutUser , user, isFirstLogin  } = useAuthContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainButton text={"Log out"} onClick={signOutUser}/>
          {
            showError &&
              <ErrorPopup text={"Can't log out right now."} closePopup={() => setShowError(false)}/>
          }
    </main>
  )
}


export default WithProtectedRoute(Home);