<script>
	import ParallaxLayers from '$lib/sections/hero/ParallaxLayers.svelte';
	import HeroContent from '$lib/sections/hero/HeroContent.svelte';
	import { loadingDone } from '$lib/stores/loading';

	export let logoSrc;
	export let tagline;
	export let hasButton = false;
</script>

<div class="hero-wrapper">
	<ParallaxLayers maskId="splash-mask" />
	<HeroContent trigger={$loadingDone} image={logoSrc} text={tagline} {hasButton}/>
</div>

<style>
	.hero-wrapper {
		position: relative;
		height: 100vh;
		width: 100%;

		margin-bottom: 25vh;
	}
</style>
