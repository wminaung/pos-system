/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "msquarefdc.sgp1.digitaloceanspaces.com",
      "lh3.googleusercontent.com",
      "msquarefdc.sgp1.cdn.digitaloceanspaces.com",
    ],
  },
  // env: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  // },
};

module.exports = nextConfig;
