import { NextRequest, NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { isInMemberDatabase } from "@/services/authentication.service"

const goToPath = (path: string, req: NextRequest) => {
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = path
  return NextResponse.redirect(redirectUrl)
}

export const middleware = async (req: NextRequest) => {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers
  const res = NextResponse.next()
  // Create authenticated Supabase Client
  const supabase = createMiddlewareClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in
  if (session?.user) {
    // TODO Add error handling (perhaps a new page for it?)
    const { count } = await isInMemberDatabase(supabase, session.user.id)

    // If is first login, go to change password
    if (count === 0) {
      if (req.nextUrl.pathname.startsWith("/change-password")) return res
      else return goToPath("/change-password", req)
    } else if (req.nextUrl.pathname.startsWith("/change-password")) return goToPath("/", req)

    // Go to homepage if user is logged in and tries to go to sign-in
    if (req.nextUrl.pathname.startsWith("/sign-in")) return goToPath("/", req)
    return res
  }

  // If user is not logged in and going to sign-in, let them
  if (req.nextUrl.pathname.startsWith("/sign-in")) return res
  // Else, redirect to sign in page
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = "/sign-in"
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (manifest.json for PWA file)
     * - assets (images)
     * - icons
     * - images
     * - sw.js (service worker for pwa)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|assets|icons|images|sw.js).*)",
  ],
}
