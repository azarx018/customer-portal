import { mockPromoService } from '$lib/mock/mockPromoService';
import type { PromoBanner } from '$lib/types';

export const promoService = {
	getActiveBanners(): Promise<PromoBanner[]> {
		return mockPromoService.getActiveBanners();
	}
};
