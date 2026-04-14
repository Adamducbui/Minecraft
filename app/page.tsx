// page.tsx - Trang chủ (Home)
// Server Component - chạy trên server, nhanh và tốt cho SEO
// Không cần 'use client' vì không có tương tác người dùng

import Link from 'next/link';
import type { Metadata } from 'next';
import modsData from '@/data/mods.json';

export const metadata: Metadata = {
  title: 'Trang Chủ',
  description: 'Khám phá thế giới Minecraft! Hướng dẫn, mod, map và cộng đồng Minecraft Việt Nam.',
};

// ===== DỮ LIỆU CÁC CHẾ ĐỘ CHƠI =====
const gameModes = [
  {
    slug: 'survival',
    name: 'Survival',
    emoji: '⚔️',
    bgColor: '#15803d',
    description: 'Thu thập tài nguyên, xây nhà, chiến đấu với mob quái vật và cố gắng sống sót qua đêm đen!',
    difficulty: 'Trung bình',
    tip: 'Mẹo: Xây nhà trước khi trời tối hoặc bạn sẽ bị zombie tấn công!',
  },
  {
    slug: 'creative',
    name: 'Creative',
    emoji: '🎨',
    bgColor: '#1d4ed8',
    description: 'Bay tự do, có đủ tất cả block trong kho đồ, không mất HP. Thỏa sức sáng tạo và xây dựng!',
    difficulty: 'Không có',
    tip: 'Mẹo: Nhấn F3+H để xem ID của block khi hover.',
  },
  {
    slug: 'hardcore',
    name: 'Hardcore',
    emoji: '💀',
    bgColor: '#991b1b',
    description: 'Giống Survival nhưng chỉ được chết 1 lần. Nếu chết, thế giới bị xóa vĩnh viễn. Thử thách tối thượng!',
    difficulty: 'Cực khó',
    tip: 'Mẹo: Chỉ dành cho người đã chơi Survival thành thục!',
  },
];

// ===== ĐÁNH GIÁ TỪ NGƯỜI CHƠI =====
const testimonials = [
  {
    name: 'NguyenVanMinh',
    avatar: '🧑',
    text: 'Minecraft giúp mình phát triển tư duy sáng tạo và kiên nhẫn rất nhiều. Đây là game tốt nhất!',
    hours: '500 giờ',
  },
  {
    name: 'TranThiLan',
    avatar: '👧',
    text: 'Mình bắt đầu chơi Minecraft từ lớp 3 và giờ vẫn yêu thích. Website này giúp mình tìm được nhiều mod hay!',
    hours: '1200 giờ',
  },
  {
    name: 'PhamTuanAnh',
    avatar: '👦',
    text: 'Nhờ hướng dẫn ở đây mà mình học được cách xây nhà đẹp và sinh tồn hiệu quả hơn nhiều!',
    hours: '350 giờ',
  },
];

// ===== THỐNG KÊ MINECRAFT =====
const stats = [
  { value: '238M+',  label: 'Bản đã bán',           color: '#15803d' },
  { value: '140M+',  label: 'Người chơi/tháng',      color: '#1d4ed8' },
  { value: '2011',   label: 'Năm ra mắt',             color: '#92400e' },
  { value: '40+',    label: 'Nền tảng hỗ trợ',        color: '#7c3aed' },
];

// ===== TRANG CHỦ =====
export default function HomePage() {
  // Lấy 3 mod đầu để hiển thị phần "Mod nổi bật"
  const featuredMods = modsData.slice(0, 3);

  return (
    <div className="page-enter"> {/* Hiệu ứng fade in khi vào trang */}

      {/* ============================================================
          PHẦN 1: HERO SECTION - Banner chào mừng
      ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900"
               style={{ minHeight: '85vh' }}>

        {/* Các ngôi sao trang trí (vị trí cố định để tránh lỗi hydration) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[
            { t: '8%', l: '12%' }, { t: '5%', l: '35%' }, { t: '12%', l: '60%' },
            { t: '3%', l: '80%' }, { t: '18%', l: '22%' }, { t: '7%', l: '50%' },
            { t: '15%', l: '75%' }, { t: '22%', l: '5%' }, { t: '10%', l: '90%' },
            { t: '25%', l: '45%' }, { t: '30%', l: '15%' }, { t: '20%', l: '68%' },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-50"
              style={{ top: pos.t, left: pos.l }}
            />
          ))}
        </div>

        {/* Nội dung Hero */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 flex flex-col items-center text-center">
          {/* Icon chính */}
          <div className="text-7xl sm:text-8xl mb-6 animate-bounce">⛏️</div>

          {/* Tiêu đề chính - dùng font Minecraft pixel */}
          <h1
            className="font-pixel text-mc-green text-xl sm:text-2xl md:text-3xl mb-6 leading-loose"
            style={{ textShadow: '3px 3px 0px #15803d' }}
          >
            Welcome to<br />
            Minecraft World
          </h1>

          {/* Mô tả ngắn */}
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
            Khám phá thế giới vô tận của Minecraft! Tìm hiểu cách chơi,
            khám phá mod hay nhất và trở thành bậc thầy thế giới vuông.
          </p>

          {/* Nút hành động */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/guide" className="mc-button bg-mc-green hover:bg-mc-dark-green text-black font-bold">
              📖 Bắt Đầu Học
            </Link>
            <Link href="/mods" className="mc-button bg-slate-700 hover:bg-slate-600">
              ⚙️ Xem Mod & Map
            </Link>
          </div>

          {/* Row block Minecraft trang trí */}
          <div className="mt-16 flex gap-2 sm:gap-3">
            {[
              '#4ade80', // Cỏ xanh
              '#92400e', // Đất nâu
              '#9ca3af', // Đá xám
              '#d97706', // Gỗ vàng
              '#67e8f9', // Kim cương
              '#ef4444', // Đất đỏ
              '#a855f7', // Obsidian tím
              '#fbbf24', // Vàng
            ].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black"
                style={{
                  backgroundColor: color,
                  boxShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PHẦN 2: GIỚI THIỆU MINECRAFT
      ============================================================ */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Cột trái: Mô tả */}
            <div>
              <h2
                className="font-pixel text-mc-green text-base sm:text-lg mb-6 leading-relaxed"
                style={{ textShadow: '2px 2px 0px #15803d' }}
              >
                🌍 Minecraft là gì?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-mc-green">Minecraft</strong> là trò chơi sandbox 3D nổi tiếng
                do <strong className="text-white">Markus Persson</strong> tạo ra và được{' '}
                <strong className="text-white">Mojang Studios</strong> phát triển, ra mắt năm 2011.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Trong game, thế giới được tạo bằng các khối vuông (block). Người chơi có thể
                phá block, đặt block để xây dựng bất cứ thứ gì họ tưởng tượng.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Với hơn <strong className="text-mc-gold">238 triệu bản</strong> được bán,
                Minecraft là game bán chạy nhất mọi thời đại, vượt qua cả GTA V và Tetris!
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['🎮 Sandbox', '🌍 Open World', '👥 Multiplayer', '📱 Đa nền tảng', '🛠️ Moddable'].map((tag) => (
                  <span key={tag} className="mc-badge text-mc-green border-mc-green text-xs px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Cột phải: Các con số thống kê dạng block */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="mc-block p-5 text-center"
                  style={{ backgroundColor: stat.color }}
                >
                  <div className="font-pixel text-white text-lg sm:text-2xl mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PHẦN 3: CÁC CHẾ ĐỘ CHƠI
      ============================================================ */}
      <section className="py-16 mc-dirt-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="font-pixel text-mc-green text-base sm:text-xl mb-3"
              style={{ textShadow: '2px 2px 0px #15803d' }}
            >
              🎮 Các Chế Độ Chơi
            </h2>
            <p className="text-gray-400">Mỗi chế độ mang lại trải nghiệm hoàn toàn khác nhau</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameModes.map((mode) => (
              <div
                key={mode.name}
                className="mc-block overflow-hidden"
                style={{ borderColor: 'black' }}
              >
                {/* Header màu nền */}
                <div
                  className="px-6 pt-6 pb-4"
                  style={{ backgroundColor: mode.bgColor }}
                >
                  <div className="text-4xl mb-2">{mode.emoji}</div>
                  <h3
                    className="font-pixel text-white text-sm"
                    style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
                  >
                    {mode.name}
                  </h3>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-black bg-opacity-30 text-white text-xs">
                    Độ khó: {mode.difficulty}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 bg-slate-800">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {mode.description}
                  </p>
                  {/* Hộp tip */}
                  <div className="border-l-4 border-mc-gold pl-3 text-xs text-gray-400 italic mb-4">
                    {mode.tip}
                  </div>
                  {/* Nút xem chi tiết */}
                  <Link
                    href={`/gamemodes/${mode.slug}`}
                    className="block w-full text-center py-2 text-sm font-bold
                               border-2 border-black text-white transition-all
                               hover:brightness-110 active:translate-y-[1px]"
                    style={{
                      backgroundColor: mode.bgColor,
                      boxShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                    }}
                  >
                    Xem Chi Tiết →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PHẦN 4: MOD NỔI BẬT
      ============================================================ */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="font-pixel text-mc-green text-base sm:text-lg"
              style={{ textShadow: '2px 2px 0px #15803d' }}
            >
              ⭐ Mod Nổi Bật
            </h2>
            <Link
              href="/mods"
              className="text-mc-green text-sm hover:text-mc-dark-green transition-colors"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMods.map((mod) => (
              <div
                key={mod.id}
                className="mc-block bg-slate-800 overflow-hidden
                           hover:-translate-y-1 hover:shadow-lg transition-transform duration-200"
              >
                {/* Thumbnail màu với emoji */}
                <div
                  className="h-36 flex items-center justify-center text-6xl"
                  style={{ backgroundColor: mod.color }}
                >
                  {mod.emoji}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-white">{mod.name}</h3>
                    <span className="mc-badge text-mc-green border-mc-green text-xs shrink-0">
                      {mod.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {mod.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 mb-3 text-xs text-gray-500">
                    <span>📦 v{mod.version}</span>
                    <span>⬇️ {mod.downloads}</span>
                  </div>
                  {/* Nút xem chi tiết mod */}
                  <Link
                    href={`/mods/${mod.id}`}
                    className="block w-full text-center py-2 text-sm font-bold
                               border-2 border-black text-white transition-all
                               hover:brightness-110 active:translate-y-[1px]"
                    style={{
                      backgroundColor: mod.color,
                      boxShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                    }}
                  >
                    Xem Chi Tiết →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PHẦN 5: ĐÁNH GIÁ NGƯỜI CHƠI
      ============================================================ */}
      <section className="py-16 mc-stone-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="font-pixel text-mc-green text-base sm:text-xl mb-3"
              style={{ textShadow: '2px 2px 0px #15803d' }}
            >
              💬 Người Chơi Nói Gì?
            </h2>
            <p className="text-gray-400">Ý kiến từ cộng đồng Minecraft Việt Nam</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <div key={i} className="mc-block bg-slate-800 p-6">
                {/* Avatar và tên */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{review.avatar}</div>
                  <div>
                    <div className="font-bold text-mc-green text-sm">{review.name}</div>
                    <div className="text-xs text-gray-500">⏱️ {review.hours} chơi</div>
                  </div>
                </div>

                {/* Nội dung đánh giá */}
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Sao đánh giá */}
                <div className="mt-4 text-mc-gold text-sm">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PHẦN 6: CALL TO ACTION - Khuyến khích hành động
      ============================================================ */}
      <section className="py-16 bg-gradient-to-r from-mc-dark-green to-mc-green">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2
            className="font-pixel text-black text-base sm:text-xl mb-4"
            style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.2)' }}
          >
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-slate-800 mb-8 text-base sm:text-lg">
            Đọc hướng dẫn dành cho người mới và bắt đầu cuộc phiêu lưu của bạn ngay hôm nay!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guide" className="mc-button bg-black text-mc-green hover:bg-slate-900">
              📖 Đọc Hướng Dẫn
            </Link>
            <Link href="/mods" className="mc-button bg-slate-800 text-white hover:bg-slate-700">
              ⚙️ Tìm Mod Hay
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
