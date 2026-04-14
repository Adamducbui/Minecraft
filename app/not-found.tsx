// not-found.tsx - Trang 404 (khi người dùng vào đường dẫn không tồn tại)
// Next.js tự động dùng file này cho lỗi 404
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Không Tìm Thấy Trang',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">

        {/* Creeper icon */}
        <div className="text-8xl mb-6 animate-bounce">💣</div>

        {/* Tiêu đề lỗi */}
        <h1 className="font-pixel text-mc-red text-2xl sm:text-3xl mb-4"
            style={{ textShadow: '3px 3px 0px #7f1d1d' }}>
          404
        </h1>

        <h2 className="font-pixel text-mc-green text-sm sm:text-base mb-6"
            style={{ textShadow: '2px 2px 0px #15803d' }}>
          Trang này không tồn tại!
        </h2>

        {/* Hộp thông báo phong cách Minecraft */}
        <div className="mc-block bg-slate-800 p-6 mb-8 text-left">
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            <span className="text-mc-red">[ERROR]</span> Block không tìm thấy<br />
            <span className="text-yellow-400">[WARN]</span>  Có thể bạn đã gõ sai URL<br />
            <span className="text-mc-green">[TIP]</span>  Hãy quay về trang chủ!<br />
          </p>
        </div>

        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          Có vẻ trang bạn đang tìm kiếm đã bị Creeper phá hủy mất rồi.
          Hãy quay về trang chủ và thử lại nhé! 🕳️
        </p>

        {/* Nút quay về */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="mc-button bg-mc-green hover:bg-mc-dark-green text-black">
            🏠 Về Trang Chủ
          </Link>
          <Link href="/guide" className="mc-button bg-slate-700 hover:bg-slate-600">
            📖 Xem Hướng Dẫn
          </Link>
        </div>

        {/* Block trang trí phía dưới */}
        <div className="flex justify-center gap-2 mt-12">
          {['#4ade80', '#92400e', '#6b7280'].map((color, i) => (
            <div
              key={i}
              className="w-8 h-8 border-2 border-black opacity-40"
              style={{
                backgroundColor: color,
                boxShadow: '2px 2px 0px rgba(0,0,0,0.6)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
