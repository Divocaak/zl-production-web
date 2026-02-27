<script>
	import Hero from '$lib/sections/Hero.svelte';
	import StatsGrid from '$lib/StatsGrid.svelte';
	import BentoGallery from '$lib/blog/BentoGallery.svelte';

	export let data;
</script>

{#if data.hero}
	<Hero logoSrc={data.hero.logoSrc} tagline={data.hero.tagline} />
{/if}

{#if data.textBeforeStats}
	<div class="blog-text">
		{#each data.textBeforeStats as text}
			<p>{@html text}</p>
		{/each}
	</div>
{/if}

{#if data.stats}
	<div class="stats-wrapper">
		<StatsGrid
			columns={data.stats.columns}
			maxWidth={data.stats.maxWidth}
			items={data.stats.items}
		/>
	</div>
{/if}

{#if data.textAfterStats}
	<div class="blog-text">
		{#each data.textBeforeStats as text}
			<p>{@html text}</p>
		{/each}
	</div>
{/if}

{#if data.gallery}
	<BentoGallery images={data.gallery} />
{/if}

<style>
	.blog-text {
		padding: 5rem 10rem;
	}
	:global(.blog-text p span) {
		color: var(--zl-red);
		font-weight: bolder;
	}

	.stats-wrapper {
		padding: 5rem 0;
	}
</style>
