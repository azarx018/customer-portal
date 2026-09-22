<script lang="ts">
	export let title: string;
	export let description = '';
</script>

<div class="flex flex-col items-center gap-2 rounded-card border border-line bg-surface px-6 py-10 text-center">
	<p class="text-base font-medium text-ink">{title}</p>
	{#if description}
		<p class="text-sm text-muted">{description}</p>
	{/if}
	<slot />
</div>
