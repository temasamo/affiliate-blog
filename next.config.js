/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
  images: {
    domains: [
      'images.unsplash.com', 
      'picsum.photos',
      'hbb.afl.rakuten.co.jp',
      'ad.jp.ap.valuecommerce.com',
      'm.media-amazon.com',
      'thumbnail.image.rakuten.co.jp',
      'i.moshimo.com',
      'a8.net',
      'www19.a8.net'
    ],
    unoptimized: true
  }
}

module.exports = nextConfig 