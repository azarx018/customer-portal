<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import PackageList from '$lib/components/packages/PackageList.svelte';
	import LoadingState from '$lib/components/ui/LoadingState.svelte';
	import { packageService } from '$lib/services/packageService';
	import { selectedPackageStore } from '$lib/stores/selectedPackageStore';
	import type { Package } from '$lib/types';

	let packages: Package[] = [];
	let loading = true;
	let loadError = '';

	onMount(async () => {
		try {
			packages = await packageService.getPackages();
		} catch {
			loadError = 'Gagal memuat paket. Periksa koneksi lalu coba lagi.';
		} finally {
			loading = false;
		}
	});

	function handleSelect(pkg: Package) {
		selectedPackageStore.set(pkg);
		goto('/buy/payment');
	}
</script>

<svelte:head>
	<title>Pilih Paket — WiFiNet</title>
</svelte:head>

<div class="px-5 pt-8">
	<h1 class="text-xl font-semibold text-ink">Pilih Paket</h1>
	<p class="mt-1 text-sm text-muted">Pilih durasi dan kecepatan yang sesuai kebutuhanmu.</p>

	<div class="mt-6">
		{#if loading}
			<LoadingState message="Memuat paket..." />
		{:else if loadError}
			<p class="rounded-card border border-danger/30 bg-danger-dim px-4 py-3 text-sm text-danger">
				{loadError}
			</p>
		{:else}
			<PackageList {packages} onSelect={handleSelect} />
		{/if}
	</div>
</div>
