/**
 * API client untuk backend portal (server.py) yang menjembatani MikroTik RouterOS.
 * Semua endpoint mengembalikan { ok: boolean, ... }. Response non-2xx dianggap error
 * dengan pesan dari server (sudah user-friendly dari backend).
 */

// @ts-expect-error vite injects import.meta.env at build time
const API_BASE = import.meta.env.VITE_API_BASE ?? '';

async function call<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${API_BASE}${path}`, {
		headers: { 'Content-Type': 'application/json' },
		...init
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok || data?.ok === false) {
		throw new Error(data?.error || `Server error (${res.status})`);
	}
	return data as T;
}

export interface ApiAuthSession {
	token: string;
	source: 'voucher' | 'member';
	displayName: string;
	profile?: string;
	limitUptime?: string;
	loginError?: string | null;
	/** Identitas klien hotspot (diisi backend saat mode simulasi lab aktif). */
	ip?: string;
	mac?: string;
}

export interface ApiCustomerSession {
	state: 'trial-active' | 'paid-active' | 'expired' | 'unknown';
	remainingSeconds: number;
	totalSeconds: number;
	speed: string;
	dataUsedMB?: number;
	uptime?: string;
	user?: string;
	ip?: string;
}

const CLIENT_KEY = 'portal_client';

/** Simpan identitas klien (ip/mac) hasil login — dipakai /status kalau URL tak bawa param.
 *  Di produksi MikroTik selalu kirim ?ip=&mac= saat redirect, jadi URL tetap menang. */
export function saveClient(ip?: string, mac?: string) {
	if (typeof window === 'undefined' || (!ip && !mac)) return;
	try {
		localStorage.setItem(CLIENT_KEY, JSON.stringify({ ip, mac }));
	} catch {
		/* storage penuh/private mode — abaikan */
	}
}

/** Identitas klien untuk login hotspot: ip & mac dari query param (isi redirect MikroTik),
 *  fallback ke identitas tersimpan (mode simulasi / lab tanpa redirect). */
function clientParams(): { ip?: string; mac?: string } {
	if (typeof window === 'undefined') return {};
	const sp = new URLSearchParams(window.location.search);
	let ip = sp.get('ip') || undefined;
	let mac = sp.get('mac') || undefined;
	if (!ip && !mac) {
		try {
			const stored = localStorage.getItem(CLIENT_KEY);
			if (stored) {
				const p = JSON.parse(stored);
				ip = p.ip || undefined;
				mac = p.mac || undefined;
			}
		} catch {
			/* json rusak — abaikan */
		}
	}
	return { ip, mac };
}

export const api = {
	health: () => call<{ ok: boolean; version: string }>('/api/health'),

	authVoucher: (code: string): Promise<{ ok: boolean; session: ApiAuthSession }> =>
		call('/api/auth/voucher', {
			method: 'POST',
			body: JSON.stringify({ code, ...clientParams() })
		}),

	authMember: (username: string, password: string): Promise<{ ok: boolean; session: ApiAuthSession }> =>
		call('/api/auth/member', {
			method: 'POST',
			body: JSON.stringify({ username, password, ...clientParams() })
		}),

	getSession: (): Promise<{ ok: boolean; session: ApiCustomerSession }> => {
		const { ip, mac } = clientParams();
		const qs = new URLSearchParams();
		if (ip) qs.set('ip', ip);
		if (mac) qs.set('mac', mac);
		return call(`/api/session?${qs.toString()}`);
	}
};
