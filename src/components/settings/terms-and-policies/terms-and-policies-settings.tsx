import React, { useState } from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { BookOpenIcon } from "@heroicons/react/24/outline"
import SettingsButton from "../controls/settings-button"
import TermsAndConditions from "@/components/overlays/terms-and-conditions"
import { OverlayContent } from "@/interfaces/overlay-content"
import { getOverlay } from "@/helpers/overlay.helper"

interface TermsAndPoliciesSettingsProps {
  overlayContent: OverlayContent
}

const TermsAndPoliciesSettings = ({ overlayContent }: TermsAndPoliciesSettingsProps) => {
  const [showTerms, setShowTerms] = useState(false)

  return (
    <SettingsWrapper category={"Terms & Policies"} icon={BookOpenIcon}>
      <SettingsButton
        disabled={false}
        onClick={() => setShowTerms(true)}
        text={"View Terms and Conditions"}
        dataCy={"terms-conditions-button"}
      />
      {showTerms &&
        getOverlay(
          <TermsAndConditions overlayContent={overlayContent} onClose={() => setShowTerms(false)} />
        )}
    </SettingsWrapper>
  )
}

export default TermsAndPoliciesSettings
