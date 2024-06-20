/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'], // substitua 'Roboto' pela fonte que você está usando
            },
        },
    },
    plugins: [],
};
