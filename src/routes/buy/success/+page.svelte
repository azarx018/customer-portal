<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import { selectedPackageStore } from '$lib/stores/selectedPackageStore';
	import type { Package } from '$lib/types';

	let pkg: Package | null = null;

	onMount(() => {
		pkg = $selectedPackageStore;
		if (!pkg) {
			goto('/buy', { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>Pembayaran Berhasil — WiFiNet</title>
</svelte:head>

<div class="animate-fade-up mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
	<div
		class="flex h-16 w-16 items-center justify-center rounded-full bg-signal-dim text-signal"
		aria-hidden="true"
	>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
			<path d="M20 6L9 17l-5-5" />
		</svg>
	</div>

	<div>
		<p class="text-xl font-semibold text-ink">Pembayaran berhasil</p>
		{#if pkg}
			<p class="mt-1 text-sm text-muted">Paket {pkg.duration} · {pkg.speed} sudah aktif.</p>
		{/if}
	</div>

	{#if pkg}
		<div class="w-full rounded-card border border-line bg-surface p-5 text-left shadow-card">
			<div class="flex items-center justify-between border-b border-line pb-3">
				<span class="flex items-center gap-1.5 text-sm text-muted">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
						<circle cx="12" cy="12" r="9" />
						<path d="M12 7v5l3 3" />
					</svg>
					Paket
				</span>
				<span class="font-medium text-ink">{pkg.duration}</span>
			</div>
			<div class="flex items-center justify-between border-b border-line py-3">
				<span class="flex items-center gap-1.5 text-sm text-muted">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
						<path d="M4 15a8 8 0 0 1 16 0" />
						<path d="M12 15l4-5" />
					</svg>
					Kecepatan
				</span>
				<span class="font-medium text-ink">{pkg.speed}</span>
			</div>
			<div class="flex items-center justify-between pt-3">
				<span class="text-sm text-muted">Status</span>
				<span class="flex items-center gap-1.5 font-medium text-signal">
					<span class="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true"></span>
					Aktif
				</span>
			</div>
		</div>
	{/if}

	<div class="w-full">
		<Button variant="primary" on:click={() => goto('/status')}>Lihat Status</Button>
	</div>
</div>
