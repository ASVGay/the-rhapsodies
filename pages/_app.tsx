import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import {AuthContextProvider} from "@/context/AuthContext";
import Layout from "@/components/layout/layout";

export default function App({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="application-name" content="The Rhapsodies"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
            <meta name="apple-mobile-web-app-title" content="The Rhapsodies"/>
            <meta name="description" content="An application for members of The Rhapsodies, A.S.V.Gay's house band."/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="theme-color" content="#F5DD8A"/>
            <meta name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"/>
            <link rel="icon" type="image/png" sizes="196x196" href="/assets/icons/favicon-196.png"/>
            <link rel="apple-touch-icon" href="/assets/icons/apple-icon-180.png"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>

            {/* Splash screens*/}
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2048-2732.jpg"
                  media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2732-2048.jpg"
                  media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1668-2388.jpg"
                  media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2388-1668.jpg"
                  media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1536-2048.jpg"
                  media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2048-1536.jpg"
                  media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1668-2224.jpg"
                  media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2224-1668.jpg"
                  media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1620-2160.jpg"
                  media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2160-1620.jpg"
                  media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1290-2796.jpg"
                  media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2796-1290.jpg"
                  media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1179-2556.jpg"
                  media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2556-1179.jpg"
                  media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1284-2778.jpg"
                  media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2778-1284.jpg"
                  media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1170-2532.jpg"
                  media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2532-1170.jpg"
                  media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1125-2436.jpg"
                  media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2436-1125.jpg"
                  media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1242-2688.jpg"
                  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2688-1242.jpg"
                  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-828-1792.jpg"
                  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1792-828.jpg"
                  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1242-2208.jpg"
                  media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-2208-1242.jpg"
                  media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-750-1334.jpg"
                  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1334-750.jpg"
                  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-640-1136.jpg"
                  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
            <link rel="apple-touch-startup-image" href="/assets/icons/apple-splash-1136-640.jpg"
                  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
        </Head>
        <AuthContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthContextProvider>
    </>
}
