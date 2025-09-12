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
        // 使用 CSS 变量支持动态主题切换
        primary: {
          50: 'hsl(var(--primary-50) / <alpha-value>)',
          100: 'hsl(var(--primary-100) / <alpha-value>)',
          200: 'hsl(var(--primary-200) / <alpha-value>)',
          300: 'hsl(var(--primary-300) / <alpha-value>)',
          400: 'hsl(var(--primary-400) / <alpha-value>)',
          500: 'hsl(var(--primary-500) / <alpha-value>)',
          600: 'hsl(var(--primary-600) / <alpha-value>)',
          700: 'hsl(var(--primary-700) / <alpha-value>)',
          800: 'hsl(var(--primary-800) / <alpha-value>)',
          900: 'hsl(var(--primary-900) / <alpha-value>)',
          950: 'hsl(var(--primary-950) / <alpha-value>)',
        },
        secondary: {
          50: 'hsl(var(--secondary-50) / <alpha-value>)',
          100: 'hsl(var(--secondary-100) / <alpha-value>)',
          200: 'hsl(var(--secondary-200) / <alpha-value>)',
          300: 'hsl(var(--secondary-300) / <alpha-value>)',
          400: 'hsl(var(--secondary-400) / <alpha-value>)',
          500: 'hsl(var(--secondary-500) / <alpha-value>)',
          600: 'hsl(var(--secondary-600) / <alpha-value>)',
          700: 'hsl(var(--secondary-700) / <alpha-value>)',
          800: 'hsl(var(--secondary-800) / <alpha-value>)',
          900: 'hsl(var(--secondary-900) / <alpha-value>)',
        },
        accent: {
          primary: 'hsl(var(--accent-primary) / <alpha-value>)',
          secondary: 'hsl(var(--accent-secondary) / <alpha-value>)',
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
  plugins: [require('@tailwindcss/typography')],
};
