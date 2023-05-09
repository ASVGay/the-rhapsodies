import { StaticImageData } from "next/image"

interface Instrument {
  instrument: string
  icon: { readonly default: StaticImageData }
}

export const Instruments: { [key: string]: Instrument } = {
  SINGER: {
    instrument: "Singer",
    icon: require("public/assets/instruments/icons8-micro-50.png"),
  },
  ACCORDION: {
    instrument: "Accordion",
    icon: require("public/assets/instruments/icons8-accordion-50.png"),
  },
  BANJO: {
    instrument: "Banjo",
    icon: require("public/assets/instruments/icons8-banjo-50.png"),
  },
  BASS_GUITAR: {
    instrument: "Bass guitar",
    icon: require("public/assets/instruments/icons8-bass-guitar-50.png"),
  },
  CELLO: {
    instrument: "Cello",
    icon: require("public/assets/instruments/icons8-cello-50.png"),
  },
  CLARINET: {
    instrument: "Clarinet",
    icon: require("public/assets/instruments/icons8-clarinet-50.png"),
  },
  DOUBLE_BASS: {
    instrument: "Double bass",
    icon: require("public/assets/instruments/icons8-cello-50.png"),
  },
  DRUMS: {
    instrument: "Drums",
    icon: require("public/assets/instruments/icons8-drum-set-50.png"),
  },
  ELECTRIC_GUITAR: {
    instrument: "Electric guitar",
    icon: require("public/assets/instruments/icons8-rock-music-50.png"),
  },
  FRENCH_HORN: {
    instrument: "French horn",
    icon: require("public/assets/instruments/icons8-french-horn-50.png"),
  },
  GUITAR: {
    instrument: "Guitar",
    icon: require("public/assets/instruments/icons8-guitar-50.png"),
  },
  KEYBOARD: {
    instrument: "Keyboard",
    icon: require("public/assets/instruments/icons8-piano-50.png"),
  },
  PIANO: {
    instrument: "Piano",
    icon: require("public/assets/instruments/icons8-piano-50.png"),
  },
  SAXOPHONE: {
    instrument: "Saxophone",
    icon: require("public/assets/instruments/icons8-saxophone-50.png"),
  },
  TRUMPET: {
    instrument: "Trumpet",
    icon: require("public/assets/instruments/icons8-trumpet-50.png"),
  },
  UKULELE: {
    instrument: "Ukulele",
    icon: require("public/assets/instruments/icons8-ukulele-50.png"),
  },
  VIOLIN: {
    instrument: "Violin",
    icon: require("public/assets/instruments/icons8-violin-50.png"),
  },
  XYLOPHONE: {
    instrument: "Xylophone",
    icon: require("public/assets/instruments/icons8-xylophone-50.png"),
  },
}
