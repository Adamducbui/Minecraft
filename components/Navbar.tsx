'use client';
// 'use client' vì Navbar cần xử lý click (toggle menu mobile)
// Nếu không có 'use client', component chỉ chạy trên server và không có tương tác

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Danh sách các trang trong menu điều hướng
// Thêm trang mới vào đây là đủ!
const navLinks = [
  { href: '/',         label: 'Trang Chủ',  emoji: '🏠' },
  { href: '/guide',    label: 'Hướng Dẫn',  emoji: '📖' },
  { href: '/mods',     label: 'Mod & Map',  emoji: '⚙️' },
  { href: '/about',    label: 'Giới Thiệu', emoji: '📜' },
  { href: '/contact',  label: 'Liên Hệ',   emoji: '✉️' },
];

export default function Navbar() {
  // State điều khiển menu mobile (true = mở, false = đóng)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // usePathname() trả về đường dẫn trang hiện tại (vd: "/guide")
  // Dùng để highlight link đang active
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900 border-b-4 border-mc-green sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ===== LOGO ===== */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Block logo vuông giống Minecraft */}
            <div className="w-10 h-10 bg-mc-green border-2 border-black flex items-center justify-center
                            group-hover:bg-mc-dark-green transition-colors"
                 style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
              <span className="text-lg">⛏️</span>
            </div>
            <span className="font-pixel text-mc-green text-xs hidden sm:block"
                  style={{ textShadow: '1px 1px 0px #15803d' }}>
              MC World
            </span>
          </Link>

          {/* ===== MENU DESKTOP (hiển thị từ màn hình md trở lên) ===== */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              // Kiểm tra link có đang active không
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-3 py-2 text-sm font-medium transition-all duration-150
                    border-b-2 hover:text-white
                    ${isActive
                      // Link active: nền xanh lá, chữ đen
                      ? 'border-mc-green text-mc-green bg-slate-800'
                      // Link bình thường: trong suốt, chữ xám
                      : 'border-transparent text-gray-400 hover:text-mc-green hover:border-mc-green/50'
                    }
                  `}
                >
                  <span className="mr-1.5">{link.emoji}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ===== NÚT HAMBURGER (chỉ hiện trên mobile) ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu khi click
            className="md:hidden p-2 text-gray-400 hover:text-mc-green
                       border border-transparent hover:border-mc-green/30
                       transition-colors rounded"
            aria-label="Mở/đóng menu"
          >
            {/* 3 gạch ngang tạo icon hamburger, biến thành X khi mở */}
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-current transition-all duration-300
                ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`block w-full h-0.5 bg-current transition-all duration-300
                ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-full h-0.5 bg-current transition-all duration-300
                ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* ===== MENU MOBILE (hiện khi nhấn hamburger) ===== */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} // Đóng menu sau khi chọn trang
                className={`
                  block px-4 py-3 text-sm font-medium
                  border-l-4 transition-colors
                  ${pathname === link.href
                    ? 'border-mc-green text-mc-green bg-slate-800'
                    : 'border-transparent text-gray-400 hover:text-mc-green hover:bg-slate-800'
                  }
                `}
              >
                <span className="mr-2">{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
