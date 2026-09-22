<script lang="ts">
	export let value: number; // 0-1
	export let tone: 'signal' | 'danger' = 'signal';

	$: percent = Math.min(100, Math.max(0, value * 100));
	$: barColor = tone === 'danger' ? 'bg-danger' : 'bg-signal';
</script>

<div
	class="h-2 w-full overflow-hidden rounded-pill bg-line"
	role="progressbar"
	aria-valuenow={Math.round(percent)}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<div
		class="h-full rounded-pill {barColor} transition-[width] duration-500 ease-out"
		style="width: {percent}%"
	></div>
</div>
