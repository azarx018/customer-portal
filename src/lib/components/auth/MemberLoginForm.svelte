<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { authService } from '$lib/services/authService';
	import type { AuthSession } from '$lib/types';

	const dispatch = createEventDispatcher<{ success: AuthSession }>();

	let username = '';
	let password = '';
	let loading = false;
	let error = '';

	async function handleSubmit() {
		error = '';
		if (!username.trim() || !password) {
			error = 'Lengkapi username dan password.';
			return;
		}
		loading = true;
		try {
			const session = await authService.loginMember(username, password);
			dispatch('success', session);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan. Coba lagi.';
		} finally {
			loading = false;
		}
	}
</script>

<form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
	<Input id="member-username" label="Username" bind:value={username} autocomplete="username">
		<svelte:fragment slot="icon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="8" r="3.5" />
				<path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
			</svg>
		</svelte:fragment>
	</Input>
	<Input
		id="member-password"
		label="Password"
		type="password"
		bind:value={password}
		autocomplete="current-password"
		{error}
	>
		<svelte:fragment slot="icon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
				<path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
			</svg>
		</svelte:fragment>
	</Input>

	<Button type="submit" {loading}>
		{#if loading}
			Memeriksa akun...
		{:else}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
				<path d="M5 12h14" />
				<path d="M13 6l6 6-6 6" />
			</svg>
			Masuk Sekarang
		{/if}
	</Button>
</form>
