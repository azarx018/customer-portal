<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import PaymentSummary from '$lib/components/payment/PaymentSummary.svelte';
	import QrisPayment from '$lib/components/payment/QrisPayment.svelte';
	import LoadingState from '$lib/components/ui/LoadingState.svelte';
	import { paymentService } from '$lib/services/paymentService';
	import { sessionService } from '$lib/services/sessionService';
	import { selectedPackageStore } from '$lib/stores/selectedPackageStore';
	import type { Order, PaymentStatus } from '$lib/types';

	let order: Order | null = null;
	let status: PaymentStatus = 'pending';
	let secondsRemaining = 0;
	let loading = true;
	let pollTimer: ReturnType<typeof setInterval>;
	let tickTimer: ReturnType<typeof setInterval>;

	onMount(async () => {
		const pkg = $selectedPackageStore;
		if (!pkg) {
			goto('/buy', { replaceState: true });
			return;
		}

		order = await paymentService.createOrder(pkg);
		secondsRemaining = Math.max(
			0,
			Math.round((new Date(order.expiresAt).getTime() - Date.now()) / 1000)
		);
		loading = false;

		tickTimer = setInterval(() => {
			secondsRemaining = Math.max(0, secondsRemaining - 1);
			if (secondsRemaining === 0 && status === 'pending') {
				status = 'expired';
				clearInterval(pollTimer);
				clearInterval(tickTimer);
			}
		}, 1000);

		pollTimer = setInterval(async () => {
			if (!order || status !== 'pending') return;
			const latest = await paymentService.getOrderStatus(order.id);
			status = latest;

			if (latest === 'paid' && order) {
				clearInterval(pollTimer);
				clearInterval(tickTimer);
				await sessionService.activatePaidSession(
					order.package.duration,
					order.package.durationSeconds,
					order.package.speed
				);
				goto('/buy/success');
			}
		}, 2000);
	});

	onDestroy(() => {
		clearInterval(pollTimer);
		clearInterval(tickTimer);
	});
</script>

<svelte:head>
	<title>Pembayaran — WiFiNet</title>
</svelte:head>

<div class="mx-auto w-full max-w-3xl px-5 pt-8 lg:pt-14">
	<h1 class="text-xl font-semibold text-ink lg:text-2xl">Pembayaran</h1>

	<div class="mt-6">
		{#if loading || !order}
			<LoadingState message="Menyiapkan pembayaran..." />
		{:else}
			<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
				<div class="lg:w-[45%] lg:shrink-0">
					<PaymentSummary pkg={order.package} />
				</div>
				<div class="flex-1">
					<QrisPayment {secondsRemaining} {status} />
				</div>
			</div>

			{#if status === 'expired'}
				<p class="mt-4 rounded-card border border-danger/30 bg-danger-dim px-4 py-3 text-center text-sm text-danger">
					Waktu pembayaran habis. Silakan pilih paket lagi.
				</p>
				<a href="/buy" class="mt-3 block text-center text-sm font-medium text-signal">
					Pilih paket lagi
				</a>
			{/if}
		{/if}
	</div>
</div>
