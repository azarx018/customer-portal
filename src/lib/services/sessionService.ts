import { api } from '$lib/api';
import type { CustomerSession } from '$lib/types';

// Integrasi MikroTik: baca status sesi aktif dari /ip/hotspot/active via backend.
// Dipakai halaman /status (polling 15s) dan badge di halaman login.
export const sessionService = {
	async getSession(): Promise<CustomerSession> {
		try {
			const { session } = await api.getSession();
			return {
				state: session.state,
				remainingSeconds: session.remainingSeconds,
				totalSeconds: session.totalSeconds,
				speed: session.speed || '',
				dataUsedMB: session.dataUsedMB,
				connectedAt: undefined,
				source: 'voucher',
				sessionId: session.user
			};
		} catch {
			// Backend/MikroTik tak terjangkau -> state netral, jangan tampilkan error palsu.
			return { state: 'unknown', remainingSeconds: 0, totalSeconds: 0, speed: '' };
		}
	},

	// Aktivasi sesi berbayar (QRIS) belum terintegrasi ke MikroTik.
	// Sementara: pembelian paket tidak mengubah state hotspot — login tetap via voucher.
	async activatePaidSession(packageName: string, durationSeconds: number, speed: string) {
		void packageName;
		void durationSeconds;
		void speed;
		return;
	}
};
