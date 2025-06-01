let OneSignal: any = null

export const loadOneSignal = async () => {
  if (!OneSignal) {
    const importedModule = await import("react-onesignal")
    OneSignal = importedModule.default
  }
  return OneSignal
}
// Add more utility functions as needed
