<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let type: 'button' | 'submit' = 'button';
	export let disabled = false;
	export let loading = false;
	export let fullWidth = true;

	const base =
		'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100';

	const variants: Record<typeof variant, string> = {
		primary: 'bg-ink text-paper hover:bg-ink-soft hover:shadow-floating',
		secondary: 'bg-gold-dim text-gold-deep hover:bg-gold-dim/70',
		ghost: 'bg-transparent text-ink hover:bg-ink/5'
	};
</script>

<button
	{type}
	class="{base} {variants[variant]} {fullWidth ? 'w-full' : ''}"
	disabled={disabled || loading}
	on:click
>
	{#if loading}
		<span
			class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
			aria-hidden="true"
		></span>
	{/if}
	<slot />
</button>
