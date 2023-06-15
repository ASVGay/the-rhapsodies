import React, { useEffect, useState } from "react"
import OverlayContainer from "./overlay-container"

interface TermsAndConditionsProps {
  onClose: () => void
}

const TermsAndConditions = ({ onClose }: TermsAndConditionsProps) => {
  const [animationActive, setAnimationActive] = useState<boolean>(false)
  useEffect(() => {
    setAnimationActive(true)
  }, [])

  const waitForTransition = () => {
    setAnimationActive(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <OverlayContainer animationActive={animationActive}>
      <div data-cy="terms-and-conditions">
        <h2 className="mb-4 text-xl font-bold">Terms and Conditions</h2>
        <div className="mb-2 max-h-[400px] overflow-scroll overflow-x-hidden p-2">
          <p className="mb-2">{`These Terms and Conditions ("Agreement") govern your access to and use of the 
          The Rhapsodies mobile application ("App") provided by ASVGay ("Company"). By using the App, you agree 
          to be bound by this Agreement. If you do not agree with any part of this Agreement, you must not use the App.`}</p>
          <div>
            <h2 className="text-l mb-2 font-bold">1. Use of the app</h2>
            <ul className="mb-2 ml-2">
              <li>{`1.1. The App is provided for your personal, non-commercial use only.`}</li>
              <li>{`1.2. You are responsible for maintaining the confidentiality of your account information and for all 
            activities that occur under your account.`}</li>
            </ul>
          </div>
          <h2 className="text-l mb-2 font-bold">2. Intellectual Property</h2>
          <ul className="mb-2 ml-2">
            <li>{`2.1. The App and all its content, including but not limited to text, graphics, logos, images, and 
            software, are the intellectual property of the Company and protected by copyright and other intellectual property laws.`}</li>
            <li>{`2.2. You may not modify, reproduce, distribute, or create derivative works based on the App 
            or its content without prior written permission from the Company.`}</li>
          </ul>
          <h2 className="text-l mb-2 font-bold">3. User-Generated Content</h2>
          <ul className="mb-2 ml-2">
            <li>{`3.1. The App may allow users to submit or upload content, including but not limited to text and images ("User Content").`}</li>
            <li>{`3.2. By submitting User Content, you grant the Company a non-exclusive, worldwide, royalty-free, 
            irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute, and display the User Content in any media.`}</li>
            <li>{`3.3. You represent and warrant that you have the necessary rights to grant the 
            above license and that your User Content does not violate any third-party rights.`}</li>
          </ul>
          <h2 className="text-l mb-2 font-bold">4. Privacy</h2>
          <ul className="mb-2 ml-2">
            <li>{`4.1. The Company respects your privacy and handles your personal information 
            in accordance with its Privacy Policy. By using the App, you consent to the collection, use, and
             disclosure of your personal information as described in the Privacy Policy.`}</li>
          </ul>
          <h2 className="text-l mb-2 font-bold">5. Limitation of Liability</h2>
          <ul className="mb-2 ml-2">
            <li>{`5.1. The App is provided on an "as-is" and "as available" basis. The Company 
            makes no warranties or representations regarding the App's reliability, accuracy, or availability.`}</li>
            <li>{`5.2. To the extent permitted by law, the Company shall not be liable for any direct, indirect, 
            incidental, consequential, or punitive damages arising out of or in connection with your use of the App.`}</li>
            <li>{`5.3. The Company does not endorse or assume responsibility for 
            any third-party content or services accessed through the App.`}</li>
          </ul>
          <h2 className="text-l mb-2 font-bold">6. Modifications to the Agreement</h2>
          <ul className="mb-2 ml-2">
            <li>{`6.1. The Company reserves the right to modify or update this Agreement at any time. 
            Your continued use of the App after the changes are posted constitutes your acceptance of the modified Agreement.`}</li>
          </ul>
          <h2 className="text-l mb-2 font-bold">7. Governing Law and Jurisdiction</h2>
          <ul className="mb-2 ml-2">
            <li>{`7.1. This Agreement shall be governed by and construed in accordance with the laws of The Netherlands.
             Any disputes arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of The Netherlands.`}</li>
          </ul>
        </div>
        <p className="mb-2 ">By accepting, you agree to our terms and conditions.</p>

        <div className="flex justify-end">
          <button className="btn" onClick={waitForTransition}>
            Close
          </button>
        </div>
      </div>
    </OverlayContainer>
  )
}

export default TermsAndConditions
