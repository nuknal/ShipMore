/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 启用基于类的深色模式
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9F2EC',
          100: '#F4E6D9',
          200: '#ECC8AF',
          300: '#E7AD99',
          400: '#E19E8C',
          500: '#CE796B',
          600: '#C76B5D',
          700: '#B85A4C',
          800: '#A44C3F',
          900: '#8A3F35',
          950: '#6D322A',
        },
        secondary: {
          50: '#F5F6F8',
          100: '#EBEDF0',
          200: '#D7DCE1',
          300: '#B9C2CC',
          400: '#8D99A6',
          500: '#6B7785',
          600: '#495867',
          700: '#3D4A57',
          800: '#333D47',
          900: '#242C34',
        },
        accent: {
          brown: '#C18C5D',
          coral: '#CE796B',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans"',
          '"Noto Sans SC"', // 思源黑体简体中文 (Google, Open Font License)
          '-apple-system', // 针对苹果系统
          'BlinkMacSystemFont', // 针对 Chrome/Edge/Safari on macOS

          // Emoji 字体 (通常是免费的，但添加以确保兼容性)
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"', // 注意：Segoe UI Emoji 虽然是微软的，但在Emoji字体栈中作为备选通常被接受
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"', // (Google, Open Font License)

          'ui-sans-serif', // 指向系统UI无衬线字体
          'system-ui', // 同上

          // 通用备选
          'sans-serif', // CSS 通用无衬线
        ],
        serif: [
          '"Noto Serif SC"', // 思源宋体简体中文 (Google, Open Font License)
          '"Source Han Serif SC"', // 同上，不同名称
          'serif', // CSS 通用衬线
        ],
        mono: [
          '"Noto Sans Mono"', // (Google, Open Font License)
          'ui-monospace', // 指向系统UI等宽字体
          '"Source Code Pro"', // (Adobe, Open Font License)
          'monospace', // CSS 通用等宽
        ],
      },
    },
  },
  plugins: [],
};
