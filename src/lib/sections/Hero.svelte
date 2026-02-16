<script>
	import ParallaxLayers from '$lib/sections/hero/ParallaxLayers.svelte';
	import HeroContent from '$lib/sections/hero/HeroContent.svelte';
	import { loadingDone } from '$lib/stores/loading';
</script>

<div class="hero-wrapper">
	<ParallaxLayers maskId="splash-mask" />
	<HeroContent trigger={$loadingDone}/>
</div>

<style>
	.hero-wrapper{
		position: relative;
		height: 100vh;
		width: 100%;
	}
</style>