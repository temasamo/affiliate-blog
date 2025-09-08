/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // next/image を使う場合のホワイトリスト（お好みで）
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.rakuten.co.jp' },
      { protocol: 'https', hostname: 'thumbnail.image.rakuten.co.jp' },
      { protocol: 'https', hostname: 'image.rakuten.co.jp' },
      { protocol: 'https', hostname: '**.yimg.jp' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      // 追加：Wikimedia
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: '*.wikimedia.org' },
      { protocol: 'https', hostname: '*.wikipedia.org' },
    ],
  },

  async headers() {
    // ここでCSPを許可。既に headers() がある場合は img-src の行に追記してください。
    const csp = [
      // 必要に応じて default-src など他ディレクティブも統合
      "img-src 'self' data: blob: https: https://upload.wikimedia.org https://*.wikimedia.org https://*.wikipedia.org",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          // 他のヘッダを使っていればそれもここへ
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/travel/onsen/gifu/index', destination: '/travel/onsen/gifu', permanent: true },
    ];
  },
};

module.exports = nextConfig;
