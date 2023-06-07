import { NextRequest, NextResponse } from "next/server"
import { createMiddlewareClient, Session } from "@supabase/auth-helpers-nextjs"
import { isInMemberDatabase } from "@/services/authentication.service"
import { SupabaseClient } from "@supabase/supabase-js"

const goToPath = (path: string, req: NextRequest) => {
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = path
  return NextResponse.redirect(redirectUrl)
}

async function handleRoutesWhenLoggedIn(
  supabase: SupabaseClient,
  session: Session,
  req: NextRequest,
  res: NextResponse<unknown>
) {
  // Try to fetch the user first login status
  let count
  try {
    count = (await isInMemberDatabase(supabase, session.user.id)).count
  } catch (error) {
    return goToPath("/500", req)
  }

  // If is first login, go to change password
  if (count === 0) {
    if (req.nextUrl.pathname.startsWith("/change-password")) return res
    else return goToPath("/change-password", req)
    // If not and trying to go to change-password, send to home
  } else if (req.nextUrl.pathname.startsWith("/change-password")) return goToPath("/", req)

  // If trying to reset password, let them
  if (req.nextUrl.pathname.startsWith("/forgot-password/reset")) return res

  // Go to homepage if user is logged in and tries to go to sign-in or forgot-password
  if (req.nextUrl.pathname.startsWith("/sign-in")) return goToPath("/", req)
  if (req.nextUrl.pathname.startsWith("/forgot-password")) return goToPath("/", req)
  return res
}

export const middleware = async (req: NextRequest) => {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers
  const res = NextResponse.next()
  // Create authenticated Supabase Client

  try {
    const supabase = createMiddlewareClient({ req, res })
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If user is logged in
    if (session?.user) {
      return await handleRoutesWhenLoggedIn(supabase, session, req, res)
    }

    // If user is not logged in and going to sign-in or forgot-password, let them
    if (req.nextUrl.pathname.startsWith("/sign-in")) return res
    if (req.nextUrl.pathname === "/forgot-password") return res

    // Else, redirect to sign in page
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/sign-in"
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    return goToPath("/500", req)
  }
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
