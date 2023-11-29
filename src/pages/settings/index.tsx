import NotificationSettings from "@/components/settings/notifications/notification-settings"
import AccountSettings from "@/components/settings/account/account-settings"
import TermsAndPoliciesSettings from "@/components/settings/terms-and-policies/terms-and-policies-settings"
import { getPrivacyPolicyContent, getTermsAndConditionContent } from "@/helpers/markdown.helper"
import { OverlayContent } from "@/interfaces/overlay-content"

interface SettingsProps {
  termsContent: OverlayContent
  privacyContent: OverlayContent
}

export async function getStaticProps() {
  const termsContent: OverlayContent = await getTermsAndConditionContent()
  const privacyContent: OverlayContent = await getPrivacyPolicyContent()

  return {
    props: {
      termsContent,
      privacyContent,
    },
  }
}

export default function Settings({ termsContent, privacyContent }: SettingsProps) {
  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header lg:text-center"}>Settings</h1>
      <AccountSettings />
      <NotificationSettings />
      <TermsAndPoliciesSettings termsContent={termsContent} privacyContent={privacyContent} />
      <p className={"bottom-0 pt-6 text-center italic text-zinc-300"}>
        Icons by{" "}
        <a href={"https://icons8.com"} className={"underline"} data-cy={"link-icons-8"}>
          Icons8
        </a>
      </p>
    </div>
  )
}
