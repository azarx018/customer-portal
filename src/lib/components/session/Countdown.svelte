<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { formatCountdown } from '$lib/utils/format';

	// PENTING: timer di sini cuma tampilan lokal antar-tick. Sumber kebenaran
	// tetap remainingSeconds yang dikirim dari luar (nanti dari GET /session,
	// yang membaca sisa waktu asli dari MikroTik). Komponen ini tidak pernah
	// menghitung sendiri dari nol.
	export let remainingSeconds: number;

	let displaySeconds = remainingSeconds;
	let interval: ReturnType<typeof setInterval>;

	$: displaySeconds = remainingSeconds;

	onMount(() => {
		interval = setInterval(() => {
			displaySeconds = Math.max(0, displaySeconds - 1);
		}, 1000);
	});

	onDestroy(() => clearInterval(interval));
</script>

<p class="text-4xl font-semibold tabular-nums text-ink" aria-live="polite">
	{formatCountdown(displaySeconds)}
</p>
