import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0D0F', // page
          900: '#101316', // panel
          850: '#14181C', // panel header / hover
          800: '#1A1F24', // raised
        },
        line: {
          DEFAULT: '#252B31',
          strong: '#363E46',
        },
        fg: {
          DEFAULT: '#E4E7EA',
          muted: '#A3ABB3',
          dim: '#7C858E',
        },
        accent: {
          DEFAULT: '#FF6A1A',
          dim: '#C9561A',
        },
        // Syntax-style accents, used only for values inside terminal blocks
        syn: {
          str: '#9CC28A',
          num: '#E0B05C',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
      },
      maxWidth: {
        frame: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
