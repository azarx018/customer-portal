import type { Package } from '$lib/types';
import { mockPackages } from './packages.data';

export const mockPackageService = {
	// Nanti diganti: GET /api/packages
	async getPackages(): Promise<Package[]> {
		await new Promise((resolve) => setTimeout(resolve, 400));
		return mockPackages.filter((pkg) => pkg.active);
	}
};
