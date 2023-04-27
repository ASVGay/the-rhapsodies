import { Inter } from 'next/font/google'
import {useAuthContext} from "@/context/AuthContext";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import MainButton from "@/components/buttons/main-button/MainButton";
import ErrorPopup from "@/components/popups/error-popup/ErrorPopup";


export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);
  const { signOutUser } = useAuthContext();

  useEffect(() => {
    if(!user) {
      router.push("./signin")
    }

  },)


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
