import type { PromoBanner } from '$lib/types';

// Struktur ini yang nanti jadi tabel `promos` + CRUD di admin panel:
// title, description, ctaLabel, href, active. Frontend cuma nampilin
// banner yang active=true, urutan diatur di sini (nanti di backend).
const mockBanners: PromoBanner[] = [
	{
		id: 'promo-1hari',
		title: 'Promo Internetan Seharian',
		description: 'Paket 1 Hari lagi paling hemat buat kamu yang online dari pagi sampai malam.',
		ctaLabel: 'Lihat Paket',
		href: '#package-1d',
		active: true
	}
];

export const mockPromoService = {
	// Nanti diganti: GET /api/promos (backend filter active=true & urutan)
	async getActiveBanners(): Promise<PromoBanner[]> {
		await new Promise((resolve) => setTimeout(resolve, 250));
		return mockBanners.filter((banner) => banner.active);
	}
};
