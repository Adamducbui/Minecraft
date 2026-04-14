// app/gamemodes/[slug]/page.tsx - Trang chi tiết từng chế độ chơi
// [slug] lấy từ URL: /gamemodes/survival, /gamemodes/creative, /gamemodes/hardcore
// Server Component

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import gamemodesData from '@/data/gamemodes.json';

// ===== KIỂU DỮ LIỆU =====
interface Feature {
  icon: string;
  title: string;
  desc: string;
}
interface Goal {
  step: number;
  title: string;
  desc: string;
}
interface Mob {
  name: string;
  emoji: string;
  danger: number;
  desc: string;
}
interface BuildingTip {
  icon: string;
  title: string;
  desc: string;
}
interface BlockIdea {
  theme: string;
  blocks: string[];
}
interface DeathCause {
  cause: string;
  emoji: string;
  percent: number;
  tip: string;
}

interface GameMode {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  difficulty: string;
  shortDesc: string;
  longDesc: string;
  features: Feature[];
  tips: string[];
  // Survival only
  mobs?: Mob[];
  goals?: Goal[];
  // Creative only
  buildingTips?: BuildingTip[];
  blockIdeas?: BlockIdea[];
  // Hardcore only
  deathCauses?: DeathCause[];
  rules?: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ===== METADATA ĐỘNG =====
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mode = gamemodesData.find((m) => m.slug === slug) as GameMode | undefined;
  if (!mode) return { title: 'Không tìm thấy' };
  return {
    title: `Chế Độ ${mode.name}`,
    description: mode.shortDesc,
  };
}

// Pre-render tất cả 3 trang
export function generateStaticParams() {
  return gamemodesData.map((m) => ({ slug: m.slug }));
}

// ===== COMPONENT PHỤ: Hiển thị mức độ nguy hiểm =====
function DangerBar({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-3 h-3 border border-black"
          style={{
            backgroundColor: i <= level ? '#ef4444' : '#374151',
          }}
        />
      ))}
    </div>
  );
}

// ===== TRANG CHÍNH =====
export default async function GameModeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mode = gamemodesData.find((m) => m.slug === slug) as GameMode | undefined;

  if (!mode) notFound();

  // Các chế độ khác để hiển thị phần "Xem thêm"
  const otherModes = gamemodesData.filter((m) => m.slug !== slug);

  return (
    <div className="page-enter">

      {/* ===== BREADCRUMB ===== */}
      <div className="bg-slate-900 border-b border-slate-800 py-3">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-mc-green transition-colors">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-300">Chế độ {mode.name}</span>
          </nav>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <div
        className="py-16 border-b-4 border-black"
        style={{
          background: `linear-gradient(135deg, ${mode.color}55 0%, #0f172a 70%)`,
          borderBottomColor: mode.color,
        }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-7xl mb-4">{mode.emoji}</div>
          <div
            className="inline-block px-3 py-1 text-xs font-bold border-2 border-black text-white mb-4"
            style={{
              backgroundColor: mode.color,
              boxShadow: '2px 2px 0px rgba(0,0,0,0.8)',
            }}
          >
            Độ khó: {mode.difficulty}
          </div>
          <h1
            className="font-pixel text-white text-xl sm:text-3xl mb-4 leading-loose"
            style={{ textShadow: `3px 3px 0px ${mode.color}` }}
          >
            {mode.name} Mode
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {mode.shortDesc}
          </p>
        </div>
      </div>

      {/* ===== NỘI DUNG ===== */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">

        {/* ----------------------------------------
            PHẦN 1: MÔ TẢ CHI TIẾT
        ---------------------------------------- */}
        <section>
          <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
              style={{ textShadow: '1px 1px 0px #15803d' }}>
            📋 Tổng Quan
          </h2>
          <div className="mc-block bg-slate-800 p-6">
            <p className="text-gray-300 leading-relaxed text-base">{mode.longDesc}</p>
          </div>
        </section>

        {/* ----------------------------------------
            PHẦN 2: ĐẶC ĐIỂM NỔI BẬT
        ---------------------------------------- */}
        <section>
          <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
              style={{ textShadow: '1px 1px 0px #15803d' }}>
            ✨ Đặc Điểm Chính
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mode.features.map((feat, i) => (
              <div key={i} className="mc-block bg-slate-800 p-5 flex gap-4">
                <span className="text-3xl shrink-0">{feat.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{feat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================
            NỘI DUNG RIÊNG TỪNG CHẾ ĐỘ
        ======================================== */}

        {/* === SURVIVAL: Mob nguy hiểm === */}
        {mode.mobs && (
          <section>
            <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                style={{ textShadow: '1px 1px 0px #15803d' }}>
              👾 Mob Nguy Hiểm Cần Biết
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {mode.mobs.map((mob) => (
                <div key={mob.name} className="mc-block bg-slate-800 p-4 flex gap-4 items-start">
                  <span className="text-4xl shrink-0">{mob.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-white">{mob.name}</h3>
                      <DangerBar level={mob.danger} />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{mob.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === SURVIVAL: Mục tiêu theo bước === */}
        {mode.goals && (
          <section>
            <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                style={{ textShadow: '1px 1px 0px #15803d' }}>
              🎯 Lộ Trình Tiến Triển
            </h2>
            <div className="space-y-3">
              {mode.goals.map((goal) => (
                <div key={goal.step} className="mc-block bg-slate-800 flex overflow-hidden">
                  <div
                    className="w-14 sm:w-16 flex items-center justify-center font-pixel text-white text-sm shrink-0"
                    style={{ backgroundColor: mode.color }}
                  >
                    {goal.step}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-1">{goal.title}</h3>
                    <p className="text-gray-400 text-sm">{goal.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === CREATIVE: Tips xây dựng === */}
        {mode.buildingTips && (
          <section>
            <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                style={{ textShadow: '1px 1px 0px #15803d' }}>
              🏗️ Tips Xây Dựng
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {mode.buildingTips.map((tip, i) => (
                <div key={i} className="mc-block bg-slate-800 p-5 flex gap-3">
                  <span className="text-2xl shrink-0">{tip.icon}</span>
                  <div>
                    <h3 className="font-bold text-mc-green mb-1 text-sm">{tip.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === CREATIVE: Ý tưởng block theo phong cách === */}
        {mode.blockIdeas && (
          <section>
            <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                style={{ textShadow: '1px 1px 0px #15803d' }}>
              🎨 Gợi Ý Block Theo Phong Cách
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {mode.blockIdeas.map((idea) => (
                <div key={idea.theme} className="mc-block bg-slate-800 p-5">
                  <h3 className="font-bold text-white mb-3">🏠 {idea.theme}</h3>
                  <div className="flex flex-wrap gap-2">
                    {idea.blocks.map((block) => (
                      <span
                        key={block}
                        className="px-2 py-1 text-xs border-2 border-black text-white"
                        style={{
                          backgroundColor: mode.color + '66',
                          boxShadow: '1px 1px 0px rgba(0,0,0,0.6)',
                        }}
                      >
                        {block}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === HARDCORE: Nguyên nhân chết phổ biến === */}
        {mode.deathCauses && (
          <section>
            <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                style={{ textShadow: '1px 1px 0px #15803d' }}>
              ☠️ Nguyên Nhân Chết Phổ Biến
            </h2>
            <div className="space-y-3">
              {mode.deathCauses.map((cause) => (
                <div key={cause.cause} className="mc-block bg-slate-800 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{cause.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-white">{cause.cause}</h3>
                        <span className="text-mc-red font-bold text-sm">{cause.percent}%</span>
                      </div>
                      {/* Thanh progress */}
                      <div className="w-full h-3 bg-slate-700 border border-slate-600">
                        <div
                          className="h-full border-r border-black"
                          style={{
                            width: `${cause.percent}%`,
                            backgroundColor: '#ef4444',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm ml-9">💡 {cause.tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === HARDCORE: Quy tắc sống còn === */}
        {mode.rules && (
          <section>
            <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
                style={{ textShadow: '1px 1px 0px #15803d' }}>
              📜 Quy Tắc Vàng Hardcore
            </h2>
            <div className="mc-block bg-slate-800 p-6">
              <ul className="space-y-3">
                {mode.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold
                                 border-2 border-black text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: mode.color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ----------------------------------------
            PHẦN CUỐI: TIPS CHUNG
        ---------------------------------------- */}
        <section>
          <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-4"
              style={{ textShadow: '1px 1px 0px #15803d' }}>
            💡 Tips & Mẹo
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {mode.tips.map((tip, i) => (
              <div
                key={i}
                className="mc-block bg-slate-800 p-4 flex items-start gap-3"
              >
                <span
                  className="w-6 h-6 flex items-center justify-center text-xs font-bold
                             border-2 border-black text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: mode.color }}
                >
                  {i + 1}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CÁC CHẾ ĐỘ KHÁC ===== */}
        <section>
          <h2 className="font-pixel text-mc-green text-xs sm:text-sm mb-6"
              style={{ textShadow: '1px 1px 0px #15803d' }}>
            🎮 Các Chế Độ Khác
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherModes.map((other) => (
              <Link
                key={other.slug}
                href={`/gamemodes/${other.slug}`}
                className="mc-block overflow-hidden hover:-translate-y-1 transition-transform duration-200 group"
              >
                <div
                  className="px-6 py-5 flex items-center gap-4"
                  style={{ backgroundColor: other.color }}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {other.emoji}
                  </span>
                  <div>
                    <h3 className="font-pixel text-white text-xs"
                        style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>
                      {other.name}
                    </h3>
                    <p className="text-xs text-white opacity-75 mt-1">
                      Độ khó: {other.difficulty}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-800 px-4 py-3">
                  <p className="text-gray-400 text-xs line-clamp-2">{other.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Nút quay lại */}
        <div className="flex gap-4">
          <Link href="/" className="mc-button bg-slate-700 hover:bg-slate-600">
            ← Trang chủ
          </Link>
          <Link href="/guide" className="mc-button bg-mc-green text-black">
            📖 Xem hướng dẫn
          </Link>
        </div>

      </div>
    </div>
  );
}
