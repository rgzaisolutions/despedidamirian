/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    fuchsia: "#E91E63",
                    gold: "#D4AF37",
                    "gold-light": "#F9F6E5",
                    pink: "#FCE4EC",
                }
            },
            fontFamily: {
                elegant: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'glam-pattern': "url('/glam-pattern.svg')",
            }
        },
    },
    plugins: [],
}
