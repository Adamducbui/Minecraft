// app/mods/[id]/page.tsx - Trang chi tiết từng Mod/Map
// [id] là "dynamic segment" - Next.js tự lấy số từ URL
// Ví dụ: /mods/1 → id = "1", /mods/5 → id = "5"
// Server Component - không cần 'use client'

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import modsData from '@/data/mods.json';

// Định nghĩa kiểu dữ liệu đầy đủ của Mod
interface Mod {
  id: number;
  name: string;
  type: string;
  category: string;
  description: string;
  longDescription: string;
  emoji: string;
  color: string;
  version: string;
  downloads: string;
  installMethod: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  tags: string[];
}

// Props của trang - params chứa id từ URL
// Trong Next.js 15, params là Promise nên phải dùng await
interface PageProps {
  params: Promise<{ id: string }>;
}

// ===== GENERATE METADATA ĐỘNG =====
// Tạo title/description khác nhau cho từng mod
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const mod = modsData.find((m) => m.id === Number(id)) as Mod | undefined;

  if (!mod) {
    return { title: 'Không tìm thấy' };
  }

  return {
    title: `${mod.name} - ${mod.type === 'mod' ? 'Mod' : 'Map'}`,
    description: mod.description,
  };
}

// ===== GENERATE STATIC PARAMS =====
// Báo cho Next.js biết trước tất cả các id có thể có
// Giúp pre-render tất cả trang chi tiết lúc build (nhanh hơn)
export function generateStaticParams() {
  return modsData.map((mod) => ({
    id: String(mod.id),
  }));
}

// ===== TRANG CHI TIẾT =====
export default async function ModDetailPage({ params }: PageProps) {
  // Lấy id từ URL và tìm mod tương ứng
  const { id } = await params;
  const mod = modsData.find((m) => m.id === Number(id)) as Mod | undefined;

  // Nếu không tìm thấy mod với id này → hiện trang 404
  if (!mod) {
    notFound();
  }

  // Lấy 3 mod khác (không phải mod đang xem) để hiện phần "Xem thêm"
  const relatedMods = modsData
    .filter((m) => m.id !== mod.id && m.category === mod.category)
    .slice(0, 3);

  // Nếu không có mod cùng category thì lấy ngẫu nhiên
  const suggestions =
    relatedMods.length > 0
      ? relatedMods
      : modsData.filter((m) => m.id !== mod.id).slice(0, 3);

  return (
    <div className="page-enter">

      {/* ===== BREADCRUMB - Điều hướng phụ ===== */}
      <div className="bg-slate-900 border-b border-slate-800 py-3">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-mc-green transition-colors">Trang chủ</Link>
            <span>›</span>
            <Link href="/mods" className="hover:text-mc-green transition-colors">Mod & Map</Link>
            <span>›</span>
            <span className="text-gray-300">{mod.name}</span>
          </nav>
        </div>
      </div>

      {/* ===== HERO HEADER ===== */}
      <div
        className="py-14 border-b-4 border-black"
        style={{
          background: `linear-gradient(135deg, ${mod.color}33 0%, #0f172a 60%)`,
          borderBottomColor: mod.color,
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Icon lớn */}
            <div
              className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-6xl sm:text-7xl
                         border-4 border-black shrink-0"
              style={{
                backgroundColor: mod.color,
                boxShadow: '6px 6px 0px rgba(0,0,0,0.8)',
              }}
            >
              {mod.emoji}
            </div>

            {/* Thông tin cơ bản */}
            <div className="text-center sm:text-left">
              {/* Badge loại */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span
                  className="px-3 py-1 text-xs font-bold border-2 border-black text-white"
                  style={{
                    backgroundColor: mod.type === 'mod' ? '#1e40af' : '#065f46',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                  }}
                >
                  {mod.type === 'mod' ? '⚙️ MOD' : '🗺️ MAP'}
                </span>
                <span className="mc-badge text-mc-green border-mc-green text-xs px-3 py-1">
                  {mod.category}
                </span>
              </div>

              {/* Tên */}
              <h1
                className="font-pixel text-white text-lg sm:text-2xl md:text-3xl mb-3 leading-relaxed"
                style={{
                  textShadow: `2px 2px 0px ${mod.color}`,
                }}
              >
                {mod.name}
              </h1>

              {/* Thống kê nhanh */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
                <span className="text-gray-300">
                  📦 Phiên bản: <strong className="text-white">{mod.version}</strong>
                </span>
                <span className="text-gray-300">
                  ⬇️ Tải về: <strong className="text-mc-green">{mod.downloads}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NỘI DUNG CHI TIẾT ===== */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ===== CỘT TRÁI (2/3): Mô tả chi tiết ===== */}
          <div className="lg:col-span-2 space-y-8">

            {/* Mô tả đầy đủ */}
            <section>
              <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                  style={{ textShadow: '1px 1px 0px #15803d' }}>
                📋 Giới Thiệu
              </h2>
              <div className="mc-block bg-slate-800 p-6">
                <p className="text-gray-300 leading-relaxed">{mod.longDescription}</p>
              </div>
            </section>

            {/* Ưu và nhược điểm */}
            <section>
              <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                  style={{ textShadow: '1px 1px 0px #15803d' }}>
                ⚖️ Ưu & Nhược Điểm
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Ưu điểm */}
                <div className="mc-block bg-slate-800 p-5">
                  <h3 className="font-bold text-mc-green mb-3 flex items-center gap-2">
                    <span className="text-xl">✅</span> Ưu điểm
                  </h3>
                  <ul className="space-y-2">
                    {mod.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-mc-green mt-0.5 shrink-0">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nhược điểm */}
                <div className="mc-block bg-slate-800 p-5">
                  <h3 className="font-bold text-mc-red mb-3 flex items-center gap-2">
                    <span className="text-xl">⚠️</span> Nhược điểm
                  </h3>
                  <ul className="space-y-2">
                    {mod.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-red-400 mt-0.5 shrink-0">−</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Hướng dẫn cài đặt */}
            <section>
              <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                  style={{ textShadow: '1px 1px 0px #15803d' }}>
                🔧 Cách Cài Đặt
              </h2>
              <div className="mc-block bg-slate-800 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">📥</span>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phương thức cài:</p>
                    <p className="text-white font-medium">{mod.installMethod}</p>
                  </div>
                </div>

                {/* Các bước cài đặt dựa theo phương thức */}
                <div className="space-y-3 mt-4">
                  {mod.type === 'mod' ? (
                    // Hướng dẫn cài Mod
                    <>
                      {[
                        { step: 1, text: `Tải và cài đặt ${mod.installMethod.includes('Forge') ? 'Minecraft Forge' : mod.installMethod.includes('Fabric') ? 'Fabric Loader' : 'Java 17+'} cho Minecraft ${mod.version}` },
                        { step: 2, text: `Tải file .jar của ${mod.name} từ trang chính thức (CurseForge hoặc Modrinth)` },
                        { step: 3, text: 'Chép file .jar vào thư mục .minecraft/mods/' },
                        { step: 4, text: 'Khởi động Minecraft, chọn profile có mod loader, và chơi!' },
                      ].map(({ step, text }) => (
                        <div key={step} className="flex items-start gap-3">
                          <span
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold
                                       border-2 border-black text-black shrink-0 mt-0.5"
                            style={{ backgroundColor: mod.color }}
                          >
                            {step}
                          </span>
                          <p className="text-gray-300 text-sm">{text}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    // Hướng dẫn cài Map
                    <>
                      {[
                        { step: 1, text: `Tải file .zip của map ${mod.name}` },
                        { step: 2, text: 'Giải nén file .zip' },
                        { step: 3, text: 'Chép thư mục map vào .minecraft/saves/' },
                        { step: 4, text: 'Mở Minecraft → Singleplayer → chọn map và chơi!' },
                      ].map(({ step, text }) => (
                        <div key={step} className="flex items-start gap-3">
                          <span
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold
                                       border-2 border-black text-black shrink-0 mt-0.5"
                            style={{ backgroundColor: mod.color }}
                          >
                            {step}
                          </span>
                          <p className="text-gray-300 text-sm">{text}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Tags */}
            <section>
              <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                  style={{ textShadow: '1px 1px 0px #15803d' }}>
                🏷️ Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {mod.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/mods?search=${tag}`}
                    className="mc-badge text-mc-green border-mc-green text-sm px-3 py-1
                               hover:bg-mc-green hover:text-black transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* ===== CỘT PHẢI (1/3): Sidebar thông tin ===== */}
          <div className="space-y-6">

            {/* Thông tin kỹ thuật */}
            <div className="mc-block bg-slate-800 p-5">
              <h3 className="font-bold text-mc-green mb-4 text-sm border-b border-slate-700 pb-2">
                📊 Thông Tin
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Loại', value: mod.type === 'mod' ? 'Mod' : 'Map' },
                  { label: 'Danh mục', value: mod.category },
                  { label: 'Phiên bản', value: mod.version },
                  { label: 'Lượt tải', value: mod.downloads },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Yêu cầu hệ thống */}
            <div className="mc-block bg-slate-800 p-5">
              <h3 className="font-bold text-mc-green mb-4 text-sm border-b border-slate-700 pb-2">
                ⚠️ Yêu Cầu
              </h3>
              <ul className="space-y-2">
                {mod.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span
                      className="w-2 h-2 shrink-0"
                      style={{ backgroundColor: mod.color }}
                    />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nút quay lại */}
            <Link
              href="/mods"
              className="mc-button bg-slate-700 hover:bg-slate-600 w-full text-center block"
            >
              ← Quay lại danh sách
            </Link>
          </div>
        </div>

        {/* ===== XEM THÊM - Mod/Map liên quan ===== */}
        {suggestions.length > 0 && (
          <section className="mt-16">
            <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-6"
                style={{ textShadow: '1px 1px 0px #15803d' }}>
              👀 Xem Thêm
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {suggestions.map((related) => (
                <Link
                  key={related.id}
                  href={`/mods/${related.id}`}
                  className="mc-block bg-slate-800 overflow-hidden
                             hover:-translate-y-1 transition-transform duration-200 group"
                >
                  {/* Thumbnail */}
                  <div
                    className="h-28 flex items-center justify-center text-5xl"
                    style={{ backgroundColor: related.color }}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {related.emoji}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-white text-sm mb-1">{related.name}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
