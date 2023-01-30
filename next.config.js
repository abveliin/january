/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
};

module.exports = nextConfig;
