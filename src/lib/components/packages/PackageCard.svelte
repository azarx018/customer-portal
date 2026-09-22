<script lang="ts">
	import type { Package } from '$lib/types';
	import { formatCurrency } from '$lib/utils/format';
	import Button from '$lib/components/ui/Button.svelte';

	export let pkg: Package;
	export let onSelect: (pkg: Package) => void;
</script>

<div class="flex items-center justify-between gap-4 rounded-card border border-line bg-surface p-4 shadow-card">
	<div class="min-w-0">
		<p class="text-base font-semibold text-ink">{pkg.duration}</p>
		<p class="text-sm text-muted">{pkg.speed}</p>
		<p class="mt-1 text-lg font-semibold text-signal">{formatCurrency(pkg.price)}</p>
	</div>
	<Button variant="primary" fullWidth={false} on:click={() => onSelect(pkg)}>Beli</Button>
</div>
