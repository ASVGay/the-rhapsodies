export const boldSpecificTextSections = (str: string, find: string) => {
  /**
   * this version of the function expects the bold tags added by boldSpecificTextSections
   */
  const capitalizeFirstLetterOfEachWord = (text: string): string => {
    const words = text.split(" ")
    const capitalizedWords = words.map((word) => {
      let charIndex = 0
      let firstLetter = ""
      if (word.charAt(0) === "<") {
        charIndex = 3
        firstLetter = "<b>" + word.charAt(charIndex).toUpperCase()
      } else {
        firstLetter = word.charAt(charIndex).toUpperCase()
      }

      const restOfWord = word.slice(charIndex + 1)

      return `${firstLetter}${restOfWord}`
    })
    return capitalizedWords.join(" ")
  }

  var re = new RegExp(find, "gi")

  let newString = str.replace(re, "<b>" + find.toLowerCase() + "</b>")

  newString = capitalizeFirstLetterOfEachWord(newString)
  // If the first occurrence is the bold tag, Capitalize the letter inside that bold tag.
  if (newString.charAt(0) === "<")
    return newString.replace(`<b>${newString.charAt(3)}`, `<b>${newString.charAt(3).toUpperCase()}`)

  // const words = newString.split(" ");
  return newString
}
