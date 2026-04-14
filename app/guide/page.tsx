// app/guide/page.tsx - Trang Hướng Dẫn
// Server Component - hiển thị nội dung tĩnh, không cần 'use client'

import type { Metadata } from 'next';
import Link from 'next/link';

// Metadata riêng cho trang này
export const metadata: Metadata = {
  title: 'Hướng Dẫn',
  description: 'Hướng dẫn chơi Minecraft từ cơ bản đến nâng cao. Cách sinh tồn ngày đầu, crafting cơ bản và tips cho người mới.',
};

// ===== DỮ LIỆU HƯỚNG DẪN =====

// Cách chơi cơ bản
const basicControls = [
  { key: 'WASD',      action: 'Di chuyển nhân vật' },
  { key: 'Space',     action: 'Nhảy (double space để bay trong Creative)' },
  { key: 'Shift',     action: 'Ngồi / giữ để không ngã khỏi block' },
  { key: 'Chuột trái',action: 'Phá block / tấn công' },
  { key: 'Chuột phải',action: 'Đặt block / tương tác' },
  { key: 'E',         action: 'Mở kho đồ (Inventory)' },
  { key: 'F',         action: 'Nhặt / bỏ item trong tay' },
  { key: 'Tab',       action: 'Xem danh sách người chơi (online)' },
  { key: 'T',         action: 'Mở chat' },
  { key: 'F3',        action: 'Xem thông số debug (tọa độ, FPS...)' },
];

// Hướng dẫn sinh tồn ngày đầu
const day1Steps = [
  {
    step: 1,
    title: 'Thu thập gỗ ngay lập tức',
    description: 'Nhấn giữ chuột trái vào cây để chặt gỗ. Thu thập ít nhất 20-30 gỗ để có đủ vật liệu ban đầu.',
    tip: 'Bạn không cần rìu để chặt cây tay không, nhưng sẽ chậm hơn.',
    emoji: '🌳',
  },
  {
    step: 2,
    title: 'Chế tạo bàn Crafting Table',
    description: 'Mở Inventory (E), đặt 4 gỗ vào 4 ô crafting 2x2 → nhận 4 Planks. Dùng 4 Planks để tạo Crafting Table.',
    tip: 'Crafting Table (4 Planks theo hình vuông 2x2) là bước đầu tiên bắt buộc!',
    emoji: '🔨',
  },
  {
    step: 3,
    title: 'Làm rìu và cuốc đầu tiên',
    description: 'Dùng Crafting Table làm Wooden Pickaxe (3 Planks + 2 Sticks) để đào đá. Sau đó làm Stone Tools từ đá Cobblestone.',
    tip: 'Stone Tools mạnh hơn Wood Tools rất nhiều, nâng cấp sớm nhất có thể!',
    emoji: '⛏️',
  },
  {
    step: 4,
    title: 'Đào đá và than (Coal)',
    description: 'Đào vào sườn núi để tìm Cobblestone và Coal (đá đen với đốm đen). Coal dùng để làm Torches - cực kỳ quan trọng!',
    tip: 'Tìm Gravel Cave hoặc sườn núi để tìm Coal dễ hơn.',
    emoji: '⛰️',
  },
  {
    step: 5,
    title: 'Xây nhà trú ẩn trước 7 giờ tối',
    description: 'Trước khi trời tối (khoảng 10 phút game), xây một căn nhà đơn giản bằng Cobblestone hoặc Dirt. Bảo vệ bạn khỏi mob đêm!',
    tip: 'Nhà dirt đơn giản nhất: đào hố sâu vào đất và bịt cửa. Nhanh và hiệu quả!',
    emoji: '🏠',
  },
  {
    step: 6,
    title: 'Làm giường ngủ (Bed)',
    description: '3 Wool (từ cừu) + 3 Planks theo hàng ngang = 1 Bed. Ngủ để skip đêm và đặt spawn point mới.',
    tip: 'Cừu thường xuất hiện ở đồng cỏ. Dùng kéo (Shears) để lấy Wool không giết cừu.',
    emoji: '🛏️',
  },
];

// Công thức crafting cơ bản
const craftingRecipes = [
  {
    name: 'Crafting Table',
    emoji: '🔲',
    materials: '4 Wood Planks (hình vuông 2x2)',
    use: 'Bàn craft với ô 3x3, cần cho hầu hết công thức',
    color: '#92400e',
  },
  {
    name: 'Wooden Pickaxe',
    emoji: '⛏️',
    materials: '3 Planks (hàng trên) + 2 Sticks (hình chữ T)',
    use: 'Đào đá cơ bản, cần để làm Stone Pickaxe',
    color: '#d97706',
  },
  {
    name: 'Torches (4 cái)',
    emoji: '🕯️',
    materials: '1 Coal + 1 Stick (dọc)',
    use: 'Chiếu sáng ngăn mob spawn, cực kỳ cần thiết',
    color: '#f59e0b',
  },
  {
    name: 'Furnace',
    emoji: '🔥',
    materials: '8 Cobblestone (hình chữ O, bỏ ô giữa)',
    use: 'Nấu quặng, nấu thức ăn, nung đất sét...',
    color: '#dc2626',
  },
  {
    name: 'Sword',
    emoji: '⚔️',
    materials: '2 Planks/Stone/Iron (dọc) + 1 Stick bên dưới',
    use: 'Vũ khí chiến đấu cơ bản',
    color: '#6b7280',
  },
  {
    name: 'Chest',
    emoji: '📦',
    materials: '8 Planks (hình chữ O, bỏ ô giữa)',
    use: 'Lưu trữ đồ, đặt 2 chest cạnh nhau = Large Chest',
    color: '#78350f',
  },
];

// Tips cho người mới
const beginnerTips = [
  {
    icon: '💡',
    title: 'Luôn mang Torch',
    description: 'Đặt Torch trong nhà và hang để mob không spawn. Ánh sáng level ≥ 8 sẽ ngăn mob sinh ra.',
  },
  {
    icon: '🍖',
    title: 'Không để đói',
    description: 'Thanh thức ăn (Hunger bar) giảm xuống dưới 6/10 sẽ không hồi HP tự động. Luôn mang theo thức ăn!',
  },
  {
    icon: '💎',
    title: 'Đào ở độ cao Y=11',
    description: 'Diamond và tài nguyên quý thường xuất hiện ở độ sâu Y=11 đến Y=16. Nhấn F3 để xem tọa độ.',
  },
  {
    icon: '🏃',
    title: 'Không đào thẳng xuống',
    description: '"Never dig straight down!" - Nguyên tắc vàng của Minecraft. Dễ rơi vào lava hoặc hố sâu!',
  },
  {
    icon: '🧭',
    title: 'Ghi nhớ tọa độ nhà',
    description: 'Nhấn F3 để xem tọa độ XYZ. Ghi tọa độ nhà ra giấy hoặc đặt Waypoint trong mod JourneyMap.',
  },
  {
    icon: '⚔️',
    title: 'Chiến đấu thông minh',
    description: 'Click chuột trái ở đúng thời điểm (khi thanh sword đầy) sẽ gây sát thương tối đa (Critical Hit).',
  },
  {
    icon: '🔧',
    title: 'Sửa đồ bằng Anvil',
    description: 'Khi đồ sắp vỡ (màu đỏ), dùng Anvil để sửa bằng vật liệu cùng loại. Đừng để đồ quý bị vỡ!',
  },
  {
    icon: '🌙',
    title: 'Ngủ qua đêm',
    description: 'Luôn có Bed trong nhà. Ngủ qua đêm để tránh mob và đặt lại spawn point nếu chết.',
  },
];

// ===== COMPONENT TRANG HƯỚNG DẪN =====
export default function GuidePage() {
  return (
    <div className="page-enter">

      {/* ===== HERO HEADER ===== */}
      <div className="bg-gradient-to-r from-amber-950 to-amber-900 py-12 border-b-4 border-mc-wood">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📖</div>
          <h1
            className="font-pixel text-mc-gold text-base sm:text-xl mb-4"
            style={{ textShadow: '2px 2px 0px #78350f' }}
          >
            Hướng Dẫn Minecraft
          </h1>
          <p className="text-amber-200 text-base sm:text-lg max-w-2xl mx-auto">
            Từ người mới chưa biết gì đến người chơi thành thạo —
            tất cả bạn cần để bắt đầu cuộc phiêu lưu!
          </p>
        </div>
      </div>

      {/* ===== NỘI DUNG CHÍNH ===== */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* ----------------------------------------
            SECTION 1: ĐIỀU KHIỂN CƠ BẢN
        ---------------------------------------- */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-2"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            🕹️ Điều Khiển Cơ Bản
          </h2>
          <p className="text-gray-400 mb-6">Các phím tắt quan trọng cần biết khi bắt đầu</p>

          {/* Bảng điều khiển */}
          <div className="mc-block bg-slate-800 overflow-hidden">
            <div className="grid grid-cols-2 gap-px bg-slate-700">
              {/* Header */}
              <div className="bg-slate-900 px-4 py-2 text-mc-green font-bold text-sm">Phím / Nút</div>
              <div className="bg-slate-900 px-4 py-2 text-mc-green font-bold text-sm">Chức năng</div>

              {/* Các hàng điều khiển */}
              {basicControls.map((ctrl, i) => (
                <>
                  <div
                    key={`key-${i}`}
                    className="bg-slate-800 px-4 py-3 border-t border-slate-700"
                  >
                    {/* Hiển thị phím như nút bàn phím */}
                    <kbd className="bg-slate-700 text-mc-gold px-2 py-1 text-xs border border-slate-600 font-mono">
                      {ctrl.key}
                    </kbd>
                  </div>
                  <div
                    key={`action-${i}`}
                    className="bg-slate-800 px-4 py-3 text-gray-300 text-sm border-t border-slate-700 flex items-center"
                  >
                    {ctrl.action}
                  </div>
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            SECTION 2: SINH TỒN NGÀY ĐẦU
        ---------------------------------------- */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-2"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            🌅 Sinh Tồn Ngày Đầu
          </h2>
          <p className="text-gray-400 mb-6">
            Làm theo 6 bước này và bạn sẽ sống sót qua đêm đầu tiên!
          </p>

          {/* Timeline các bước */}
          <div className="space-y-4">
            {day1Steps.map((step) => (
              <div
                key={step.step}
                className="mc-block bg-slate-800 p-0 overflow-hidden
                           flex flex-col sm:flex-row"
              >
                {/* Số bước */}
                <div className="sm:w-20 bg-mc-green flex items-center justify-center p-4 text-3xl shrink-0">
                  {step.emoji}
                </div>

                <div className="p-5 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-pixel text-mc-gold text-xs">
                      Bước {step.step}
                    </span>
                    <h3 className="font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  {/* Tip */}
                  <div className="bg-slate-900 border-l-4 border-mc-gold px-3 py-2 text-xs text-gray-400 italic">
                    💡 {step.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------
            SECTION 3: CÔNG THỨC CRAFTING CƠ BẢN
        ---------------------------------------- */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-2"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            🔨 Crafting Cơ Bản
          </h2>
          <p className="text-gray-400 mb-6">
            Những công thức chế tạo quan trọng nhất bạn cần nhớ
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {craftingRecipes.map((recipe) => (
              <div key={recipe.name} className="mc-block bg-slate-800 p-0 overflow-hidden flex">
                {/* Icon màu */}
                <div
                  className="w-16 sm:w-20 flex items-center justify-center text-3xl shrink-0"
                  style={{ backgroundColor: recipe.color }}
                >
                  {recipe.emoji}
                </div>

                <div className="p-4 flex-1">
                  <h3 className="font-bold text-white text-sm mb-1">{recipe.name}</h3>
                  <p className="text-mc-gold text-xs mb-2">
                    📋 {recipe.materials}
                  </p>
                  <p className="text-gray-400 text-xs">{recipe.use}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gợi ý xem thêm */}
          <div className="mt-6 mc-block bg-slate-800 p-4 text-center">
            <p className="text-gray-400 text-sm">
              💡 Bạn có thể xem toàn bộ công thức trong game bằng cách nhấn{' '}
              <kbd className="bg-slate-700 text-mc-gold px-2 py-0.5 text-xs border border-slate-600">
                E
              </kbd>{' '}
              hoặc cài mod{' '}
              <strong className="text-mc-green">Just Enough Items (JEI)</strong>
            </p>
          </div>
        </section>

        {/* ----------------------------------------
            SECTION 4: TIPS CHO NGƯỜI MỚI
        ---------------------------------------- */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-2"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            💡 Tips Cho Người Mới
          </h2>
          <p className="text-gray-400 mb-6">
            Những mẹo quan trọng giúp bạn chơi tốt hơn ngay lập tức
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {beginnerTips.map((tip, i) => (
              <div key={i} className="mc-block bg-slate-800 p-5 hover:-translate-y-0.5 transition-transform">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{tip.icon}</span>
                  <div>
                    <h3 className="font-bold text-mc-green text-sm mb-1">{tip.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA - Bước tiếp theo ===== */}
        <div className="mc-block bg-mc-dark-green p-8 text-center">
          <div className="text-4xl mb-3">🎮</div>
          <h3
            className="font-pixel text-white text-sm mb-3"
            style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
          >
            Đã sẵn sàng?
          </h3>
          <p className="text-green-100 text-sm mb-6">
            Bây giờ bạn đã có đủ kiến thức cơ bản. Hãy khám phá thêm Mod & Map để làm phong phú trải nghiệm!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mods" className="mc-button bg-black text-mc-green hover:bg-slate-900">
              ⚙️ Xem Mod & Map
            </Link>
            <Link href="/about" className="mc-button bg-slate-700 hover:bg-slate-600">
              📜 Lịch Sử Minecraft
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
