import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://dapi.kakao.com;"
  }
];

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
