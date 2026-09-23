<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { authService } from '$lib/services/authService';
	import type { AuthSession } from '$lib/types';

	const dispatch = createEventDispatcher<{ success: AuthSession }>();

	let code = '';
	let loading = false;
	let error = '';

	// Normalisasi uppercase otomatis — aman karena backend membandingkan
	// kode voucher dengan .toUpperCase() (lihat mockAuthService). Kalau nanti
	// sistem voucher asli case-sensitive, baris reaktif ini yang pertama dicabut.
	$: code = code.toUpperCase();

	async function handleSubmit() {
		error = '';
		if (!code.trim()) {
			error = 'Masukkan kode voucher terlebih dahulu.';
			return;
		}
		loading = true;
		try {
			const session = await authService.loginVoucher(code);
			dispatch('success', session);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan. Coba lagi.';
		} finally {
			loading = false;
		}
	}
</script>

<form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
	<Input
		id="voucher-code"
		label="Kode Voucher"
		bind:value={code}
		placeholder="Contoh: ABC123XYZ"
		autocomplete="one-time-code"
		{error}
	>
		<svelte:fragment slot="icon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V9z" />
				<path d="M9 8v8" stroke-dasharray="2 2" />
			</svg>
		</svelte:fragment>
	</Input>

	<Button type="submit" {loading}>
		{#if loading}
			Memeriksa voucher...
		{:else}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
				<path d="M5 12h14" />
				<path d="M13 6l6 6-6 6" />
			</svg>
			Masuk Sekarang
		{/if}
	</Button>
</form>
