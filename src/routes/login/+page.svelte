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

<div class="flex min-h-screen flex-col justify-center px-6 py-12">
	<div class="mb-10 flex flex-col items-center gap-2 text-center">
		<Logo />
		<p class="text-sm text-muted">Internet cepat, mudah, dan nyaman.</p>
	</div>

	<div class="rounded-card border border-line bg-surface p-5 shadow-card">
		<div class="mb-5">
			<AuthTabs bind:mode />
		</div>

		{#if mode === 'voucher'}
			<VoucherLoginForm on:success={handleSuccess} />
		{:else}
			<MemberLoginForm on:success={handleSuccess} />
		{/if}
	</div>
</div>
