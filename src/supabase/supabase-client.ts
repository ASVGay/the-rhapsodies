import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/database.types"

// Create a single supabase client for interacting with your database
export const supabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

  if (!supabaseUrl) {
    throw new Error(
      "You need to set the environment variable NEXT_PUBLIC_SUPABASE_URL to the project URL"
    )
  }

  if (!supabaseKey) {
    throw new Error(
      "You need to set the environment variable NEXT_PUBLIC_SUPABASE_KEY to the project API key [anon][public]"
    )
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}
