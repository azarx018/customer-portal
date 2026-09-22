<script lang="ts">
	import type { Package } from '$lib/types';
	import PackageCard from './PackageCard.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';

	export let packages: Package[];
	export let onSelect: (pkg: Package) => void;
</script>

{#if packages.length === 0}
	<EmptyState title="Belum ada paket tersedia" description="Coba beberapa saat lagi." />
{:else}
	<div class="flex flex-col gap-3">
		{#each packages as pkg (pkg.id)}
			<PackageCard {pkg} {onSelect} />
		{/each}
	</div>
{/if}
