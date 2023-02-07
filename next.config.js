/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },
  images: {
    domains: [
      "scontent.cdninstagram.com",
      "video.cdninstagram.com",
      "scontent-mba1-1.cdninstagram.com",
      "res.cloudinary.com",
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
