import NotificationSettings from "@/components/settings/notifications/notification-settings"

export default function Settings() {
  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header lg:text-center"}>Settings</h1>
      <NotificationSettings />
    </div>
  )
}
