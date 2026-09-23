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
			<div class="animate-fade-up flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
				<div class="lg:w-[45%] lg:shrink-0">
					<PaymentSummary pkg={order.package} />
				</div>
				<div class="flex-1">
					<QrisPayment {secondsRemaining} {status} />
				</div>
			</div>

			{#if status === 'expired'}
				<div class="animate-fade-up mt-4 flex flex-col items-center gap-3 rounded-card border border-danger/30 bg-danger-dim p-5 text-center">
					<span class="flex h-10 w-10 items-center justify-center rounded-full bg-danger/15 text-danger" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
							<circle cx="12" cy="12" r="9" />
							<path d="M12 8v5" />
							<path d="M12 16h.01" />
						</svg>
					</span>
					<div>
						<p class="text-sm font-semibold text-danger">Waktu pembayaran habis</p>
						<p class="mt-0.5 text-xs text-danger/80">Silakan pilih paket lagi untuk melanjutkan.</p>
					</div>
					<a
						href="/buy"
						class="mt-1 rounded-full bg-danger px-4 py-2 text-xs font-semibold text-paper transition-colors duration-200 hover:bg-danger/90"
					>
						Pilih paket lagi
					</a>
				</div>
			{/if}
		{/if}
	</div>
</div>
