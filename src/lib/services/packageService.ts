import { mockPackageService } from '$lib/mock/mockPackageService';
import type { Package } from '$lib/types';

export const packageService = {
	getPackages(): Promise<Package[]> {
		return mockPackageService.getPackages();
	}
};
