import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://dapi.kakao.com https://t1.daumcdn.net http://t1.daumcdn.net;"
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
module.exports = {
  images: {
    domains: ['images.unsplash.com'], 
  },
};

export default nextConfig;
