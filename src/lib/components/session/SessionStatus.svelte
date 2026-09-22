<script lang="ts">
	import type { CustomerSession } from '$lib/types';
	import Countdown from './Countdown.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	export let session: CustomerSession;

	$: progress =
		session.totalSeconds > 0 ? session.remainingSeconds / session.totalSeconds : 0;
</script>

{#if session.state === 'trial-active' || session.state === 'paid-active'}
	<div class="flex flex-col gap-5 rounded-card border border-line bg-surface p-6 shadow-card">
		<div>
			<p class="text-lg font-semibold text-ink">
				{session.state === 'trial-active' ? 'Internet Trial' : (session.packageName ?? 'Internet Aktif')}
			</p>
			<p class="text-sm text-muted">
				{session.state === 'trial-active'
					? 'Kamu sedang menggunakan internet trial.'
					: 'Paketmu sedang aktif.'}
			</p>
		</div>

		<div class="text-center">
			<Countdown remainingSeconds={session.remainingSeconds} />
			<p class="mt-1 text-sm text-muted">Waktu tersisa</p>
		</div>

		<ProgressBar value={progress} />

		<div class="flex items-center justify-between text-sm">
			<span class="text-muted">Speed</span>
			<span class="font-medium text-ink">{session.speed}</span>
		</div>

		{#if session.state === 'trial-active'}
			<div class="border-t border-line pt-4">
				<p class="mb-3 text-sm text-muted">Ingin internet lebih lama dan lebih cepat?</p>
				<Button variant="primary" on:click={() => (window.location.href = '/buy')}>Beli Paket</Button>
			</div>
		{/if}
	</div>
{:else if session.state === 'expired'}
	<div class="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 text-center shadow-card">
		<div>
			<p class="text-lg font-semibold text-ink">Trial berakhir</p>
			<p class="text-sm text-muted">Masa trial kamu sudah selesai.</p>
		</div>
		<div class="flex flex-col gap-2">
			<Button variant="secondary" on:click={() => (window.location.href = '/login')}>
				Masukkan Voucher
			</Button>
			<Button variant="primary" on:click={() => (window.location.href = '/buy')}>Beli Paket</Button>
		</div>
	</div>
{:else}
	<div class="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 text-center shadow-card">
		<div>
			<p class="text-lg font-semibold text-ink">Belum ada sesi aktif</p>
			<p class="text-sm text-muted">Login dengan voucher atau akun member untuk mulai.</p>
		</div>
		<Button variant="primary" on:click={() => (window.location.href = '/login')}>Login</Button>
	</div>
{/if}
