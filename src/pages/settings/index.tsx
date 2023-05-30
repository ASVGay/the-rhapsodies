import NotificationSettings from "@/components/settings/notifications/notification-settings"
import Account from "@/components/settings/account/account"

export default function Settings() {
  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header lg:text-center"}>Settings</h1>
      <NotificationSettings />
      <Account />
      <p className={"bottom-0 pt-6 text-center italic text-zinc-300"}>
        Icons by{" "}
        <a href={"https://icons8.com"} className={"underline"}>
          Icons8
        </a>
      </p>
    </div>
  )
}
