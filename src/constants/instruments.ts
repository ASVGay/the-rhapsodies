import { StaticImageData } from "next/image"

export interface Instrument {
  instrumentName: string
  icon: { readonly default: StaticImageData }
}

export const Instruments: { [key: string]: Instrument } = {
  ACCORDION: {
    instrumentName: "Accordion",
    icon: require("public/assets/instruments/icons8-accordion-50.png"),
  },
  BANJO: {
    instrumentName: "Banjo",
    icon: require("public/assets/instruments/icons8-banjo-50.png"),
  },
  BASS_GUITAR: {
    instrumentName: "Bass guitar",
    icon: require("public/assets/instruments/icons8-bass-guitar-50.png"),
  },
  CELLO: {
    instrumentName: "Cello",
    icon: require("public/assets/instruments/icons8-cello-50.png"),
  },
  CLARINET: {
    instrumentName: "Clarinet",
    icon: require("public/assets/instruments/icons8-clarinet-50.png"),
  },
  DOUBLE_BASS: {
    instrumentName: "Double bass",
    icon: require("public/assets/instruments/icons8-cello-50.png"),
  },
  DRUMS: {
    instrumentName: "Drums",
    icon: require("public/assets/instruments/icons8-drum-set-50.png"),
  },
  FRENCH_HORN: {
    instrumentName: "French horn",
    icon: require("public/assets/instruments/icons8-french-horn-50.png"),
  },
  GUITAR: {
    instrumentName: "Guitar",
    icon: require("public/assets/instruments/icons8-guitar-50.png"),
  },
  KEYBOARD: {
    instrumentName: "Keyboard",
    icon: require("public/assets/instruments/icons8-piano-50.png"),
  },
  LEAD_GUITAR: {
    instrumentName: "Lead guitar",
    icon: require("public/assets/instruments/icons8-rock-music-50.png"),
  },
  PIANO: {
    instrumentName: "Piano",
    icon: require("public/assets/instruments/icons8-piano-50.png"),
  },
  RHYTHM_GUITAR: {
    instrumentName: "Rhythm guitar",
    icon: require("public/assets/instruments/icons8-rock-music-50.png"),
  },
  SAXOPHONE: {
    instrumentName: "Saxophone",
    icon: require("public/assets/instruments/icons8-saxophone-50.png"),
  },
  SINGER: {
    instrumentName: "Vocals",
    icon: require("public/assets/instruments/icons8-micro-50.png"),
  },
  TRUMPET: {
    instrumentName: "Trumpet",
    icon: require("public/assets/instruments/icons8-trumpet-50.png"),
  },
  UKULELE: {
    instrumentName: "Ukulele",
    icon: require("public/assets/instruments/icons8-ukulele-50.png"),
  },
  VIOLIN: {
    instrumentName: "Violin",
    icon: require("public/assets/instruments/icons8-violin-50.png"),
  },
  XYLOPHONE: {
    instrumentName: "Xylophone",
    icon: require("public/assets/instruments/icons8-xylophone-50.png"),
  },
}
