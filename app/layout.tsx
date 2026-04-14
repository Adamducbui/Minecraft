// layout.tsx - Layout gốc, bao bọc TẤT CẢ các trang
// Server Component - không cần 'use client'
// Mọi thứ viết ở đây sẽ xuất hiện trên mọi trang của website

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Cấu hình font Inter (font chính cho body text)
// next/font tự động tối ưu font, không gây layout shift
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// ===== METADATA SEO =====
// Giúp Google và các mạng xã hội hiểu website của bạn
export const metadata: Metadata = {
  title: {
    default: 'Minecraft World - Khám Phá Thế Giới Minecraft',
    // Template cho các trang con: "Hướng Dẫn | Minecraft World"
    template: '%s | Minecraft World',
  },
  description:
    'Website hướng dẫn Minecraft, tổng hợp mod, map và mọi thứ về Minecraft dành cho người mới và người chơi lâu năm tại Việt Nam.',
  keywords: ['minecraft', 'mod', 'map', 'hướng dẫn', 'survival', 'creative', 'hardcore'],
  // Open Graph: thông tin khi chia sẻ lên Facebook/Zalo
  openGraph: {
    title: 'Minecraft World',
    description: 'Khám phá thế giới Minecraft cùng chúng tôi!',
    type: 'website',
    locale: 'vi_VN',
  },
};

// RootLayout nhận `children` - đây là nội dung của từng trang
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Import font pixel từ Google Fonts */}
        {/* Preconnect giúp tải font nhanh hơn */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-mc-sky text-slate-100 min-h-screen flex flex-col`}>
        {/* Thanh điều hướng - xuất hiện trên mọi trang */}
        <Navbar />

        {/* Nội dung chính của từng trang */}
        {/* flex-1 giúp main chiếm không gian còn lại, đẩy footer xuống cuối */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer - xuất hiện trên mọi trang */}
        <Footer />
      </body>
    </html>
  );
}
