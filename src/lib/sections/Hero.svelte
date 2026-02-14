<script>
	import ParallaxLayers from '$lib/sections/hero/ParallaxLayers.svelte';
	import LoadingAndContent from '$lib/sections/hero/LoadingAndContent.svelte';

	let maskSvg;
	let triggerHero = true;

	function onMaskLoaded() {
		triggerHero = true;
	}
</script>

<div class="hero-wrapper">
	<ParallaxLayers maskId="splash-mask" />
	<LoadingAndContent trigger={triggerHero} />
</div>

<style>
	.hero-wrapper{
		position: relative;
		height: 100vh;
		width: 100%;
	}
</style>