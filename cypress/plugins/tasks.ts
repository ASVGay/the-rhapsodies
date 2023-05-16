import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env?.NEXT_PUBLIC_SUPABASE_URL ?? "x",
  process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "x"
)

// cache session data for each user name
const sessions = {}

export async function getUserSession({ email, password }) {
  // Create a session for the user if it doesn't exist already.
  if (!sessions[email]) {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    sessions[email] = data.session
  }

  return sessions[email]
}

export async function deleteNewUser() {
  return supabase
    .from("member")
    .delete({ count: "exact" })
    .eq("id", "569e7419-5424-4d18-9918-31016f6252d7")
}
