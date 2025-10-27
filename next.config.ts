import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  compress: true,
  
  transpilePackages: [],
  
  // Экспериментальные оптимизации
  experimental: {
    optimizePackageImports: [
      '@iconify/react', 
      'motion', 
      'framer-motion', 
      'lucide-react',
      'recharts',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-tooltip',
    ],
    webpackBuildWorker: true,
  },
  
  // Оптимизация для production
  productionBrowserSourceMaps: false,
  
  // SEO и безопасность заголовки
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ]
  },
};

export default nextConfig;
