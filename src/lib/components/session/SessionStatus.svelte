<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CustomerSession } from '$lib/types';
	import Countdown from './Countdown.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { formatClockTime, formatDataUsage } from '$lib/utils/format';

	export let session: CustomerSession;

	$: progress =
		session.totalSeconds > 0 ? session.remainingSeconds / session.totalSeconds : 0;

	// Peringatan visual begitu sisa waktu tinggal 20% — biar user sadar
	// sebelum internetnya mati mendadak, bukan cuma keliatan pas udah 0.
	$: isLow = progress > 0 && progress <= 0.2;
</script>

{#if session.state === 'trial-active' || session.state === 'paid-active'}
	<div class="animate-fade-up flex flex-col gap-5 rounded-card border border-line bg-surface p-6 shadow-card">
		<div class="flex items-start justify-between gap-3">
			<div class="flex items-center gap-3">
				<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal-dim text-signal" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
						<path d="M5 12.5a10 10 0 0 1 14 0" />
						<path d="M8 16a5.5 5.5 0 0 1 8 0" />
						<circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
					</svg>
				</span>
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
			</div>

			{#if session.source}
				<span class="shrink-0 rounded-full bg-paper px-2.5 py-1 text-[11px] font-medium text-muted">
					{session.source === 'voucher' ? 'via Voucher' : 'via Member'}
				</span>
			{/if}
		</div>

		<div class="text-center">
			<Countdown remainingSeconds={session.remainingSeconds} warn={isLow} />
			<p class="mt-1 text-sm {isLow ? 'font-medium text-danger' : 'text-muted'}">
				{isLow ? 'Waktu hampir habis' : 'Waktu tersisa'}
			</p>
		</div>

		<ProgressBar value={progress} tone={isLow ? 'danger' : 'signal'} />

		<!-- Grid stat kecil — digabung biar ringkas, bukan baris satu-satu -->
		<div class="grid grid-cols-2 gap-3 rounded-2xl bg-paper p-3 text-center">
			<div>
				<p class="text-[11px] text-muted">Kecepatan</p>
				<p class="mt-0.5 flex items-center justify-center gap-1 text-sm font-medium text-ink">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-muted">
						<path d="M4 15a8 8 0 0 1 16 0" />
						<path d="M12 15l4-5" />
					</svg>
					{session.speed}
				</p>
			</div>
			{#if session.dataUsedMB !== undefined}
				<div>
					<p class="text-[11px] text-muted">Data Terpakai</p>
					<p class="mt-0.5 flex items-center justify-center gap-1 text-sm font-medium text-ink">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-muted">
							<path d="M12 3v12" />
							<path d="M7 10l5 5 5-5" />
							<path d="M5 19h14" />
						</svg>
						{formatDataUsage(session.dataUsedMB)}
					</p>
				</div>
			{/if}
			{#if session.connectedAt}
				<div class="col-span-2 border-t border-line pt-3">
					<p class="text-[11px] text-muted">Terhubung Sejak</p>
					<p class="mt-0.5 flex items-center justify-center gap-1 text-sm font-medium text-ink">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-muted">
							<circle cx="12" cy="12" r="9" />
							<path d="M12 7v5l3 3" />
						</svg>
						{formatClockTime(session.connectedAt)}
					</p>
				</div>
			{/if}
		</div>

		{#if session.state === 'trial-active'}
			<div class="border-t border-line pt-4">
				<p class="mb-3 text-sm text-muted">Ingin internet lebih lama dan lebih cepat?</p>
				<Button variant="primary" on:click={() => goto('/buy')}>Beli Paket</Button>
			</div>
		{/if}

		{#if session.sessionId}
			<p class="text-center text-[11px] text-muted">ID Sesi: {session.sessionId}</p>
		{/if}
	</div>
{:else if session.state === 'expired'}
	<div class="animate-fade-up flex flex-col gap-4 rounded-card border border-line bg-surface p-6 text-center shadow-card">
		<span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger-dim text-danger" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
				<circle cx="12" cy="12" r="9" />
				<path d="M12 8v5" />
				<path d="M12 16h.01" />
			</svg>
		</span>
		<div>
			<p class="text-lg font-semibold text-ink">Trial berakhir</p>
			<p class="text-sm text-muted">Masa trial kamu sudah selesai.</p>
		</div>
		<div class="flex flex-col gap-2">
			<Button variant="secondary" on:click={() => goto('/login')}>Masukkan Voucher</Button>
			<Button variant="primary" on:click={() => goto('/buy')}>Beli Paket</Button>
		</div>
	</div>
{:else}
	<div class="animate-fade-up flex flex-col gap-4 rounded-card border border-line bg-surface p-6 text-center shadow-card">
		<span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-paper text-muted" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
				<path d="M5 12.5a10 10 0 0 1 14 0" />
				<path d="M8 16a5.5 5.5 0 0 1 8 0" />
				<circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
			</svg>
		</span>
		<div>
			<p class="text-lg font-semibold text-ink">Belum ada sesi aktif</p>
			<p class="text-sm text-muted">Login dengan voucher atau akun member untuk mulai.</p>
		</div>
		<Button variant="primary" on:click={() => goto('/login')}>Login</Button>
	</div>
{/if}
