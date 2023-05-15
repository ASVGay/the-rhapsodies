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
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/^https?:\/\//i, "")}`,
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
})
