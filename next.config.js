/** @type {import('next').NextConfig} */
// Cấu hình Next.js
const nextConfig = {
  // Tối ưu ảnh - cho phép dùng ảnh từ internet
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

module.exports = nextConfig;
