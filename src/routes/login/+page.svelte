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

	const benefits = [
		{ label: 'Koneksi Stabil', icon: 'bolt' },
		{ label: 'Aman & Terpercaya', icon: 'shield' },
		{ label: 'Kecepatan Optimal', icon: 'gauge' }
	] as const;

	const trustPoints = [
		{ label: 'Proses cepat & mudah', icon: 'clock' },
		{ label: 'Pembayaran aman (QRIS / e-Wallet)', icon: 'shield-check' },
		{ label: 'CS 24 Jam Siap membantu', icon: 'headset' }
	] as const;
</script>

<svelte:head>
	<title>Login — WiFiNet</title>
</svelte:head>

<div class="flex min-h-[100dvh] flex-col overflow-hidden">
	<!-- HERO -->
	<div class="relative overflow-hidden bg-gradient-to-br from-ink via-ink to-ink-soft px-6 pb-20 pt-8">
		<!-- Ilustrasi jaringan abstrak — ringan (SVG murni), bukan foto stok -->
		<svg
			class="pointer-events-none absolute -right-6 top-16 h-40 w-40 text-paper/10"
			viewBox="0 0 200 200"
			fill="none"
			aria-hidden="true"
		>
			<circle cx="100" cy="100" r="90" stroke="currentColor" stroke-width="1.5" />
			<circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="1.5" />
			<circle cx="100" cy="100" r="30" stroke="currentColor" stroke-width="1.5" />
			<circle cx="100" cy="10" r="4" fill="currentColor" />
			<circle cx="185" cy="70" r="3" fill="currentColor" />
			<circle cx="30" cy="150" r="3" fill="currentColor" />
		</svg>
		<div
			class="pointer-events-none absolute -left-14 bottom-0 h-32 w-32 rounded-full bg-gold/10 blur-3xl"
			aria-hidden="true"
		></div>

		<!-- Brand row + status badge -->
		<div class="relative flex items-start justify-between">
			<Logo variant="light" />
			<span class="flex items-center gap-1.5 rounded-full bg-paper/10 px-3 py-1.5 text-xs font-medium text-paper/90">
				<span class="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true"></span>
				Layanan Aktif
			</span>
		</div>

		<!-- Headline -->
		<div class="relative mt-8">
			<h1 class="text-3xl font-semibold leading-tight text-paper">
				Nikmati Internet<br />Tanpa Batas
			</h1>
			<p class="mt-2 max-w-[85%] text-sm text-paper/70">
				Akses cepat dan stabil untuk aktivitas online kamu.
			</p>
		</div>

		<!-- Benefit micro section -->
		<div class="relative mt-6 flex gap-4">
			{#each benefits as benefit (benefit.label)}
				<div class="flex items-center gap-2">
					<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper" aria-hidden="true">
						{#if benefit.icon === 'bolt'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
								<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
							</svg>
						{:else if benefit.icon === 'shield'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
								<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
							</svg>
						{:else}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
								<path d="M4 15a8 8 0 0 1 16 0" />
								<path d="M12 15l4-5" />
							</svg>
						{/if}
					</span>
					<span class="text-[11px] font-medium leading-tight text-paper/80">{benefit.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- LOGIN CARD (overlap ke hero) -->
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

			<div class="my-5 flex items-center gap-3" aria-hidden="true">
				<span class="h-px flex-1 bg-line"></span>
				<span class="text-xs text-muted">atau</span>
				<span class="h-px flex-1 bg-line"></span>
			</div>

			<a
				href="/buy"
				class="flex items-center gap-3 rounded-2xl bg-gold-dim/70 p-4 text-left transition-colors duration-200 hover:bg-gold-dim active:scale-[0.99]"
			>
				<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
						<path d="M12 2v4M8 6h8l1 4H7l1-4z" />
						<rect x="4" y="10" width="16" height="10" rx="2" />
						<path d="M12 10v10" />
					</svg>
				</span>
				<span class="min-w-0 flex-1">
					<span class="block text-sm font-semibold text-ink">Belum punya voucher?</span>
					<span class="block text-xs text-muted">Pilih paket sesuai kebutuhanmu dan nikmati internet super cepat!</span>
				</span>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 text-muted">
					<path d="M9 6l6 6-6 6" />
				</svg>
			</a>
		</div>

		<!-- Trust row -->
		<div class="mt-6 flex items-start justify-between gap-2 px-1 text-center">
			{#each trustPoints as point, i (point.label)}
				<div class="flex flex-1 flex-col items-center gap-1.5 {i > 0 ? 'border-l border-line pl-2' : ''}">
					<span class="text-ink" aria-hidden="true">
						{#if point.icon === 'clock'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
								<circle cx="12" cy="12" r="9" />
								<path d="M12 7v5l3 3" />
							</svg>
						{:else if point.icon === 'shield-check'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
								<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
								<path d="M9.5 12l1.8 1.8L15 10" />
							</svg>
						{:else}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
								<path d="M4 14v-2a8 8 0 0 1 16 0v2" />
								<rect x="2.5" y="14" width="4" height="5" rx="1.5" />
								<rect x="17.5" y="14" width="4" height="5" rx="1.5" />
							</svg>
						{/if}
					</span>
					<span class="text-[11px] leading-tight text-muted">{point.label}</span>
				</div>
			{/each}
		</div>

		<div class="flex-1"></div>

		<p class="pb-6 pt-8 text-center text-xs text-muted">Powered by WiFiNet</p>
	</div>
</div>
