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

	$: activeIndex = items.findIndex((item) => isActive(item.href, $page.url.pathname));
</script>

<nav
	class="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4"
	style="padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));"
	aria-label="Navigasi utama"
>
	<div class="relative flex w-full max-w-sm items-stretch rounded-pill bg-ink p-2 shadow-nav">
		{#if activeIndex >= 0}
			<div
				class="absolute inset-y-2 left-2 w-[calc((100%-1rem)/3)] rounded-pill bg-gold transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
				style="transform: translateX({activeIndex * 100}%)"
				aria-hidden="true"
			></div>
		{/if}
		{#each items as item, i (item.href)}
			{@const active = i === activeIndex}
			<a
				href={item.href}
				class="relative z-10 flex flex-1 flex-col items-center gap-0.5 rounded-pill px-3 py-2 text-xs font-medium transition-all duration-300 ease-out active:scale-90
					{active ? 'text-ink' : 'text-paper/60 hover:text-paper'}"
				aria-current={active ? 'page' : undefined}
			>
				<span class="h-5 w-5 transition-transform duration-300 {active ? 'scale-110' : ''}" aria-hidden="true">
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
