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
			error = err instanceof Error ? err.message : 'Terjadi kesalahan, coba lagi.';
		} finally {
			loading = false;
		}
	}
</script>

<form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
	<Input id="member-username" label="Username" bind:value={username} autocomplete="username" />
	<Input
		id="member-password"
		label="Password"
		type="password"
		bind:value={password}
		autocomplete="current-password"
		{error}
	/>
	<Button type="submit" {loading}>Login</Button>
</form>
