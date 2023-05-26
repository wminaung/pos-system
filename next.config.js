/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "msquarefdc.sgp1.digitaloceanspaces.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
