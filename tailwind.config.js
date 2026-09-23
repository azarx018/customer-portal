/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ink: '#211B4E', // indigo dalam — brand utama, terasa premium bukan sekadar navy korporat
				'ink-soft': '#372E6E',
				paper: '#F6F4FB', // latar utama, putih dengan sentuhan lavender halus
				surface: '#FFFFFF',
				gold: {
					DEFAULT: '#D6A64B', // aksen premium — dipakai buat elemen interaktif/terpilih
					dim: '#FBF1DC',
					deep: '#9C7422'
				},
				signal: {
					DEFAULT: '#1FB878', // hijau — khusus makna "terhubung/berhasil", bukan dekorasi umum
					dim: '#E1F7EC'
				},
				line: '#E7E3F2',
				muted: '#726C8C',
				danger: '#E0525B',
				'danger-dim': '#FCEAEA'
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
				card: '24px',
				pill: '999px'
			},
			boxShadow: {
				card: '0 1px 2px rgba(33, 27, 78, 0.04), 0 12px 28px rgba(33, 27, 78, 0.08)',
				nav: '0 10px 30px rgba(33, 27, 78, 0.22)',
				floating: '0 20px 45px rgba(33, 27, 78, 0.16)'
			}
		}
	},
	plugins: []
};
