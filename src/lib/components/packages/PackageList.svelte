<script lang="ts">
	import type { Package } from '$lib/types';
	import PackageCard from './PackageCard.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';

	export let packages: Package[];
	export let onSelect: (pkg: Package) => void;

	// Baseline buat hitung persen hemat = paket dengan durasi terpendek yang
	// aktif. Dihitung dari data, bukan diasumsikan id tertentu — jadi tetap
	// benar walau admin nanti nambah/hapus/urutin ulang paket.
	$: baseline = packages.reduce(
		(shortest, pkg) => (pkg.durationSeconds < shortest.durationSeconds ? pkg : shortest),
		packages[0]
	);
</script>

{#if packages.length === 0}
	<EmptyState title="Belum ada paket tersedia" description="Coba beberapa saat lagi." />
{:else}
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each packages as pkg (pkg.id)}
			<PackageCard {pkg} {baseline} {onSelect} />
		{/each}
	</div>
{/if}
