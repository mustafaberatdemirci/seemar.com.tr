/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                "primary": "#c59f59",
                "background-light": "#f8f7f6",
                "background-dark": "#1e1a14",
                "cinematic-black": "#0F0F0F",
                "anthracite": "#1A1A1A",
                "cool-grey": "#282C34",
                "metallic-silver": "#E0E0E0",
                "dark-silver": "#B0B0B0",
                "marble-grey": "#e7e1cf",
                "vein-gold": "#ecb613",
                "gallery-white": "#fcfbf8",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "serif": ["Cinzel", "serif"],
                "mono": ["Roboto Mono", "monospace"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1.5rem",
                "full": "9999px"
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
