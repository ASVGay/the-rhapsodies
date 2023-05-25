export const getInstrumentImage = (sourceName: string) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1684372007/instrument-icons/${sourceName}.svg`
}
