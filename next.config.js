/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://suitmedia-backend.suitdev.com/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};
