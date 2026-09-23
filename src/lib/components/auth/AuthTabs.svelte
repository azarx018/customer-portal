<script lang="ts">
	import type { AuthMode } from '$lib/types';

	export let mode: AuthMode;

	const tabs: { value: AuthMode; label: string }[] = [
		{ value: 'voucher', label: 'Voucher' },
		{ value: 'member', label: 'Member' }
	];

	$: activeIndex = tabs.findIndex((tab) => tab.value === mode);
</script>

<div class="relative grid grid-cols-2 gap-0 rounded-2xl bg-paper p-1" role="tablist">
	<div
		class="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-ink shadow-card transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
		style="transform: translateX({activeIndex * 100}%)"
		aria-hidden="true"
	></div>
	{#each tabs as tab (tab.value)}
		<button
			type="button"
			role="tab"
			aria-selected={mode === tab.value}
			class="relative z-10 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300
				{mode === tab.value ? 'text-paper' : 'text-muted hover:text-ink'}"
			on:click={() => (mode = tab.value)}
		>
			<span class="h-4 w-4" aria-hidden="true">
				{#if tab.value === 'voucher'}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V9z" />
						<path d="M9 8v8" stroke-dasharray="2 2" />
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="8" r="3.5" />
						<path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
					</svg>
				{/if}
			</span>
			{tab.label}
		</button>
	{/each}
</div>
