<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	gsap.registerPlugin(ScrollTrigger);

	export let bindContainer;
	export let maskId = 'splash-mask';

	const layers = [
		'/homepage/landing/full.png',
		'/homepage/landing/v4.png',
		'/homepage/landing/v3.png',
		'/homepage/landing/v2.png',
		'/homepage/landing/v1.png'
	];

	onMount(() => {
		const wrappers = bindContainer.querySelectorAll('.layer-wrapper');

		wrappers.forEach((wrapper, i) => {
			const t = i / (wrappers.length - 1);
			const depth = gsap.utils.interpolate(30, 200, t * t);

			gsap.fromTo(
				wrapper,
				{ y: depth },
				{
					y: -depth,
					ease: 'none',
					scrollTrigger: {
						trigger: bindContainer,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
						invalidateOnRefresh: true
					}
				}
			);
		});
	});
</script>

<div
	bind:this={bindContainer}
	class="parallax masked"
	style="mask: url(#{maskId}); -webkit-mask: url(#{maskId}); mask-repeat: no-repeat; mask-size: 100% 100%; -webkit-mask-size: 100% 100%;"
>
	{#each layers as layer}
		<div class="layer-wrapper">
			<img src={layer} alt="" class="layer" />
		</div>
	{/each}
</div>

<style>
	.parallax {
		position: relative;
		height: 120vh;
		overflow: hidden;
	}

	.layer-wrapper {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 120%;
		will-change: transform;
	}

	.layer {
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
		backface-visibility: hidden;
		transform: translateZ(0);
	}
</style>
