<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/brand/Logo.svelte';
	import AuthTabs from '$lib/components/auth/AuthTabs.svelte';
	import VoucherLoginForm from '$lib/components/auth/VoucherLoginForm.svelte';
	import MemberLoginForm from '$lib/components/auth/MemberLoginForm.svelte';
	import { authStore } from '$lib/stores/authStore';
	import type { AuthMode, AuthSession } from '$lib/types';

	let mode: AuthMode = 'voucher';

	function handleSuccess(event: CustomEvent<AuthSession>) {
		authStore.login(event.detail);
		goto('/status');
	}
</script>

<svelte:head>
	<title>Login — WiFiNet</title>
</svelte:head>

<div class="flex min-h-[100dvh] flex-col overflow-hidden">
	<!-- Hero: satu momen visual yang paling menonjol di halaman ini -->
	<div class="relative overflow-hidden bg-gradient-to-br from-ink via-ink to-ink-soft px-6 pb-16 pt-14 text-center">
		<div
			class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
			aria-hidden="true"
		></div>
		<div
			class="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-paper/10 blur-3xl"
			aria-hidden="true"
		></div>

		<div class="relative flex flex-col items-center gap-2">
			<Logo variant="light" />
			<p class="text-sm text-paper/70">Internet cepat, mudah, dan nyaman.</p>
		</div>
	</div>

	<!-- Kartu login mengambang, overlap ke hero -->
	<div class="flex flex-1 flex-col px-6">
		<div class="animate-fade-up -mt-10 rounded-card bg-surface p-5 shadow-floating">
			<div class="mb-5">
				<AuthTabs bind:mode />
			</div>

			{#if mode === 'voucher'}
				<VoucherLoginForm on:success={handleSuccess} />
			{:else}
				<MemberLoginForm on:success={handleSuccess} />
			{/if}
		</div>

		<div class="flex-1"></div>

		<p class="pb-6 pt-8 text-center text-xs text-muted">Powered by WiFiNet</p>
	</div>
</div>
