/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ prtocol: "https", hostName: "img.clerk.com" }],
  },
};

export default nextConfig;
