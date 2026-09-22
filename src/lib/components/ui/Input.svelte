<script lang="ts">
	export let label: string;
	export let id: string;
	export let type: 'text' | 'password' = 'text';
	export let value = '';
	export let placeholder = '';
	export let autocomplete: string | undefined = undefined;
	export let error: string | undefined = undefined;
</script>

<label for={id} class="block">
	<span class="mb-1.5 block text-sm font-medium text-ink">{label}</span>
	<input
		{id}
		{type}
		{placeholder}
		{autocomplete}
		bind:value
		class="w-full rounded-2xl border bg-surface px-4 py-3.5 text-[15px] text-ink placeholder:text-muted
			{error ? 'border-danger' : 'border-line'}
			focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
		aria-invalid={!!error}
		aria-describedby={error ? `${id}-error` : undefined}
	/>
	{#if error}
		<span id={`${id}-error`} class="mt-1.5 block text-sm text-danger">{error}</span>
	{/if}
</label>
