import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env?.NEXT_PUBLIC_SUPABASE_URL ?? "x",
  process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "x"
)

// cache session data for each user name
const sessions = {}

export async function getUserSession({ user }) {
  // Create a session for the user if it doesn't exist already.
  if (!sessions[user]) {
    const { data } = await supabase.auth.signInWithPassword({
      email: `${user}@cypress.com`,
      password: `${user}-password`,
    })

    sessions[user] = data.session
  }

  return sessions[user]
}
