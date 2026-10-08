import { api, saveClient, type ApiAuthSession } from '$lib/api';
import type { AuthSession } from '$lib/types';

// Integrasi MikroTik: validasi voucher/member via backend portal (server.py)
// yang bicara ke RouterOS API. Komponen tidak berubah — kontrak AuthSession sama.
export const authService = {
	async loginVoucher(code: string): Promise<AuthSession> {
		const { session } = await api.authVoucher(code);
		saveClient(session.ip, session.mac);
		return toAuthSession(session);
	},
	async loginMember(username: string, password: string): Promise<AuthSession> {
		const { session } = await api.authMember(username, password);
		saveClient(session.ip, session.mac);
		return toAuthSession(session);
	}
};

function toAuthSession(s: ApiAuthSession): AuthSession {
	return { token: s.token, source: s.source, displayName: s.displayName };
}
