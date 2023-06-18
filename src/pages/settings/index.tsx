import NotificationSettings from "@/components/settings/notifications/notification-settings"
import AccountSettings from "@/components/settings/account/account-settings"
import TermsAndPoliciesSettings from "@/components/settings/terms-and-policies/terms-and-policies-settings"
import { getMarkdownData } from "@/helpers/markdown.helper"
import { OverlayContent } from "@/interfaces/overlay-content"

interface SettingsProps {
  overlayContent: OverlayContent
}

export async function getStaticProps() {
  const markdownData = await getMarkdownData("src/lib/terms-and-conditions.md")
  const overlayContent: OverlayContent = {
    title: "Terms and Conditions",
    content: markdownData,
    footer: "By accepting, you agree to our terms and conditions.",
    buttonText: "Close",
  }

  return {
    props: {
      overlayContent,
    },
  }
}

export default function Settings({ overlayContent }: SettingsProps) {
  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header lg:text-center"}>Settings</h1>
      <AccountSettings />
      <NotificationSettings />
      <TermsAndPoliciesSettings overlayContent={overlayContent} />
      <p className={"bottom-0 pt-6 text-center italic text-zinc-300"}>
        Icons by{" "}
        <a href={"https://icons8.com"} className={"underline"}>
          Icons8
        </a>
      </p>
    </div>
  )
}
