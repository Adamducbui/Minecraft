// app/mods/page.tsx - Trang Mod & Map
// Server Component - đọc dữ liệu JSON và truyền cho Client Component
// Việc tách Server/Client như này là pattern chuẩn trong Next.js App Router:
//   - Server Component: đọc data, render HTML tĩnh (nhanh, tốt SEO)
//   - Client Component: xử lý tương tác người dùng (tìm kiếm, lọc)

import type { Metadata } from 'next';
import modsData from '@/data/mods.json';
import ModsContent from '@/components/ModsContent';

export const metadata: Metadata = {
  title: 'Mod & Map',
  description: 'Danh sách mod và map Minecraft hay nhất. Tìm kiếm và lọc theo danh mục.',
};

export default function ModsPage() {
  // Lấy danh sách category duy nhất từ data
  // new Set() loại bỏ trùng lặp, Array.from() chuyển Set thành Array
  const categories = Array.from(new Set(modsData.map((mod) => mod.category)));

  return (
    <div className="page-enter">

      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-indigo-950 to-slate-900 py-12 border-b-4 border-indigo-700">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">⚙️</div>
          <h1
            className="font-pixel text-indigo-300 text-base sm:text-xl mb-4"
            style={{ textShadow: '2px 2px 0px #1e1b4b' }}
          >
            Mod & Map
          </h1>
          <p className="text-indigo-200 text-base sm:text-lg max-w-2xl mx-auto">
            Khám phá bộ sưu tập mod và map Minecraft chất lượng cao.
            Tìm kiếm và lọc theo sở thích của bạn!
          </p>

          {/* Thống kê nhanh */}
          <div className="flex justify-center gap-6 mt-6 text-sm text-indigo-300">
            <span>
              <strong className="text-white">
                {modsData.filter((m) => m.type === 'mod').length}
              </strong>{' '}
              Mods
            </span>
            <span className="text-indigo-600">|</span>
            <span>
              <strong className="text-white">
                {modsData.filter((m) => m.type === 'map').length}
              </strong>{' '}
              Maps
            </span>
            <span className="text-indigo-600">|</span>
            <span>
              <strong className="text-white">{categories.length}</strong>{' '}
              Danh mục
            </span>
          </div>
        </div>
      </div>

      {/* ===== NỘI DUNG (Client Component xử lý tìm kiếm/lọc) ===== */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Truyền dữ liệu từ server xuống client component qua props */}
        <ModsContent mods={modsData} categories={categories} />
      </div>
    </div>
  );
}
