'use client';
// ModsContent.tsx - Client Component xử lý tìm kiếm và lọc mod
// Cần 'use client' vì có state (tìm kiếm, bộ lọc) thay đổi khi người dùng tương tác

import { useState, useMemo } from 'react';

// Định nghĩa kiểu dữ liệu cho một Mod/Map (TypeScript)
// Interface giúp TypeScript hiểu cấu trúc object
interface Mod {
  id: number;
  name: string;
  type: string;
  category: string;
  description: string;
  emoji: string;
  color: string;
  version: string;
  downloads: string;
  tags: string[];
}

// Props: dữ liệu mods được truyền từ Server Component (page.tsx)
interface ModsContentProps {
  mods: Mod[];
  categories: string[]; // Danh sách category duy nhất
}

export default function ModsContent({ mods, categories }: ModsContentProps) {
  // ===== STATE =====
  // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  // Category đang lọc ('all' = hiện tất cả)
  const [activeCategory, setActiveCategory] = useState('all');
  // Loại: 'all', 'mod', 'map'
  const [activeType, setActiveType] = useState('all');

  // ===== LỌC MOD =====
  // useMemo: chỉ tính toán lại khi searchQuery, activeCategory, hoặc activeType thay đổi
  // Giúp tránh tính toán không cần thiết (tối ưu hiệu năng)
  const filteredMods = useMemo(() => {
    return mods.filter((mod) => {
      // Kiểm tra từ khóa tìm kiếm (không phân biệt chữ hoa/thường)
      const matchesSearch =
        searchQuery === '' ||
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Kiểm tra category
      const matchesCategory =
        activeCategory === 'all' || mod.category === activeCategory;

      // Kiểm tra loại (mod/map)
      const matchesType =
        activeType === 'all' || mod.type === activeType;

      // Chỉ hiện nếu thỏa mãn TẤT CẢ điều kiện
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [mods, searchQuery, activeCategory, activeType]);

  // ===== RENDER =====
  return (
    <div>
      {/* ===== THANH TÌM KIẾM VÀ LỌC ===== */}
      <div className="mc-block bg-slate-800 p-6 mb-8">

        {/* Input tìm kiếm */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm mod, map... (vd: OptiFine, survival)"
            value={searchQuery}
            // Cập nhật searchQuery mỗi khi người dùng gõ
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mc-input pl-10 text-sm"
          />
          {/* Nút xóa tìm kiếm */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Xóa tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Bộ lọc loại: All / Mod / Map */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="text-gray-500 text-sm self-center mr-1">Loại:</span>
          {[
            { value: 'all', label: '🎮 Tất cả' },
            { value: 'mod', label: '⚙️ Mod' },
            { value: 'map', label: '🗺️ Map' },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setActiveType(type.value)}
              className={`
                px-3 py-1.5 text-sm border-2 border-black transition-all
                ${activeType === type.value
                  ? 'bg-mc-green text-black font-bold'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }
              `}
              style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Bộ lọc category */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-gray-500 text-sm self-center mr-1">Danh mục:</span>
          {/* Nút "Tất cả" */}
          <button
            onClick={() => setActiveCategory('all')}
            className={`
              px-3 py-1 text-xs border-2 border-black transition-all
              ${activeCategory === 'all'
                ? 'bg-mc-gold text-black font-bold'
                : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }
            `}
            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
          >
            Tất cả
          </button>

          {/* Nút từng category */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1 text-xs border-2 border-black transition-all
                ${activeCategory === cat
                  ? 'bg-mc-gold text-black font-bold'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                }
              `}
              style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ===== KẾT QUẢ TÌM KIẾM ===== */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          Tìm thấy{' '}
          <strong className="text-mc-green">{filteredMods.length}</strong>
          {' '}kết quả
          {searchQuery && (
            <span> cho &ldquo;<span className="text-mc-gold">{searchQuery}</span>&rdquo;</span>
          )}
        </p>

        {/* Hiện nút reset filter nếu có filter đang áp dụng */}
        {(searchQuery || activeCategory !== 'all' || activeType !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveType('all');
            }}
            className="text-xs text-gray-400 hover:text-mc-green transition-colors"
          >
            ↺ Xóa bộ lọc
          </button>
        )}
      </div>

      {/* ===== DANH SÁCH MOD/MAP ===== */}
      {filteredMods.length > 0 ? (
        // Grid responsive: 1 cột mobile, 2 cột tablet, 3 cột desktop
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod) => (
            <div
              key={mod.id}
              className="mc-block bg-slate-800 overflow-hidden
                         hover:-translate-y-1 transition-transform duration-200 group"
            >
              {/* Thumbnail với màu và emoji */}
              <div
                className="h-40 flex flex-col items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: mod.color }}
              >
                {/* Emoji lớn ở giữa */}
                <span className="text-6xl group-hover:scale-110 transition-transform duration-200">
                  {mod.emoji}
                </span>

                {/* Badge loại (Mod/Map) ở góc trên phải */}
                <span
                  className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold border-2 border-black text-white"
                  style={{
                    backgroundColor: mod.type === 'mod' ? '#1e40af' : '#065f46',
                    boxShadow: '1px 1px 0px rgba(0,0,0,0.8)',
                  }}
                >
                  {mod.type === 'mod' ? 'MOD' : 'MAP'}
                </span>
              </div>

              {/* Thông tin mod */}
              <div className="p-4">
                {/* Tên và category */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-white text-base leading-tight">
                    {mod.name}
                  </h3>
                  <span className="mc-badge text-mc-green border-mc-green text-xs shrink-0 whitespace-nowrap">
                    {mod.category}
                  </span>
                </div>

                {/* Mô tả */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-3">
                  {mod.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {mod.tags.slice(0, 3).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs text-gray-500 hover:text-mc-green border border-slate-600
                                 hover:border-mc-green px-2 py-0.5 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                {/* Footer: version và downloads */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-slate-700">
                  <span>📦 v{mod.version}</span>
                  <span>⬇️ {mod.downloads}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Khi không có kết quả
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-pixel text-gray-400 text-sm mb-2">
            Không tìm thấy kết quả
          </h3>
          <p className="text-gray-500 text-sm">
            Thử tìm kiếm từ khóa khác hoặc{' '}
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); setActiveType('all'); }}
              className="text-mc-green hover:underline"
            >
              xóa bộ lọc
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
