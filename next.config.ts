import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cbtavxwthhmcxrekoxxd.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  reactCompiler: true,
}

export default nextConfig