const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NEXT_PUBLIC_DISABLE_PWA === "true",
})

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
})
