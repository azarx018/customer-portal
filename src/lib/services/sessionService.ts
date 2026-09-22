import { mockSessionService } from '$lib/mock/mockSessionService';
import type { CustomerSession } from '$lib/types';

export const sessionService = {
	getSession(): Promise<CustomerSession> {
		return mockSessionService.getSession();
	},
	activatePaidSession(packageName: string, durationSeconds: number, speed: string) {
		return mockSessionService.activatePaidSession(packageName, durationSeconds, speed);
	}
};
