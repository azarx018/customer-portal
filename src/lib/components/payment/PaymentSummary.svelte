<script lang="ts">
	import type { Package } from '$lib/types';
	import { formatCurrency } from '$lib/utils/format';

	export let pkg: Package;
</script>

<div class="rounded-card border border-line bg-surface p-5 shadow-card">
	<p class="text-sm text-muted">Paket dipilih</p>
	<div class="mt-1 flex items-end justify-between">
		<div>
			<p class="text-xl font-semibold text-ink">{pkg.duration}</p>
			<p class="text-sm text-muted">{pkg.speed}</p>
		</div>
		<p class="text-2xl font-semibold text-ink">{formatCurrency(pkg.price)}</p>
	</div>
</div>
