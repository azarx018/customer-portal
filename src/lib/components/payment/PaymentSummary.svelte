<script lang="ts">
	import type { Package } from '$lib/types';
	import { formatCurrency } from '$lib/utils/format';

	export let pkg: Package;
</script>

<div class="rounded-card border border-line bg-surface p-5 shadow-card">
	<p class="text-sm text-muted">Paket dipilih</p>

	<div class="mt-3 flex flex-col gap-2">
		<span class="flex items-center gap-1.5 text-sm text-ink">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted">
				<circle cx="12" cy="12" r="9" />
				<path d="M12 7v5l3 3" />
			</svg>
			{pkg.duration}
		</span>
		<span class="flex items-center gap-1.5 text-sm text-ink">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted">
				<path d="M4 15a8 8 0 0 1 16 0" />
				<path d="M12 15l4-5" />
			</svg>
			{pkg.speed}
		</span>
	</div>

	<div class="mt-4 border-t border-line pt-4">
		<p class="text-xs text-muted">Total pembayaran</p>
		<p class="text-2xl font-semibold text-ink">{formatCurrency(pkg.price)}</p>
	</div>
</div>
