import React, { useState } from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { BookOpenIcon } from "@heroicons/react/24/outline"
import SettingsButton from "../controls/settings-button"
import { OverlayContent } from "@/interfaces/overlay-content"
import ScrollViewOverlay from "@/components/overlays/scroll-view.overlay"

interface TermsAndPoliciesSettingsProps {
  termsContent: OverlayContent
  privacyContent: OverlayContent
}

const TermsAndPoliciesSettings = ({
  termsContent,
  privacyContent,
}: TermsAndPoliciesSettingsProps) => {
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <SettingsWrapper category={"Terms & Policies"} icon={BookOpenIcon}>
      <SettingsButton
        disabled={false}
        onClick={() => setShowTerms(true)}
        text={"Terms and Conditions"}
        dataCy={"terms-conditions-button"}
      />
      <SettingsButton
        disabled={false}
        onClick={() => setShowPrivacy(true)}
        text={"Privacy Policy"}
        dataCy={"privacy-policy-button"}
      />
      {showTerms && (
        <ScrollViewOverlay overlayContent={termsContent} onClose={() => setShowTerms(false)} />
      )}
      {showPrivacy && (
        <ScrollViewOverlay overlayContent={privacyContent} onClose={() => setShowPrivacy(false)} />
      )}
    </SettingsWrapper>
  )
}

export default TermsAndPoliciesSettings
