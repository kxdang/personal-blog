const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '440px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Fraunces', ...defaultTheme.fontFamily.serif],
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: {
          50: '#fefbf0',
          100: '#fdf4d4',
          200: '#fbe8a8',
          300: '#f7d878',
          400: '#f0c050',
          500: '#d4a430',
          600: '#a87e20',
          700: '#7d5d18',
          800: '#573f12',
          900: '#36270b',
        },
        gray: {
          50: '#faf8f5',
          100: '#f0ebe3',
          200: '#d5d0c8',
          300: '#a8a4b0',
          400: '#8a8698',
          500: '#55516a',
          600: '#353045',
          700: '#252535',
          800: '#12121a',
          900: '#0a0a0f',
        },
        coral: '#f07068',
        mint: '#60d0a0',
        'accent-violet': '#b090e0',
        'accent-sky': '#60a8e8',
        peach: '#f0a070',
        gold: '#f0c050',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.primary.600'),
              backgroundColor: theme('colors.primary.50'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.875em',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.900') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.primary.300'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: `${theme('colors.primary.300')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
              fontFamily: "'Fraunces', Georgia, serif",
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.primary.400'),
              backgroundColor: 'rgba(240, 192, 80, 0.1)',
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.primary.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
