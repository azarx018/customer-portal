// Tipe data yang nanti pindah ke packages/shared-types di root monorepo,
// dipakai bareng customer-portal, admin-panel, dan backend-api.

export interface Package {
	id: string;
	name: string;
	duration: string; // label tampilan, mis. "3 Jam"
	durationSeconds: number;
	speed: string; // label tampilan, mis. "10 Mbps"
	price: number; // dalam Rupiah
	description?: string;
	active: boolean;
}

export type AuthMode = 'voucher' | 'member';

export interface AuthSession {
	token: string;
	source: AuthMode;
	displayName: string;
}

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired';

export interface Order {
	id: string;
	package: Package;
	amount: number;
	status: PaymentStatus;
	qrString: string;
	expiresAt: string; // ISO timestamp
}

export type SessionState = 'trial-active' | 'paid-active' | 'expired' | 'unknown';

export interface CustomerSession {
	state: SessionState;
	remainingSeconds: number;
	totalSeconds: number;
	speed: string;
	packageName?: string;
}
