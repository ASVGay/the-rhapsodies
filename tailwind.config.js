/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',

    ],
    theme: {
        extend: {
            colors: {
                'moon': {
                    DEFAULT: '#EBBC19',
                    50: '#FAEDC2',
                    100: '#F8E8AF',
                    200: '#F5DD8A',
                    300: '#F2D264',
                    400: '#EEC73F',
                    500: '#EBBC19',
                    600: '#BC9510',
                    700: '#886C0C',
                    800: '#544307',
                    900: '#211A03',
                    950: '#070601'
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
