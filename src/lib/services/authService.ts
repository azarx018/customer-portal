import { mockAuthService } from '$lib/mock/mockAuthService';
import type { AuthSession } from '$lib/types';

// Saat backend siap, ganti body fungsi di sini untuk memanggil
// POST /api/auth/voucher dan /api/auth/member — komponen (LoginForm dll)
// tidak perlu diubah sama sekali.
export const authService = {
	loginVoucher(code: string): Promise<AuthSession> {
		return mockAuthService.loginVoucher(code);
	},
	loginMember(username: string, password: string): Promise<AuthSession> {
		return mockAuthService.loginMember(username, password);
	}
};
