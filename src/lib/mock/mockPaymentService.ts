import type { Order, Package, PaymentStatus } from '$lib/types';

// Simulasi status pembayaran per order id, hanya untuk demo frontend.
const orderStore = new Map<string, { status: PaymentStatus; createdAt: number }>();

function delay<T>(value: T, ms = 400): Promise<T> {
	return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const mockPaymentService = {
	// Nanti diganti: POST /api/orders
	async createOrder(pkg: Package): Promise<Order> {
		await delay(null, 500);
		const id = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
		orderStore.set(id, { status: 'pending', createdAt: Date.now() });
		return {
			id,
			package: pkg,
			amount: pkg.price,
			status: 'pending',
			// String QR palsu — sekadar dipakai untuk render placeholder visual QR
			qrString: `WIFINET|${id}|${pkg.price}`,
			expiresAt
		};
	},

	// Nanti diganti: GET /api/orders/:id/status (dipoll frontend, diupdate oleh webhook di backend)
	async getOrderStatus(orderId: string): Promise<PaymentStatus> {
		await delay(null, 300);
		const record = orderStore.get(orderId);
		if (!record) return 'failed';

		const elapsedSeconds = (Date.now() - record.createdAt) / 1000;

		// Simulasi: dianggap "dibayar" otomatis setelah 8 detik, biar alur bisa didemokan.
		if (record.status === 'pending' && elapsedSeconds > 8) {
			record.status = 'paid';
		}
		return record.status;
	}
};
