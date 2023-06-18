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
