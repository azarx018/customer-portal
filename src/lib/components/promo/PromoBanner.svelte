<script lang="ts">
	import type { PromoBanner } from '$lib/types';

	export let banner: PromoBanner;
</script>

<a
	href={banner.href}
	class="flex items-center gap-3 rounded-card border border-gold/30 bg-gold-dim/60 p-4 transition-colors duration-200 hover:bg-gold-dim active:scale-[0.99] sm:p-5"
>
	<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink" aria-hidden="true">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
			<path d="M3 11l18-7-7 18-2-8-8-2z" />
		</svg>
	</span>
	<span class="min-w-0 flex-1">
		<span class="block text-sm font-semibold text-ink">{banner.title}</span>
		<span class="block text-xs text-muted">{banner.description}</span>
	</span>
	<span class="hidden shrink-0 items-center gap-1 text-xs font-semibold text-gold-deep sm:flex">
		{banner.ctaLabel}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
			<path d="M9 6l6 6-6 6" />
		</svg>
	</span>
</a>
