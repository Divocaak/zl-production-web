<script>
	import Hero from '$lib/sections/Hero.svelte';
	import StatsGrid from '$lib/StatsGrid.svelte';
	import BentoGallery from '$lib/blog/BentoGallery.svelte';
	import VideoModalButton from '$lib/videoModal/VideoModalButton.svelte';

	export let data;
</script>

{#if data.hero}
	{#if data.hero.videoSrc}
		<div class="video-wrapper">
			<VideoModalButton videoSrc={data.hero.videoSrc}>
				<Hero
					logoSrc={data.hero.logoSrc}
					heading={data.hero.label}
					taglines={[data.hero.tagline]}
					hasButton={true}
				/>
			</VideoModalButton>
		</div>
	{:else}
		<Hero logoSrc={data.hero.logoSrc} tagline={data.hero.tagline} />
	{/if}
{/if}

{#if data.textBeforeStats}
	<div class="blog-text">
		{#each data.textBeforeStats as text}
			<p>{@html text}</p>
		{/each}
	</div>
{/if}

{#if data.stats}
	<StatsGrid columns={data.stats.columns} maxWidth={data.stats.maxWidth} items={data.stats.items} />
{/if}

{#if data.textAfterStats}
	<div class="blog-text">
		{#each data.textBeforeStats as text}
			<p>{@html text}</p>
		{/each}
	</div>
{/if}

<slot />

{#if data.gallery}
	<BentoGallery images={data.gallery} />
{/if}

<style>
	.video-wrapper {
		margin-bottom: 25vh;
	}

	.blog-text {
		padding: 5rem var(--general-px);
	}
	:global(.blog-text p span) {
		color: var(--zl-red);
		font-weight: bolder;
	}

	/* Bigger than 1920px (ultrawide / 2K / 4K) */
	@media (min-width: 1921px) {
		.blog-text {
			padding: 0 20%;
		}
	}
</style>
