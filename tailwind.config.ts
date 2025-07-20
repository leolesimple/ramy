import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}',
    ],
    darkMode: 'class', // 👈 bien présent
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
