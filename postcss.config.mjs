// Cấu hình PostCSS - cần thiết để Tailwind CSS hoạt động
const config = {
  plugins: {
    tailwindcss: {},   // Xử lý Tailwind CSS
    autoprefixer: {},  // Tự động thêm prefix cho CSS (giúp hỗ trợ nhiều trình duyệt hơn)
  },
};

export default config;
