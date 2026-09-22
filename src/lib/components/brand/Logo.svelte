<script lang="ts">
	export let size: 'sm' | 'lg' = 'lg';
</script>

<div class="flex items-center gap-2">
	<span
		class="flex items-center justify-center rounded-xl bg-ink text-paper {size === 'lg'
			? 'h-9 w-9 text-base'
			: 'h-7 w-7 text-sm'} font-semibold"
		aria-hidden="true"
	>
		W
	</span>
	<span class="{size === 'lg' ? 'text-xl' : 'text-base'} font-semibold tracking-tight text-ink">
		WiFiNet
	</span>
</div>
