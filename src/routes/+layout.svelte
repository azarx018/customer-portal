<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import BottomNav from '$lib/components/nav/BottomNav.svelte';
	import { appModeStore } from '$lib/stores/appModeStore';

	// Mode Captive Login: hanya layar /login pertama kali dibuka, tanpa bottom nav.
	// Application mode baru aktif begitu pengguna benar-benar masuk ke bagian /buy
	// atau /status — BUKAN cuma "selain /login", karena rute redirect awal ('/')
	// juga sempat ter-render sesaat sebelum lempar ke /login, dan itu jangan
	// dihitung sebagai "masuk aplikasi".
	$: if ($page.url.pathname.startsWith('/buy') || $page.url.pathname.startsWith('/status')) {
		appModeStore.enterApplicationMode();
	}

	$: showBottomNav = $appModeStore === 'application';
</script>

<div class="mx-auto flex w-full max-w-md flex-col bg-paper" style="min-height: 100dvh;">
	<main class={showBottomNav ? 'pb-28' : ''}>
		<slot />
	</main>

	{#if showBottomNav}
		<BottomNav />
	{/if}
</div>
