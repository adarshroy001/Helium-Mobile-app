/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          light: '#90c9c4',
          base: '#3b787b',
          deep: '#033129'
        },
        // Accent Colors
        accent: {
          mint: '#c5dfd3',
          seafoam: '#6baba5',
          steel: '#f14c55'
        },
        // Neutrals
        neutral: {
          white: '#ffffff',
          offWhite: '#f6fdfc',
          lightGray: '#e2e8e6',
          textGray: '#4a5754',
          darkGray: '#1e2a28'
        },
        // Feedback Colors
        feedback: {
          success: '#28a57f',
          warning: '#fb8641',
          error: '#e95a4b'
        }
      },
      fontFamily: {
        'helium-light': ['System'],
        'helium-regular': ['System'],
        'helium-medium': ['System'],
        'helium-bold': ['System']
      },
      spacing: {
        'safe-top': '44px',
        'safe-bottom': '34px'
      },
      borderRadius: {
        'helium': '16px',
        'helium-lg': '24px'
      },
      boxShadow: {
        'helium': '0 4px 20px rgba(59, 120, 123, 0.15)',
        'helium-lg': '0 8px 32px rgba(59, 120, 123, 0.2)'
      }
    },
  },
  plugins: [],
}