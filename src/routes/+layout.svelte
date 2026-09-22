<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import BottomNav from '$lib/components/nav/BottomNav.svelte';
	import { appModeStore } from '$lib/stores/appModeStore';

	// Mode Captive Login: hanya layar /login pertama kali dibuka, tanpa bottom nav.
	// Begitu pengguna masuk ke rute manapun selain /login (klik "Beli sekarang",
	// atau berhasil login), shell berpindah ke mode Application secara permanen
	// untuk sesi tab ini — termasuk kalau nanti kembali lagi ke /login.
	$: if ($page.url.pathname !== '/login') {
		appModeStore.enterApplicationMode();
	}

	$: showBottomNav = $appModeStore === 'application';
</script>

<div class="mx-auto min-h-screen w-full max-w-md bg-paper" style="min-height: 100dvh;">
	<main class={showBottomNav ? 'pb-28' : ''}>
		<slot />
	</main>

	{#if showBottomNav}
		<BottomNav />
	{/if}
</div>
