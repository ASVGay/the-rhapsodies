import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import * as OneSignal from "https://esm.sh/@onesignal/node-onesignal@1.0.0-beta7"
import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts"

const databaseUrl = Deno.env.get("SUPABASE_DB_URL")!
// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(databaseUrl, 3, true)

const _OnesignalAppId_ = Deno.env.get("NEXT_PUBLIC_ONESIGNAL_APP_ID")!
const _OnesignalUserAuthKey_ = Deno.env.get("ONESIGNAL_USER_AUTH_KEY")!
const _OnesignalRestApiKey_ = Deno.env.get("NEXT_PUBLIC_ONESIGNAL_REST_API_KEY")!
const _OnesignalUrl_ = Deno.env.get("ONESIGNAL_URL")!

const configuration = OneSignal.createConfiguration({
  userKey: _OnesignalUserAuthKey_,
  appKey: _OnesignalRestApiKey_,
})

const onesignal = new OneSignal.DefaultApi(configuration)

serve(async (req: Promise<Response>) => {
  try {
    // Grab a connection from the pool
    const connection = await pool.connect()

    try {
      const { record } = await req.json()

      // Build OneSignal notification object
      const notification = new OneSignal.Notification()
      notification.app_id = _OnesignalAppId_
      notification.included_segments = ["Total Subscriptions"]
      notification.contents = {
        en: `A new event has just been announced! Tap on this notification to let us know if you're coming.`,
      }
      notification.web_url = `${_OnesignalUrl_}/events/${record.id}`
      const onesignalApiRes = await onesignal.createNotification(notification)

      return new Response(JSON.stringify({ onesignalResponse: onesignalApiRes }), {
        headers: { "Content-Type": "application/json" },
      })
    } catch (err) {
      console.error("Failed to create OneSignal notification", err)
      return new Response("Server error.", {
        headers: { "Content-Type": "application/json" },
        status: 400,
      })
    } finally {
      // Release the connection back into the pool
      connection.release()
    }
  } catch (err) {
    console.error(err)
    return new Response(String(err?.message ?? err), { status: 500 })
  }
})
