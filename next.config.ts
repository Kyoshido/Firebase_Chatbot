import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
    localeDetection: false, // Recommended for explicit language switcher
  },
};

export default nextConfig;
