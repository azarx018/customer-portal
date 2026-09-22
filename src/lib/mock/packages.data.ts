import type { Package } from '$lib/types';

// Data contoh — struktur ini yang nanti dikembalikan oleh GET /packages.
export const mockPackages: Package[] = [
	{
		id: '1h',
		name: '1 Jam',
		duration: '1 Jam',
		durationSeconds: 3600,
		speed: '5 Mbps',
		price: 2000,
		active: true
	},
	{
		id: '3h',
		name: '3 Jam',
		duration: '3 Jam',
		durationSeconds: 3 * 3600,
		speed: '10 Mbps',
		price: 5000,
		active: true
	},
	{
		id: '6h',
		name: '6 Jam',
		duration: '6 Jam',
		durationSeconds: 6 * 3600,
		speed: '10 Mbps',
		price: 8000,
		active: true
	},
	{
		id: '1d',
		name: '1 Hari',
		duration: '1 Hari',
		durationSeconds: 24 * 3600,
		speed: '10 Mbps',
		price: 10000,
		active: true
	}
];
