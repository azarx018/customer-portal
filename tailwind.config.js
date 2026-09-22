/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ink: '#12203B', // navy dalam — teks utama & brand
				paper: '#F6F5F1', // latar utama, netral hangat (bukan cream/terracotta)
				surface: '#FFFFFF',
				signal: {
					DEFAULT: '#2FB897', // teal sinyal — aksen utama, terasa "terhubung/aktif"
					dim: '#E4F5F0'
				},
				line: '#E4E1D8',
				muted: '#8A8677',
				danger: '#D64545',
				'danger-dim': '#FBEAEA'
			},
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif'
				]
			},
			borderRadius: {
				card: '20px',
				pill: '999px'
			},
			boxShadow: {
				card: '0 1px 2px rgba(18, 32, 59, 0.04), 0 8px 24px rgba(18, 32, 59, 0.06)',
				nav: '0 8px 28px rgba(18, 32, 59, 0.14)'
			}
		}
	},
	plugins: []
};
