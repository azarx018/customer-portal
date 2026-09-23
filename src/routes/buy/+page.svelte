<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import PackageList from '$lib/components/packages/PackageList.svelte';
	import PromoBanner from '$lib/components/promo/PromoBanner.svelte';
	import LoadingState from '$lib/components/ui/LoadingState.svelte';
	import TrustRow from '$lib/components/ui/TrustRow.svelte';
	import { packageService } from '$lib/services/packageService';
	import { promoService } from '$lib/services/promoService';
	import { selectedPackageStore } from '$lib/stores/selectedPackageStore';
	import type { Package, PromoBanner as PromoBannerType } from '$lib/types';

	let packages: Package[] = [];
	let loading = true;
	let loadError = '';

	// Banner dimuat terpisah dari paket — kalau ini gagal/lambat, jangan
	// sampai nge-block tampilan paket yang lebih penting.
	let banners: PromoBannerType[] = [];

	onMount(async () => {
		try {
			packages = await packageService.getPackages();
		} catch {
			loadError = 'Gagal memuat paket. Periksa koneksi lalu coba lagi.';
		} finally {
			loading = false;
		}

		try {
			banners = await promoService.getActiveBanners();
		} catch {
			banners = [];
		}
	});

	const trustPoints = [
		{ label: 'Proses cepat & mudah', icon: 'clock' },
		{ label: 'Pembayaran aman (QRIS / e-Wallet)', icon: 'shield-check' },
		{ label: 'CS 24 Jam Siap membantu', icon: 'headset' }
	] as const;

	function handleSelect(pkg: Package) {
		selectedPackageStore.set(pkg);
		goto('/buy/payment');
	}
</script>

<svelte:head>
	<title>Pilih Paket — WiFiNet</title>
</svelte:head>

<div class="mx-auto w-full max-w-5xl px-5 pt-8 lg:pt-14">
	<div class="lg:text-center">
		<h1 class="text-xl font-semibold text-ink lg:text-3xl">Pilih Paket</h1>
		<p class="mt-1 text-sm text-muted lg:text-base">Pilih durasi dan kecepatan yang sesuai kebutuhanmu.</p>
	</div>

	{#if banners.length > 0}
		<div class="mt-5 -mx-5 px-5 lg:mt-8 lg:mx-0 lg:px-0">
			<div class="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
				{#each banners as banner (banner.id)}
					<div class="w-[85%] shrink-0 snap-start sm:w-[420px]">
						<PromoBanner {banner} />
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div class="animate-fade-up mt-6 lg:mt-8">
		{#if loading}
			<LoadingState message="Memuat paket..." />
		{:else if loadError}
			<div class="flex items-center gap-3 rounded-card border border-danger/30 bg-danger-dim px-4 py-3 text-sm text-danger">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 shrink-0">
					<circle cx="12" cy="12" r="9" />
					<path d="M12 8v5" />
					<path d="M12 16h.01" />
				</svg>
				{loadError}
			</div>
		{:else}
			<PackageList {packages} onSelect={handleSelect} />
		{/if}
	</div>

	<div class="mt-8 lg:mt-12 lg:max-w-2xl lg:mx-auto">
		<TrustRow points={trustPoints} />
	</div>
</div>
