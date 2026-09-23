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
			error = err instanceof Error ? err.message : 'Terjadi kesalahan, coba lagi.';
		} finally {
			loading = false;
		}
	}
</script>

<form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
	<Input id="voucher-code" label="Kode Voucher" bind:value={code} placeholder="Contoh: ABC123XYZ" {error} />
	<Button type="submit" {loading}>Login</Button>

	<p class="text-center text-sm text-muted">
		Belum punya kode?
		<a href="/buy" class="font-semibold text-gold-deep">Beli sekarang</a>
	</p>
</form>
