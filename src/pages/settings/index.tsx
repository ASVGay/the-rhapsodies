import NotificationSettings from "@/components/settings/notifications/notification.settings"

export default function Settings() {
  return (
    <div className={"mx-auto px-4 py-6 lg:w-3/5"}>
      <h1
        className={
          "pb-4 text-2xl font-semibold sm:text-3xl lg:text-center lg:text-4xl"
        }
      >
        Settings
      </h1>
      <NotificationSettings />
    </div>
  )
}
