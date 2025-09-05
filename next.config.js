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
  async redirects() {
    return [
      // 💤 枕関連記事（グループ1）
      {
        source: "/articles/sleep-health/knowledge/pillow-height-how-to-choose",
        destination: "/articles/sleep-health/pillow/group1/pillow-height-how-to-choose",
        permanent: true,
      },
      {
        source: "/articles/sleep-health/knowledge/pillow-material-comparison",
        destination: "/articles/sleep-health/pillow/group1/pillow-material-comparison",
        permanent: true,
      },
      {
        source: "/articles/sleep-health/knowledge/pillow-hardness-how-to-choose",
        destination: "/articles/sleep-health/pillow/group1/pillow-hardness-how-to-choose",
        permanent: true,
      },
      {
        source: "/articles/sleep-health/knowledge/pillow-for-shoulder-pain",
        destination: "/articles/sleep-health/pillow/group1/pillow-for-shoulder-pain",
        permanent: true,
      },
      {
        source: "/articles/sleep-health/knowledge/pillow-for-snoring",
        destination: "/articles/sleep-health/pillow/group1/pillow-for-snoring",
        permanent: true,
      },
      {
        source: "/articles/sleep-health/knowledge/pillow-summary",
        destination: "/articles/sleep-health/pillow/summary/group1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
