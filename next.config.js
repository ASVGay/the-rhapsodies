const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NEXT_PUBLIC_DISABLE_PWA === "true",
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `res.cloudinary.com`,
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
    ],
  },
})
