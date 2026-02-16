<script>
	export let src;
	export let alt = '';
	export let imageEl;
	export let widthPercent = 100;
</script>

<!-- TODO add optional parallax fx -->
<!-- TODO check where used and if it wont be better with the fx -->
<div class="masked-container" style="--width: {widthPercent}%">
	<div class="mask">
		<img bind:this={imageEl} class="masked-image" {src} {alt} />
	</div>
	<slot />
</div>

<style>
	:root {
		--width: 100%;
	}

	.masked-container {
		aspect-ratio: 1 / 1;
		position: relative;
		width: var(--width);
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));

		margin: 0 auto;
	}

	.mask {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;

		-webkit-mask-image: url('/splashes/2.svg');
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		-webkit-mask-size: contain;

		mask-image: url('/splashes/2.svg');
		mask-repeat: no-repeat;
		mask-position: center;
		mask-size: contain;
	}

	.masked-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center;

		will-change: transform;
		transform: translateZ(0);
	}
</style>
