import { window } from "rxjs"

export const AlertText: { [key: string]: string } = {
  permissionGranted: `Go to your settings to disable notifications for 'The Rhapsodies'.`,
  permissionDenied: `You have denied permission for notifications. Want to enable notifications? Go to your settings and allow 'The Rhapsodies' to show notifications.`,
}

// @ts-ignore
export const WindowOneSignal = window.OneSignal
