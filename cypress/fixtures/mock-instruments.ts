interface Instrument {
  id: string
  instrument_name: string
  image_source: string
}

export const mockInstruments: [Instrument] = [
  {
    id: "f5ccaa5d-c601-40fb-8604-5fc7485f8528",
    instrument_name: "Acoustic Guitar",
    image_source: "guitar",
  },
  {
    id: "c52a4872-69ed-4c9b-95ae-ffa6d06701c1",
    instrument_name: "Bass Guitar",
    image_source: "rock-music",
  },
  {
    id: "7d0a428d-eae6-429d-9877-48b8b79ecc73",
    instrument_name: "Clap",
    image_source: "applause",
  },
  {
    id: "93c467da-9485-4f4a-95dc-8190ab5e728c",
    instrument_name: "Cowbell",
    image_source: "cowbell",
  },
  {
    id: "b16f75cd-907f-44f2-a67b-28853c9d55a9",
    instrument_name: "Drums",
    image_source: "drums",
  },
  {
    id: "ec745806-bbcb-46fa-b5c3-a702b8f3d603",
    instrument_name: "Flute",
    image_source: "flute",
  },
  {
    id: "52bcbb7a-02e2-4cc8-a353-7b4402efacd7",
    instrument_name: "Lead Guitar",
    image_source: "guitar-strings",
  },
  {
    id: "9128bc25-9e87-4f00-ac9a-bc447142328e",
    instrument_name: "Maracas",
    image_source: "maracas",
  },
  {
    id: "52cf33dd-0067-431d-bc2f-745bedb3e07e",
    instrument_name: "Piano",
    image_source: "grand-piano",
  },
  {
    id: "eb70c557-f23e-42b8-9e6e-3726d2ff2e88",
    instrument_name: "Rhythm Guitar",
    image_source: "guitar-strings",
  },
  {
    id: "b12b75f2-8fde-4108-8c0f-a9865c8e0969",
    instrument_name: "Saxophone",
    image_source: "saxophone",
  },
  {
    id: "59b42237-f8e8-47b9-a175-c9e497f5fd85",
    instrument_name: "Strings",
    image_source: "violin",
  },
  {
    id: "08527f92-4aa3-4f65-b12c-b8b5e82752e7",
    instrument_name: "Synth",
    image_source: "piano",
  },
  {
    id: "2521bb43-87b7-48ce-87d7-5ff6c7bfb94b",
    instrument_name: "Trumpet",
    image_source: "trumpet",
  },
  {
    id: "edc0bc16-b99f-436c-af63-3f9cd838c986",
    instrument_name: "Vocals",
    image_source: "micro",
  },
]
