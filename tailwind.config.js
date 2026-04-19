/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // COA Primary Colors
        primary: {
          DEFAULT: '#1e3a5f',
          gold: '#d4a84b',
          navy: '#1e3a5f',
          teal: '#0891b2',
        },
        // Status Colors
        success: '#059669',
        warning: '#d97706',
        destructive: '#dc2626',
        // Severity
        critical: '#dc2626',
        major: '#ea580c',
        minor: '#ca8a04',
        // Compliance
        compliant: '#059669',
        'under-review': '#d97706',
        'non-compliant': '#dc2626',
      },
    },
  },
  plugins: [],
}
