import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Tu peux ajouter ici d'autres options si tu veux
};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development', // pas de PWA en dev
})(nextConfig);
