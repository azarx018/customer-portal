<script lang="ts">
	import type { AuthMode } from '$lib/types';

	export let mode: AuthMode;

	const tabs: { value: AuthMode; label: string }[] = [
		{ value: 'voucher', label: 'Pengguna' },
		{ value: 'member', label: 'Member' }
	];
</script>

<div class="grid grid-cols-2 gap-1 rounded-2xl bg-paper p-1" role="tablist">
	{#each tabs as tab (tab.value)}
		<button
			type="button"
			role="tab"
			aria-selected={mode === tab.value}
			class="rounded-xl px-4 py-2.5 text-sm font-medium transition
				{mode === tab.value ? 'bg-surface text-ink shadow-card' : 'text-muted hover:text-ink'}"
			on:click={() => (mode = tab.value)}
		>
			{tab.label}
		</button>
	{/each}
</div>
