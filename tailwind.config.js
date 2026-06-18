/**
 * Trust School of Communications (T-SOC)
 * Production-Ready Design System Specification
 * Tailwind CSS Configuration Standards
 * 
 * Generated with absolute executive-level constraint validation.
 */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Trust Navy - Deep, authoritative, institutional, and stable bases.
        navy: {
          50: '#F0F4FA',
          100: '#DBE5F4',
          200: '#BACCE7',
          300: '#8FAAD5',
          400: '#5E83C0',
          500: '#395FA3',
          600: '#2A4B86',
          700: '#1F3867',
          800: '#132549', // Trust Navy Core
          900: '#0A142A', // Elite Navy Accent
          950: '#050B18',
        },
        // Secondary: Executive Slate - Intellectual, quiet, clear neutral with slate undertones.
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569', // Executive Slate Core
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Accent: Credibility Teal - Sharp, modern intelligence, signaling clarity and wisdom.
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#0D9488', // Credibility Teal Core
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        // Status Colors - Dignified tone, zero neon/screaming glow elements.
        status: {
          success: {
            DEFAULT: '#15803D', // Muted Emerald Rich
            light: '#DCFCE7',
            dark: '#166534',
          },
          warning: {
            DEFAULT: '#B45309', // Muted Gold Amber
            light: '#FEF3C7',
            dark: '#92400E',
          },
          error: {
            DEFAULT: '#B91C1C', // Dignified Crimson
            light: '#FEE2E2',
            dark: '#991B1B',
          }
        }
      },
      fontFamily: {
        // Pure high-legibility system pairings and Inter font standard.
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'monospace'
        ]
      },
      fontSize: {
        // Formal Typography Hierarchy - explicit size & leading bindings.
        'hero': ['3.5rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.025em' }], // 56px
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.020em' }],    // 40px
        'h2': ['1.75rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.015em' }],  // 28px
        'h3': ['1.25rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.010em' }],   // 20px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],                              // 16px
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.020em' }] // 12px
      },
      transitionTimingFunction: {
        // Decelerating institutional curve: Ultra-smooth, elegant entry.
        'executive-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'executive-in-out': 'cubic-bezier(0.7, 0, 0.3, 1)',
      },
      transitionDuration: {
        // Discrete operational feedback states
        'feedback': '100ms',
        'interactive': '200ms',
        'reveal': '400ms',
      },
      animation: {
        'fade-in-up': 'fade-in-up 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-right': 'fade-in-right 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse-slow 3000ms cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
};
