<script lang="ts">
	export let points: { label: string; icon: 'clock' | 'shield-check' | 'headset' }[];
</script>

<div class="flex items-start justify-between gap-2 px-1 text-center">
	{#each points as point, i (point.label)}
		<div class="flex flex-1 flex-col items-center gap-1.5 {i > 0 ? 'border-l border-line pl-2' : ''}">
			<span class="text-ink" aria-hidden="true">
				{#if point.icon === 'clock'}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
						<circle cx="12" cy="12" r="9" />
						<path d="M12 7v5l3 3" />
					</svg>
				{:else if point.icon === 'shield-check'}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
						<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
						<path d="M9.5 12l1.8 1.8L15 10" />
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
						<path d="M4 14v-2a8 8 0 0 1 16 0v2" />
						<rect x="2.5" y="14" width="4" height="5" rx="1.5" />
						<rect x="17.5" y="14" width="4" height="5" rx="1.5" />
					</svg>
				{/if}
			</span>
			<span class="text-[11px] leading-tight text-muted">{point.label}</span>
		</div>
	{/each}
</div>
