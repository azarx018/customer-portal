<script lang="ts">
	export let size: 'sm' | 'lg' = 'lg';
	export let variant: 'dark' | 'light' = 'dark';
</script>

<div class="flex items-center gap-2">
	<span
		class="flex items-center justify-center rounded-xl font-semibold {size === 'lg'
			? 'h-9 w-9 text-base'
			: 'h-7 w-7 text-sm'} {variant === 'light' ? 'bg-paper text-ink' : 'bg-ink text-paper'}"
		aria-hidden="true"
	>
		W
	</span>
	<span
		class="{size === 'lg' ? 'text-xl' : 'text-base'} font-semibold tracking-tight {variant === 'light'
			? 'text-paper'
			: 'text-ink'}"
	>
		WiFiNet
	</span>
</div>
