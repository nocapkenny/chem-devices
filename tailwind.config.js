/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    borderRadius: {
      'custom': "25px",
    },
    boxShadow: {
      'custom': "4px 4px 27px 0px rgba(34, 60, 80, 0.5);",
    },
    extend: {
      spacing: {
        '1200': "1200px",
        'vh': '100vh',
      },
      colors:{
        error: 'var(--red)', // красный
        bluora: 'var(--blue)', //голубой для обводки или фона
        primary: 'var(--gray)' //серый
      }
    },
    minHeight: {
      "600": "600px",
 
    },
  },
  plugins: [],
};
