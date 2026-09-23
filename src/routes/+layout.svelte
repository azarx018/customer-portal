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
	Wrapper luar: cuma buat nyentering panel di layar lebar (sm ke atas).
	Tinggi penuh (100dvh) sengaja cuma dipasang SEKALI di panel dalam —
	sebelumnya dipasang dobel (di sini + di tiap halaman) dan itu yang
	bikin dokumen jadi lebih tinggi dari viewport, sehingga bottom nav
	yang fixed nutupin konten yang belum ke-scroll.
-->
<div class="flex justify-center bg-backdrop min-[28rem]:py-10">
	<div
		class="flex min-h-[100dvh] w-full max-w-md flex-col bg-paper min-[28rem]:min-h-0 min-[28rem]:overflow-hidden min-[28rem]:rounded-[32px] min-[28rem]:border min-[28rem]:border-line min-[28rem]:shadow-floating"
	>
		<main class={showBottomNav ? 'pb-28' : ''}>
			<slot />
		</main>
	</div>

	{#if showBottomNav}
		<BottomNav />
	{/if}
</div>
