import MainButton from "@/components/buttons/main-button/MainButton";
import {useRouter} from "next/router";

export default function Custom404() {
    // TODO: Make this a protected route
    const router = useRouter();

    return (
        <div data-cy="404-page" className="grid h-[calc(100vh-68px)]  lg:h-[calc(100vh-6rem)] px-4 bg-white place-content-center">
            <div className="text-center">
                <h1 className="font-black text-zinc-200 text-9xl">404</h1>

                <p className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                    Uh-oh!
                </p>

                <p className="mt-4 text-gray-500 mb-6">Something went wrong.</p>

                <MainButton text={"Go back home"} onClick={() => router.push('/')}/>
            </div>
        </div>
    )
}