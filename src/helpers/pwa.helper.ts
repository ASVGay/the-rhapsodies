export function notificationsAreSupported() {
  return "Notification" in window && "serviceWorker" in navigator && "PushManager" in window
}
