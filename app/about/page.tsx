// app/about/page.tsx - Trang Giới Thiệu
// Server Component - nội dung tĩnh, không cần tương tác

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Giới Thiệu',
  description: 'Lịch sử và thông tin về Minecraft - tựa game sandbox nổi tiếng nhất thế giới.',
};

// Lịch sử phát triển Minecraft
const timeline = [
  {
    year: '2009',
    title: 'Ý tưởng ra đời',
    description: 'Markus "Notch" Persson bắt đầu phát triển game có tên "Cave Game" vào tháng 5. Lấy cảm hứng từ Infiniminer và Dwarf Fortress.',
    emoji: '💡',
    color: '#f59e0b',
  },
  {
    year: '2010',
    title: 'Alpha ra mắt',
    description: 'Minecraft Alpha được phát hành. Cộng đồng người chơi ban đầu bắt đầu hình thành. Game đã có hệ thống crafting cơ bản.',
    emoji: '🌱',
    color: '#22c55e',
  },
  {
    year: '2011',
    title: 'Phiên bản chính thức 1.0',
    description: 'Ngày 18/11/2011, Minecraft 1.0 chính thức ra mắt tại MineCon ở Las Vegas. Game đã bán được hàng triệu bản trước khi ra mắt chính thức!',
    emoji: '🎉',
    color: '#3b82f6',
  },
  {
    year: '2012',
    title: 'Minecraft PE (Mobile)',
    description: 'Minecraft Pocket Edition ra mắt cho iOS và Android, đưa Minecraft lên di động. Mở ra thị trường người chơi mới khổng lồ.',
    emoji: '📱',
    color: '#8b5cf6',
  },
  {
    year: '2014',
    title: 'Microsoft mua lại Mojang',
    description: 'Microsoft mua lại Mojang với giá 2.5 tỷ đô la Mỹ. Notch rời công ty. Game tiếp tục phát triển mạnh mẽ hơn.',
    emoji: '🤝',
    color: '#0284c7',
  },
  {
    year: '2017',
    title: 'Minecraft Education Edition',
    description: 'Phiên bản dành cho giáo dục ra mắt, được dùng trong hàng nghìn trường học trên toàn thế giới để dạy học sinh.',
    emoji: '📚',
    color: '#d97706',
  },
  {
    year: '2019',
    title: 'Java & Bedrock thống nhất',
    description: 'Minecraft Bedrock (các nền tảng khác ngoài PC) được cập nhật để gần hơn với Java Edition. Cross-platform play được cải thiện.',
    emoji: '🔗',
    color: '#dc2626',
  },
  {
    year: '2023',
    title: 'Kỷ lục 238 triệu bản',
    description: 'Minecraft vượt mốc 238 triệu bản được bán, chính thức là game bán chạy nhất mọi thời đại, vượt qua cả Tetris và GTA V.',
    emoji: '🏆',
    color: '#fbbf24',
  },
];

// Các phiên bản chính
const editions = [
  {
    name: 'Java Edition',
    emoji: '☕',
    platforms: 'Windows, Mac, Linux',
    description: 'Phiên bản gốc dành cho PC. Hỗ trợ mod nhiều nhất, có mod loader như Forge và Fabric.',
    color: '#dc2626',
    features: ['Hỗ trợ mod phong phú', 'Server tùy chỉnh', 'Snapshot hàng tuần', 'Cộng đồng PC lớn'],
  },
  {
    name: 'Bedrock Edition',
    emoji: '💎',
    platforms: 'Win 10/11, Xbox, PS4/5, Mobile, Switch',
    description: 'Chạy mượt mà trên nhiều thiết bị. Cross-play với nhiều nền tảng khác nhau.',
    color: '#1d4ed8',
    features: ['Đa nền tảng', 'Cross-play', 'Marketplace', 'Hiệu năng tốt hơn'],
  },
  {
    name: 'Education Edition',
    emoji: '📚',
    platforms: 'Trường học, iPad, PC',
    description: 'Dành cho giáo dục. Có thêm tính năng dạy học, coding và thí nghiệm khoa học.',
    color: '#15803d',
    features: ['Bài học lập trình', 'Thí nghiệm hóa học', 'Công cụ giáo viên', 'Hàng nghìn bài học'],
  },
];

export default function AboutPage() {
  return (
    <div className="page-enter">

      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 py-12 border-b-4 border-mc-stone">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📜</div>
          <h1
            className="font-pixel text-slate-200 text-base sm:text-xl mb-4"
            style={{ textShadow: '2px 2px 0px #0f172a' }}
          >
            Giới Thiệu Minecraft
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Câu chuyện về tựa game thay đổi ngành công nghiệp trò chơi điện tử
            và trở thành hiện tượng văn hóa toàn cầu.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* ============================================================
            PHẦN 1: GIỚI THIỆU CHUNG
        ============================================================ */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-6"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            🌍 Minecraft là gì?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                <strong className="text-white">Minecraft</strong> là trò chơi điện tử thể loại
                sandbox và survival được phát triển bởi{' '}
                <strong className="text-mc-green">Mojang Studios</strong>.
                Game được tạo ra bởi lập trình viên người Thụy Điển{' '}
                <strong className="text-white">Markus &ldquo;Notch&rdquo; Persson</strong>.
              </p>
              <p>
                Điểm đặc biệt của Minecraft là thế giới game được tạo thành từ các{' '}
                <strong className="text-mc-green">khối vuông (block)</strong> —
                người chơi có thể tự do đào, đặt, xây dựng bất cứ thứ gì từ những khối này.
                Từ nhà đơn giản đến những thành phố khổng lồ, thậm chí cả máy tính trong Minecraft!
              </p>
              <p>
                Game không có &ldquo;mục tiêu cuối&rdquo; cụ thể (ngoài việc đánh bại Ender Dragon),
                người chơi tự tạo ra mục tiêu và trải nghiệm của riêng mình.
                Đây chính là lý do Minecraft không bao giờ nhàm chán!
              </p>
            </div>

            {/* Facts box */}
            <div className="mc-block bg-slate-800 p-6">
              <h3 className="font-bold text-mc-green mb-4 text-sm">📊 Thông Tin Nhanh</h3>
              <div className="space-y-3">
                {[
                  { label: 'Nhà phát triển', value: 'Mojang Studios' },
                  { label: 'Nhà phát hành', value: 'Microsoft Studios' },
                  { label: 'Thể loại', value: 'Sandbox / Survival' },
                  { label: 'Ra mắt', value: '18/11/2011' },
                  { label: 'Nền tảng', value: '40+ nền tảng' },
                  { label: 'Ngôn ngữ', value: 'Java (Java Ed.) / C++ (Bedrock)' },
                  { label: 'Xếp hạng', value: '#1 Game bán chạy mọi thời đại' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm border-b border-slate-700 pb-2">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            PHẦN 2: LỊCH SỬ TIMELINE
        ============================================================ */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-6"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            📅 Lịch Sử Phát Triển
          </h2>

          {/* Timeline dọc */}
          <div className="relative">
            {/* Đường kẻ dọc ở giữa (chỉ hiện trên desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2" />

            <div className="space-y-6">
              {timeline.map((event, i) => (
                <div
                  key={event.year}
                  // Xen kẽ trái phải trên desktop
                  className={`flex flex-col md:flex-row gap-4 md:gap-0 items-start
                    ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Nội dung */}
                  <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="mc-block bg-slate-800 p-5">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-2xl">{event.emoji}</span>
                        <span
                          className="font-pixel text-xs px-2 py-1"
                          style={{
                            backgroundColor: event.color,
                            color: 'white',
                            textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                          }}
                        >
                          {event.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Dấu chấm ở giữa (desktop) */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div
                      className="w-4 h-4 border-2 border-black mt-5"
                      style={{ backgroundColor: event.color }}
                    />
                  </div>

                  {/* Placeholder bên kia (desktop) */}
                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            PHẦN 3: CÁC PHIÊN BẢN
        ============================================================ */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-6"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            🎮 Các Phiên Bản Minecraft
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {editions.map((edition) => (
              <div
                key={edition.name}
                className="mc-block bg-slate-800 overflow-hidden"
              >
                {/* Header màu */}
                <div
                  className="px-6 py-5"
                  style={{ backgroundColor: edition.color }}
                >
                  <div className="text-4xl mb-2">{edition.emoji}</div>
                  <h3 className="font-pixel text-white text-xs"
                      style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>
                    {edition.name}
                  </h3>
                  <p className="text-xs text-white opacity-80 mt-1">{edition.platforms}</p>
                </div>

                <div className="p-5">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {edition.description}
                  </p>
                  <ul className="space-y-1">
                    {edition.features.map((feat) => (
                      <li key={feat} className="text-xs text-gray-400 flex items-center gap-2">
                        <span className="text-mc-green">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            PHẦN 4: TẠI SAO MINECRAFT VẪN PHỔ BIẾN?
        ============================================================ */}
        <section>
          <h2
            className="font-pixel text-mc-green text-sm sm:text-base mb-6"
            style={{ textShadow: '2px 2px 0px #15803d' }}
          >
            ❓ Tại Sao Minecraft Vẫn Phổ Biến?
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: '♾️',
                title: 'Vô tận nội dung',
                text: 'Thế giới được tạo ngẫu nhiên mỗi lần chơi. Không có hai thế giới giống nhau! Cộng thêm mod và map từ cộng đồng = không bao giờ hết thứ để làm.',
              },
              {
                icon: '🎓',
                title: 'Học qua chơi',
                text: 'Minecraft dạy tư duy logic, sáng tạo, quản lý tài nguyên và thậm chí lập trình (qua Redstone). Được dùng trong nhiều trường học trên thế giới.',
              },
              {
                icon: '👥',
                title: 'Cộng đồng khổng lồ',
                text: 'Hàng triệu người chơi, content creator, modder và map maker. Luôn có người tạo ra thứ mới cho cộng đồng.',
              },
              {
                icon: '🔄',
                title: 'Cập nhật liên tục',
                text: 'Mojang thường xuyên ra bản cập nhật mới với biome, mob, block và tính năng mới. Game không ngừng phát triển!',
              },
            ].map((reason) => (
              <div key={reason.title} className="mc-block bg-slate-800 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{reason.icon}</span>
                  <div>
                    <h3 className="font-bold text-mc-green mb-2">{reason.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{reason.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <div className="text-center">
          <Link href="/guide" className="mc-button bg-mc-green text-black mr-4">
            📖 Học Cách Chơi
          </Link>
          <Link href="/mods" className="mc-button bg-slate-700 text-white">
            ⚙️ Khám Phá Mod
          </Link>
        </div>
      </div>
    </div>
  );
}
