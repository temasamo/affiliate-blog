/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.rakuten.co.jp' },
      { protocol: 'https', hostname: 'thumbnail.image.rakuten.co.jp' },
      { protocol: 'https', hostname: 'image.rakuten.co.jp' },
      { protocol: 'https', hostname: '**.yimg.jp' }, // ← Yahoo 画像
    ],
  },
};

module.exports = nextConfig; 