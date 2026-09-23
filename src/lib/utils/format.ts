import type { Package } from '$lib/types';

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0
	}).format(amount);
}

export function formatCountdown(totalSeconds: number): string {
	const clamped = Math.max(0, Math.floor(totalSeconds));
	const minutes = Math.floor(clamped / 60);
	const seconds = clamped % 60;
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatDataUsage(mb: number): string {
	if (mb >= 1024) {
		return `${(mb / 1024).toFixed(1)} GB`;
	}
	return `${Math.round(mb)} MB`;
}

export function formatClockTime(iso: string): string {
	return new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Persen hemat dibanding baseline (biasanya paket dengan durasi terpendek),
 * dihitung dari tarif per detik masing-masing paket. Murni kalkulasi dari
 * `price` & `durationSeconds` — kalau admin ubah harga paket manapun lewat
 * admin panel nanti, angka ini otomatis ikut, gak perlu disentuh kode.
 */
export function calculateSavingsPercent(pkg: Package, baseline: Package): number | null {
	if (pkg.id === baseline.id || baseline.durationSeconds === 0) return null;

	const baseRate = baseline.price / baseline.durationSeconds;
	const pkgRate = pkg.price / pkg.durationSeconds;
	if (pkgRate >= baseRate) return null;

	const percent = Math.round((1 - pkgRate / baseRate) * 100);
	return percent > 0 ? percent : null;
}
