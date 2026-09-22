<script lang="ts">
	import { page } from '$app/stores';

	const items = [
		{ href: '/login', label: 'Login', icon: 'login' },
		{ href: '/buy', label: 'Beli', icon: 'buy' },
		{ href: '/status', label: 'Status', icon: 'status' }
	] as const;

	function isActive(href: string, pathname: string) {
		if (href === '/buy') return pathname.startsWith('/buy');
		return pathname === href;
	}
</script>

<nav
	class="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4"
	style="padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));"
	aria-label="Navigasi utama"
>
	<div class="flex w-full max-w-sm items-stretch justify-between gap-1 rounded-pill bg-ink px-2 py-2 shadow-nav">
		{#each items as item (item.href)}
			{@const active = isActive(item.href, $page.url.pathname)}
			<a
				href={item.href}
				class="flex flex-1 flex-col items-center gap-0.5 rounded-pill px-3 py-2 text-xs font-medium transition
					{active ? 'bg-signal text-ink' : 'text-paper/70 hover:text-paper'}"
				aria-current={active ? 'page' : undefined}
			>
				<span class="h-5 w-5" aria-hidden="true">
					{#if item.icon === 'login'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
							<path d="M10 17l5-5-5-5" />
							<path d="M15 12H3" />
						</svg>
					{:else if item.icon === 'buy'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M6 2l1.5 4h9L18 2" />
							<path d="M3.5 6h17l-1.6 11.2a2 2 0 0 1-2 1.8H7.1a2 2 0 0 1-2-1.8L3.5 6z" />
							<circle cx="9.5" cy="21.5" r="0.9" />
							<circle cx="16.5" cy="21.5" r="0.9" />
						</svg>
					{:else}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M4 18v-3a8 8 0 0 1 16 0v3" />
							<path d="M2 18h4v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3z" />
							<path d="M18 18h4v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3z" />
						</svg>
					{/if}
				</span>
				{item.label}
			</a>
		{/each}
	</div>
</nav>
