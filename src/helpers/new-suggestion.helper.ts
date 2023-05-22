export function submitSongInformationForm() {
  document
    .querySelector("#song-information")
    // Those properties are necessary [src: https://stackoverflow.com/a/65667238]
    ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
}
