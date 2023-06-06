import { NextApiHandler } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { isAuthApiError } from "@supabase/gotrue-js"

const handler: NextApiHandler = async (req, res) => {
  const next = req.query.next
  const code = req.query["?code"] || req.query.code
  const supabase = createPagesServerClient({ req, res })

  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(String(code))

      if (next) res.redirect(String(next))
    } catch (error) {
      if (isAuthApiError(error))
        res.redirect(`/sign-in#error_description=${error.message} [${error.status}]`)
      else res.redirect(`/sign-in#error_description=${JSON.stringify(error)}`)
    }
  } else {
    try {
      await supabase.auth.signOut()
      res.redirect("/sign-in")
    } catch (error) {
      res.redirect(`/sign-in#error_description=${JSON.stringify(error)}`)
    }
  }
}

export default handler
