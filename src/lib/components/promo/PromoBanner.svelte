<script lang="ts">
	import type { PromoBanner } from '$lib/types';

	export let banner: PromoBanner;
</script>

<a
	href={banner.href}
	class="flex w-full items-center gap-3 rounded-card border border-gold/30 bg-gold-dim/60 p-4 transition-colors duration-200 hover:bg-gold-dim active:scale-[0.99] sm:p-5"
>
	<!--
		Thumbnail gambar kalau admin udah upload, fallback ke icon kalau belum.
		Ukuran dijaga moderat (h-14 w-14) — cukup kelihatan tapi gak
		mendominasi card, sesuai pola banner promo di web pada umumnya.
	-->
	<span
		class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gold text-ink"
		aria-hidden="true"
	>
		{#if banner.imageUrl}
			<img src={banner.imageUrl} alt="" class="h-full w-full object-cover" loading="lazy" />
		{:else}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
				<path d="M3 11v2a2 2 0 0 0 2 2h1l3 5V4l-3 5H5a2 2 0 0 0-2 2z" />
				<path d="M13 8.5a13 13 0 0 1 6-3.2v13.4a13 13 0 0 1-6-3.2" />
				<path d="M8 15.5v3a1.5 1.5 0 0 0 3 0v-2" />
			</svg>
		{/if}
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
