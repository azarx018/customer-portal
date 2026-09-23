<script lang="ts">
	import { formatCountdown } from '$lib/utils/format';
	import PaymentStatus from './PaymentStatus.svelte';
	import type { PaymentStatus as PaymentStatusType } from '$lib/types';

	export let secondsRemaining: number;
	export let status: PaymentStatusType;

	$: isInactive = status === 'expired' || status === 'failed';
</script>

<div class="flex flex-col items-center gap-4 rounded-card border border-line bg-surface p-6 shadow-card">
	<p class="text-sm font-medium text-muted">Metode pembayaran: QRIS</p>

	<!-- Placeholder visual QR — bukan QR sungguhan, cukup untuk demo alur -->
	<div class="relative">
		<div
			class="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed bg-paper transition-opacity duration-300
				{isInactive ? 'border-line opacity-40' : 'border-line'}"
			role="img"
			aria-label="Kode QR pembayaran (contoh)"
		>
			<svg viewBox="0 0 100 100" class="h-32 w-32 text-ink" aria-hidden="true">
				<rect x="4" y="4" width="28" height="28" fill="none" stroke="currentColor" stroke-width="6" />
				<rect x="68" y="4" width="28" height="28" fill="none" stroke="currentColor" stroke-width="6" />
				<rect x="4" y="68" width="28" height="28" fill="none" stroke="currentColor" stroke-width="6" />
				<rect x="44" y="4" width="8" height="8" fill="currentColor" />
				<rect x="44" y="20" width="8" height="8" fill="currentColor" />
				<rect x="60" y="44" width="8" height="8" fill="currentColor" />
				<rect x="44" y="44" width="8" height="24" fill="currentColor" />
				<rect x="76" y="60" width="8" height="8" fill="currentColor" />
				<rect x="76" y="76" width="20" height="8" fill="currentColor" />
				<rect x="44" y="76" width="8" height="20" fill="currentColor" />
			</svg>
		</div>

		<!-- Aksen sudut kayak frame scanner, cuma dekoratif -->
		{#if !isInactive}
			<div class="pointer-events-none absolute -inset-2" aria-hidden="true">
				<span class="absolute left-0 top-0 h-5 w-5 rounded-tl-xl border-l-2 border-t-2 border-gold"></span>
				<span class="absolute right-0 top-0 h-5 w-5 rounded-tr-xl border-r-2 border-t-2 border-gold"></span>
				<span class="absolute bottom-0 left-0 h-5 w-5 rounded-bl-xl border-b-2 border-l-2 border-gold"></span>
				<span class="absolute bottom-0 right-0 h-5 w-5 rounded-br-xl border-b-2 border-r-2 border-gold"></span>
			</div>
		{/if}
	</div>

	{#if status === 'pending'}
		<div class="text-center">
			<p class="text-sm text-muted">Menunggu pembayaran</p>
			<p class="mt-1 text-2xl font-semibold tabular-nums text-ink">{formatCountdown(secondsRemaining)}</p>
		</div>
	{/if}

	<PaymentStatus {status} />
</div>
