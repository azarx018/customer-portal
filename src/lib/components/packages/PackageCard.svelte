<script lang="ts">
	import type { Package } from '$lib/types';
	import { calculateSavingsPercent, formatCurrency } from '$lib/utils/format';
	import Button from '$lib/components/ui/Button.svelte';

	export let pkg: Package;
	export let baseline: Package;
	export let onSelect: (pkg: Package) => void;

	$: isPopular = pkg.highlight === 'popular';
	$: savingsPercent = calculateSavingsPercent(pkg, baseline);
</script>

<div
	id="package-{pkg.id}"
	class="relative flex h-full flex-col gap-4 rounded-card border bg-surface p-5 shadow-card transition-shadow duration-200
		{isPopular ? 'border-gold/50 ring-1 ring-gold/30' : 'border-line'}"
>
	{#if isPopular}
		<span class="absolute -top-3 left-5 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-ink shadow-card">
			Paling Laris
		</span>
	{/if}

	<div class="flex items-start justify-between gap-3">
		<div class="flex flex-col gap-1.5">
			<span class="flex items-center gap-1.5 text-sm text-muted">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
					<circle cx="12" cy="12" r="9" />
					<path d="M12 7v5l3 3" />
				</svg>
				{pkg.duration}
			</span>
			<span class="flex items-center gap-1.5 text-sm text-muted">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
					<path d="M4 15a8 8 0 0 1 16 0" />
					<path d="M12 15l4-5" />
				</svg>
				{pkg.speed}
			</span>
		</div>

		{#if savingsPercent}
			<span class="shrink-0 rounded-full bg-signal-dim px-2.5 py-1 text-[11px] font-semibold text-signal">
				Hemat {savingsPercent}%
			</span>
		{/if}
	</div>

	<div class="mt-auto flex items-end justify-between gap-3">
		<p class="text-2xl font-semibold text-ink">{formatCurrency(pkg.price)}</p>
		<Button variant="primary" fullWidth={false} on:click={() => onSelect(pkg)}>Beli</Button>
	</div>
</div>
