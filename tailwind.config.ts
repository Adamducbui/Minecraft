import type { Config } from 'tailwindcss';

// Cấu hình Tailwind CSS với màu sắc phong cách Minecraft
const config: Config = {
  // Tailwind quét các file này để biết class nào cần tạo CSS
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ===== MÀU SẮC MINECRAFT =====
      colors: {
        mc: {
          green: '#4ade80',       // Màu cỏ xanh (Grass)
          'dark-green': '#15803d', // Màu cỏ tối hơn
          brown: '#92400e',       // Màu đất (Dirt)
          'dark-brown': '#78350f', // Màu đất tối
          stone: '#6b7280',       // Màu đá (Stone)
          'dark-stone': '#374151', // Màu đá tối
          wood: '#d97706',        // Màu gỗ (Wood)
          sky: '#0f172a',         // Màu bầu trời đêm (Night sky)
          'sky-light': '#1e293b', // Màu bầu trời sáng hơn
          gold: '#fbbf24',        // Màu vàng (Gold)
          diamond: '#67e8f9',     // Màu kim cương (Diamond)
          red: '#ef4444',         // Màu đỏ (Fire/Nether)
        },
      },
      // ===== FONT CHỮ =====
      fontFamily: {
        // Font pixel cho tiêu đề (giống chữ trong Minecraft)
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      // ===== ANIMATION =====
      animation: {
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        // Hiệu ứng lơ lửng (floating)
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
