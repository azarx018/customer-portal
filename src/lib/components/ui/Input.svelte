<script lang="ts">
	export let label: string;
	export let id: string;
	export let type: 'text' | 'password' = 'text';
	export let value = '';
	export let placeholder = '';
	export let autocomplete: string | undefined = undefined;
	export let error: string | undefined = undefined;

	const inputClass =
		'w-full rounded-2xl border bg-surface px-4 py-3.5 text-[15px] text-ink placeholder:text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25';
</script>

<label for={id} class="block">
	<span class="mb-1.5 block text-sm font-medium text-ink">{label}</span>

	<!--
		Svelte melarang atribut `type` dinamis pada <input> yang pakai bind:value,
		jadi dua varian dipisah sebagai elemen berbeda daripada satu <input> dengan
		{type} yang di-bind.
	-->
	{#if type === 'password'}
		<input
			{id}
			type="password"
			{placeholder}
			{autocomplete}
			bind:value
			class="{inputClass} {error ? 'border-danger' : 'border-line'}"
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : undefined}
		/>
	{:else}
		<input
			{id}
			type="text"
			{placeholder}
			{autocomplete}
			bind:value
			class="{inputClass} {error ? 'border-danger' : 'border-line'}"
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : undefined}
		/>
	{/if}

	{#if error}
		<span id={`${id}-error`} class="mt-1.5 block text-sm text-danger">{error}</span>
	{/if}
</label>
