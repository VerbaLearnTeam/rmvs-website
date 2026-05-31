import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/eprescience",
        destination: "/projects/verbalearn",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
