export function notificationsAreSupported() {
  if (typeof window == "undefined") return false
  return "Notification" in window && "serviceWorker" in navigator && "PushManager" in window
}
