// next.config.ts
import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

interface ExtendedNextConfig extends NextConfig {
    eslint?: {
        ignoreDuringBuilds?: boolean;
    };
}

const nextConfig: ExtendedNextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    turbopack: {
        // ...
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
        ],
    },
};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
})(nextConfig);
