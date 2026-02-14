<script>
	import { onMount } from 'svelte';

	onMount(() => {
		['/bordel/bordel-hard.svg', '/bordel/bordel-soft.svg'].forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	});
</script>

<div
	class="bg-layer hard"
	data-speed="0.2"
	style="background-image: url('/bordel/bordel-hard.svg');"
></div>
<div
	class="bg-layer soft"
	data-speed="0.25"
	style="background-image: url('/bordel/bordel-soft.svg');"
></div>

<style>
	.bg-layer {
		position: absolute;
		inset: 0;
		z-index: 0;

		background-repeat: repeat;
		background-position: 0 0;
		background-size: auto;
		pointer-events: none;

		will-change: transform;
	}

	.bg-layer.hard {
		opacity: 0.3;
		mix-blend-mode: soft-light;
	}

	.bg-layer.soft {
		opacity: 0.15;
		mix-blend-mode: overlay;
	}
</style>
