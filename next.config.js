/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.rakuten.co.jp' },
      { protocol: 'https', hostname: 'thumbnail.image.rakuten.co.jp' },
      { protocol: 'https', hostname: 'image.rakuten.co.jp' },
      { protocol: 'https', hostname: '**.yimg.jp' }, // ← Yahoo 画像
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig; 