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

<!--
	Shell global — SENGAJA gak lagi "kartu HP yang di-center" kayak sebelumnya.
	Setiap halaman sekarang yang atur lebar/layout responsif-nya sendiri
	(lihat /login buat contoh split-screen di layar lebar), jadi konten
	beneran reflow ngikutin ukuran layar, bukan cuma jarak kiri-kanan yang
	nambah. Shell ini cuma nyediain background + tempat bottom nav.
-->
<div class="min-h-[100dvh] bg-paper">
	<main class={showBottomNav ? 'pb-28' : ''}>
		<slot />
	</main>

	{#if showBottomNav}
		<BottomNav />
	{/if}
</div>
