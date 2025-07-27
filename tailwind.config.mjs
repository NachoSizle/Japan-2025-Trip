/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}',
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        // Colores primarios neón (tema rosa/rojo japonés)
        'neon-pink': '#FF1493',
        'neon-red': '#FF0040',
        'neon-coral': '#FF6B6B', 
        'neon-cyan': '#00FFFF', 
        'neon-purple': '#8A2BE2',
        
        // Fondos
        'bg-deep-black': '#0A0A0A',
        'bg-charcoal': '#1A1A1A',
        
        // Secundarios
        'gray-medium': '#404040',
        'white-pure': '#FFFFFF',
        
        // Acentos
        'gold-soft': '#FFD700',
        'gluten-free-green': '#32CD32',
        
        // Nuevos colores japoneses
        'sakura-pink': '#FFB6C1',
        'tokyo-red': '#DC143C',
        'sunset-orange': '#FF4500',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 20px #FF1493',
        'neon-cyan': '0 0 20px #00FFFF',
        'neon-purple': '0 0 20px #8A2BE2',
        'neon-green': '0 0 20px #32CD32',
        'neon-pink-lg': '0 0 40px #FF1493',
        'neon-cyan-lg': '0 0 40px #00FFFF',
        'neon-purple-lg': '0 0 40px #8A2BE2',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { 
            opacity: '1', 
            filter: 'brightness(1)' 
          },
          '50%': { 
            opacity: '0.8', 
            filter: 'brightness(1.2)' 
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
    },
  },
  plugins: [],
}
