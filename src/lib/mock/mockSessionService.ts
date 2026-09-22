import type { CustomerSession } from '$lib/types';

// State in-memory sederhana untuk demo — nanti diganti GET /api/session
// yang membaca sisa waktu asli dari RouterOS (/ip/hotspot/active/print).
let currentSession: CustomerSession = {
	state: 'trial-active',
	remainingSeconds: 277, // 04:37
	totalSeconds: 300,
	speed: '1 Mbps'
};

export const mockSessionService = {
	async getSession(): Promise<CustomerSession> {
		await new Promise((resolve) => setTimeout(resolve, 300));
		return currentSession;
	},

	// Dipanggil setelah pembayaran sukses, simulasikan aktivasi sesi berbayar.
	async activatePaidSession(packageName: string, durationSeconds: number, speed: string) {
		currentSession = {
			state: 'paid-active',
			remainingSeconds: durationSeconds,
			totalSeconds: durationSeconds,
			speed,
			packageName
		};
	},

	async expireSession() {
		currentSession = { ...currentSession, state: 'expired', remainingSeconds: 0 };
	}
};
