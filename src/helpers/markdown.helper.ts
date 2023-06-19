import { OverlayContent } from "@/interfaces/overlay-content"
import fs from "fs"
import { remark } from "remark"
import html from "remark-html"

export const getMarkdownData = async (path: string) => {
  const fileContents = fs.readFileSync(path, "utf8")

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(fileContents)
  const contentHtml = processedContent.toString()

  return contentHtml
}

export const getTermsAndConditionContent = async (): Promise<OverlayContent> => {
  const termsData = await getMarkdownData("src/lib/terms-and-conditions.md")
  return {
    title: "Terms and Conditions",
    content: termsData,
    footer: "By accepting, you agree to our terms and conditions.",
    buttonText: "Close",
    dataCy: "terms-and-conditions",
  }
}

export const getPrivacyPolicyContent = async (): Promise<OverlayContent> => {
  const privacyData = await getMarkdownData("src/lib/privacy-policy.md")
  return {
    title: "Privacy Policy",
    content: privacyData,
    footer: "By accepting, you agree to our privacy policy.",
    buttonText: "Close",
    dataCy: "privacy-policy",
  }
}
