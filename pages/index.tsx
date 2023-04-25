import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useAuthContext} from "@/context/AuthContext";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import signOut from "@/firebase/signout";
import signOutUser from "@/firebase/signout";
import MainButton from "@/components/buttons/main-button/MainButton";
import ErrorPopup from "@/components/popups/error-popup/ErrorPopup";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if(!user) {
      router.push("./signin")
    }
  },)

  const logout = async() => {
    try {
      await signOutUser();
      await router.push("./")
    } catch {
      setShowError(true);
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainButton text={"Log out"} onClick={logout}/>
          {
            showError &&
              <ErrorPopup text={"Can't log out right now."} closePopup={() => setShowError(false)}/>
          }
    </main>
  )
}
