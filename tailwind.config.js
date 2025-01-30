/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Custom slow spin animation
        'move': 'move 10s ease-in-out  infinite',
      },
      keyframes: {
        move: {

          '0%': { transform: 'translateX(100px)' },  
          '25%': { transform: 'translateX(200px)' },  
          '50%': { transform: 'translateX(400px)' },  
          '75%': { transform: 'translateX(500px)' },  
          '100%': { transform: 'translateX(100px)' }
        }
      },
      backgroundImage:{
        'hero-lg': "url('/src/assets/hero-lg.jpg')",
        'hero-sm': "url('/src/assets/hero-sm.jpg')"
      }
    }
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       animation:{
//         'spin-slow':'spin 3s linear infinite',
//         wiggle: 'wiggle 1s ease-in-out infinite',
//       },
//       keyframes: {
//         wiggle: {
//           '0%, 100%': { transform: 'rotate(-3deg)' },
//           '50%': { transform: 'rotate(3deg)' },
//         }
//       }
//     },
//   },
//   plugins: [],
// }

