import { writable } from 'svelte/store';
import type { AuthSession } from '$lib/types';

function safeReadSession(): AuthSession | null {
	// Captive portal browser kadang membatasi storage — jangan sampai crash.
	try {
		const raw = sessionStorage.getItem('wifinet:auth');
		return raw ? (JSON.parse(raw) as AuthSession) : null;
	} catch {
		return null;
	}
}

function createAuthStore() {
	const initial = typeof window !== 'undefined' ? safeReadSession() : null;
	const { subscribe, set } = writable<AuthSession | null>(initial);

	return {
		subscribe,
		login(session: AuthSession) {
			set(session);
			try {
				sessionStorage.setItem('wifinet:auth', JSON.stringify(session));
			} catch {
				// storage tidak tersedia — sesi tetap jalan in-memory untuk tab ini
			}
		},
		logout() {
			set(null);
			try {
				sessionStorage.removeItem('wifinet:auth');
			} catch {
				/* noop */
			}
		}
	};
}

export const authStore = createAuthStore();
