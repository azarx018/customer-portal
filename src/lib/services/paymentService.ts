import { mockPaymentService } from '$lib/mock/mockPaymentService';
import type { Order, Package, PaymentStatus } from '$lib/types';

export const paymentService = {
	createOrder(pkg: Package): Promise<Order> {
		return mockPaymentService.createOrder(pkg);
	},
	getOrderStatus(orderId: string): Promise<PaymentStatus> {
		return mockPaymentService.getOrderStatus(orderId);
	}
};
