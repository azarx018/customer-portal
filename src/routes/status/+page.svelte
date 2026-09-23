<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SessionStatus from '$lib/components/session/SessionStatus.svelte';
	import LoadingState from '$lib/components/ui/LoadingState.svelte';
	import { sessionService } from '$lib/services/sessionService';
	import type { CustomerSession } from '$lib/types';

	let session: CustomerSession | null = null;
	let loading = true;
	let refreshTimer: ReturnType<typeof setInterval>;

	async function loadSession() {
		session = await sessionService.getSession();
	}

	onMount(async () => {
		await loadSession();
		loading = false;

		// Polling ringan — nanti ini yang membaca sisa waktu asli dari
		// GET /session (backend query ke RouterOS active/print), bukan
		// dihitung sendiri di frontend.
		refreshTimer = setInterval(loadSession, 15000);
	});

	onDestroy(() => clearInterval(refreshTimer));
</script>

<svelte:head>
	<title>Status — WiFiNet</title>
</svelte:head>

<div class="mx-auto w-full max-w-xl px-5 pt-8 lg:pt-14">
	<h1 class="text-xl font-semibold text-ink lg:text-2xl">Status Internet</h1>

	<div class="mt-6">
		{#if loading || !session}
			<LoadingState message="Memeriksa status..." />
		{:else}
			<SessionStatus {session} />
		{/if}
	</div>
</div>
