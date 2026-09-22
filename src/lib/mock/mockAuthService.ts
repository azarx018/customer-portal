import type { AuthSession } from '$lib/types';

// Kredensial dev-only. JANGAN dijadikan acuan arsitektur auth asli.
const MOCK_VOUCHER = 'ABC123XYZ';
const MOCK_MEMBER = { username: 'demo', password: 'demo123' };

function delay<T>(value: T, ms = 500): Promise<T> {
	return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const mockAuthService = {
	// Nanti diganti: POST /api/auth/voucher
	async loginVoucher(code: string): Promise<AuthSession> {
		await delay(null, 600);
		if (code.trim().toUpperCase() !== MOCK_VOUCHER) {
			throw new Error('Kode voucher tidak valid atau sudah digunakan.');
		}
		return { token: 'mock-voucher-token', source: 'voucher', displayName: code.toUpperCase() };
	},

	// Nanti diganti: POST /api/auth/member
	async loginMember(username: string, password: string): Promise<AuthSession> {
		await delay(null, 600);
		if (username !== MOCK_MEMBER.username || password !== MOCK_MEMBER.password) {
			throw new Error('Username atau password salah.');
		}
		return { token: 'mock-member-token', source: 'member', displayName: username };
	}
};
