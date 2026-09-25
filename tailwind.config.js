/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: "#061522",
        bgCard: "#0D293F",
        bgCardHover: "#113552",
        bgNavy: "#0A1F32",
        primaryCyan: "#00A8FF",
        primaryGlow: "#38D9FF",
        accentSuccess: "#22C88A",
        accentWarning: "#F5B942",
        accentDanger: "#F05260",
        cardBorder: "rgba(56, 217, 255, 0.15)",
        cardBorderHover: "rgba(56, 217, 255, 0.35)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 168, 255, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(56, 217, 255, 0.9))' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 168, 255, 0.2)',
        'cyber-lg': '0 0 35px rgba(56, 217, 255, 0.3)',
        'danger-glow': '0 0 25px rgba(240, 82, 96, 0.3)',
        'success-glow': '0 0 25px rgba(34, 200, 138, 0.3)',
      }
    },
  },
  plugins: [],
}
