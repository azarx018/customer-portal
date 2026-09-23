import type { CustomerSession } from '$lib/types';

// State in-memory sederhana untuk demo — nanti diganti GET /api/session
// yang membaca sisa waktu asli dari RouterOS (/ip/hotspot/active/print).
let currentSession: CustomerSession = {
	state: 'trial-active',
	remainingSeconds: 277, // 04:37
	totalSeconds: 300,
	speed: '1 Mbps',
	dataUsedMB: 42,
	connectedAt: new Date(Date.now() - 23 * 1000).toISOString(),
	source: 'voucher',
	sessionId: 'TRIAL-DEMO'
};

export const mockSessionService = {
	async getSession(): Promise<CustomerSession> {
		await new Promise((resolve) => setTimeout(resolve, 300));

		// Simulasi data terpakai nambah seiring waktu — biar kerasa "hidup"
		// di demo. Nanti ini murni dibaca dari MikroTik, bukan dihitung sini.
		if (currentSession.state === 'trial-active' || currentSession.state === 'paid-active') {
			currentSession = {
				...currentSession,
				dataUsedMB: (currentSession.dataUsedMB ?? 0) + Math.random() * 2
			};
		}

		return currentSession;
	},

	// Dipanggil setelah pembayaran sukses, simulasikan aktivasi sesi berbayar.
	async activatePaidSession(packageName: string, durationSeconds: number, speed: string) {
		currentSession = {
			state: 'paid-active',
			remainingSeconds: durationSeconds,
			totalSeconds: durationSeconds,
			speed,
			packageName,
			dataUsedMB: 0,
			connectedAt: new Date().toISOString(),
			source: 'voucher',
			sessionId: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
		};
	},

	async expireSession() {
		currentSession = { ...currentSession, state: 'expired', remainingSeconds: 0 };
	}
};
