// Footer - Server Component (không cần 'use client' vì không có tương tác)
import Link from 'next/link';

export default function Footer() {
  // Lấy năm hiện tại để hiển thị trong copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t-4 border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* ===== 3 CỘT THÔNG TIN ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* --- Cột 1: Logo và mô tả --- */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-mc-green border-2 border-black flex items-center justify-center"
                   style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                <span>⛏️</span>
              </div>
              <span className="font-pixel text-mc-green text-xs"
                    style={{ textShadow: '1px 1px 0px #15803d' }}>
                MC World
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Website về Minecraft dành cho người mới và người chơi
              lâu năm. Học hỏi, khám phá và vui chơi cùng nhau!
            </p>
            {/* Block màu trang trí */}
            <div className="flex gap-1 mt-4">
              {[
                '#4ade80', // Grass green
                '#92400e', // Dirt brown
                '#6b7280', // Stone gray
                '#d97706', // Wood brown
                '#67e8f9', // Diamond blue
              ].map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 border border-black"
                  style={{
                    backgroundColor: color,
                    boxShadow: '1px 1px 0px rgba(0,0,0,0.6)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* --- Cột 2: Liên kết nhanh --- */}
          <div>
            <h3 className="text-mc-green font-bold mb-4 text-sm uppercase tracking-widest">
              Điều hướng
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/',        label: 'Trang Chủ' },
                { href: '/guide',   label: 'Hướng Dẫn' },
                { href: '/mods',    label: 'Mod & Map' },
                { href: '/about',   label: 'Giới Thiệu' },
                { href: '/contact', label: 'Liên Hệ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-mc-green text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-mc-green opacity-60">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Cột 3: Thông tin dự án --- */}
          <div>
            <h3 className="text-mc-green font-bold mb-4 text-sm uppercase tracking-widest">
              Về dự án
            </h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p className="flex items-start gap-2">
                <span>📚</span>
                <span>Dự án học sinh lớp 8 về Minecraft</span>
              </p>
              <p className="flex items-start gap-2">
                <span>💻</span>
                <span>Được xây dựng với Next.js & Tailwind CSS</span>
              </p>
              <p className="flex items-start gap-2">
                <span>🎮</span>
                <span>Minecraft © Mojang Studios</span>
              </p>
            </div>
          </div>
        </div>

        {/* ===== ĐƯỜNG KẺ PHÂN CÁCH ===== */}
        <div className="border-t border-slate-700 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} Minecraft World Website.
            Được tạo bằng{' '}
            <span className="text-mc-green">Next.js</span> &{' '}
            <span className="text-blue-400">Tailwind CSS</span>.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Website này không liên kết chính thức với Mojang Studios hay Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
