/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, trailingSlash: true };

module.exports = async (phase, { defaultConfig }) => {
  return nextConfig;
};
