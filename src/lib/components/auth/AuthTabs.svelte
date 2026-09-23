<script lang="ts">
	import type { AuthMode } from '$lib/types';

	export let mode: AuthMode;

	const tabs: { value: AuthMode; label: string }[] = [
		{ value: 'voucher', label: 'Pengguna' },
		{ value: 'member', label: 'Member' }
	];

	$: activeIndex = tabs.findIndex((tab) => tab.value === mode);
</script>

<div class="relative grid grid-cols-2 gap-0 rounded-2xl bg-paper p-1" role="tablist">
	<div
		class="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-surface shadow-card transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
		style="transform: translateX({activeIndex * 100}%)"
		aria-hidden="true"
	></div>
	{#each tabs as tab (tab.value)}
		<button
			type="button"
			role="tab"
			aria-selected={mode === tab.value}
			class="relative z-10 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300
				{mode === tab.value ? 'text-ink' : 'text-muted hover:text-ink'}"
			on:click={() => (mode = tab.value)}
		>
			{tab.label}
		</button>
	{/each}
</div>
