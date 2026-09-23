<script lang="ts">
	export let message = 'Memuat...';
</script>

<div class="flex flex-col items-center justify-center gap-3 py-16 text-center" role="status">
	<span
		class="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent"
		aria-hidden="true"
	></span>
	<p class="text-sm text-muted">{message}</p>
</div>
