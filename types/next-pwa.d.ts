declare module 'next-pwa' {
  import type { NextConfig } from 'next';
  import type { PWAConfig } from 'next-pwa';

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
