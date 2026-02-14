<script>
	import SplashMask from '$lib/sections/hero/SplashMask.svelte';
	import ParallaxLayers from '$lib/sections/hero/ParallaxLayers.svelte';
	import LoadingAndContent from '$lib/sections/hero/LoadingAndContent.svelte';

	let maskSvg;
	let triggerHero = false;

	function onMaskLoaded() {
		triggerHero = true;
	}
</script>

<!-- TODO few pixels on top -->
<SplashMask bindMask={maskSvg} on:loaded={onMaskLoaded} />
<ParallaxLayers maskId="splash-mask" />
<LoadingAndContent trigger={triggerHero} />
