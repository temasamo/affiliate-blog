/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.rakuten.co.jp' },
      { protocol: 'https', hostname: 'thumbnail.image.rakuten.co.jp' },
      { protocol: 'https', hostname: 'image.rakuten.co.jp' },
      { protocol: 'https', hostname: '**.yimg.jp' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
  // Vercel運用では output:'export' は不要。もし存在していたら入れないこと。
  async redirects() {
    return [
      { source: '/travel/onsen/gifu/index', destination: '/travel/onsen/gifu', permanent: true },
      // 必要に応じて他の旧URLもここに追加
    ];
  },
};

module.exports = nextConfig;
