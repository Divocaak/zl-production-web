<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container;

	onMount(() => {
		const layers = container.querySelectorAll('.layer');

		const ctx = gsap.context(() => {
			layers.forEach((layer, i) => {
				const depth = (i + 1) * 100;

				gsap.fromTo(
					layer,
					{ y: depth },
					{
						y: -depth,
						ease: 'none',
						scrollTrigger: {
							trigger: container,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true
						}
					}
				);
			});
		}, container);

		return () => ctx.revert();
	});
</script>

<section bind:this={container} class="parallax">
	<!-- back → front order -->
	<img src="/homepage/landing/full.png" alt="" class="layer" />
	<img src="/homepage/landing/v4.png" alt="" class="layer" />
	<img src="/homepage/landing/v3.png" alt="" class="layer" />
	<img src="/homepage/landing/v2.png" alt="" class="layer" />
	<img src="/homepage/landing/v1.png" alt="" class="layer" />
</section>
<div class="spacer"></div>

<style>
	.spacer {
		height: 1000px;
	}

	.parallax {
		position: relative;
		height: 120vh; /* scroll space */
		overflow: hidden;
	}

	.layer {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 120%; /* 👈 overscan */
		top: -10%; /* 👈 center the overscan */
		object-fit: cover;
		will-change: transform;
		pointer-events: none;
	}
</style>
