<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let bindContainer;

	const layers = [
		'/homepage/landing/full.png',
		'/homepage/landing/v4.png',
		'/homepage/landing/v3.png',
		'/homepage/landing/v2.png',
		'/homepage/landing/v1.png'
	];

	let st;

	function preloadImages(urls) {
		urls.forEach((url) => {
			const img = new Image();
			img.src = url;
		});
	}

	onMount(async () => {
		if (!bindContainer) return;
		preloadImages(layers);

		const wrappers = bindContainer.querySelectorAll('.layer-wrapper');
		const depths = Array.from(wrappers).map((_, i) =>
			gsap.utils.interpolate(30, 200, Math.pow(i / (wrappers.length - 1), 2))
		);

		let raf;
		st = ScrollTrigger.create({
			trigger: bindContainer,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,
			invalidateOnRefresh: true,
			onUpdate: (self) => {
				const progress = self.progress;
				if (!raf) {
					raf = requestAnimationFrame(() => {
						wrappers.forEach((wrapper, i) => {
							const depth = depths[i];
							wrapper.style.transform = `translate3d(0, ${depth - progress * 2 * depth}px, 0)`;
						});
						raf = null;
					});
				}
			}
		});
	});

	onDestroy(() => {
		if (st) st.kill();
	});
</script>

<div bind:this={bindContainer} class="parallax-wrapper">
	<div class="parallax-mask">
		{#each layers as layer}
			<div class="layer-wrapper">
				<img src={layer} alt="" class="layer" loading="eager" />
			</div>
		{/each}
	</div>
</div>

<style>
	.parallax-wrapper {
		position: absolute;
		inset: 0;
		height: 120vh;
		transform-style: preserve-3d;
		pointer-events: none;
	}

	.parallax-mask {
		position: absolute;
		inset: 0;
		width: 120%;
		height: 120%;
		margin: -10%;

		mask-image: url('/hero-mask/0.svg');
		mask-repeat: no-repeat;
		mask-position: center;
		mask-size: cover;
		mask-mode: luminance;

		-webkit-mask-image: url('/hero-mask/0.svg');
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		-webkit-mask-size: cover;
		-webkit-mask-mode: luminance;

		/* animation: mask-breathe 8s ease-in-out infinite; */
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

	@keyframes mask-breathe {
		0% {
			mask-position: center;
			-webkit-mask-position: center;
			filter: blur(1px);
		}
		25% {
			mask-position: 48% 48%;
			-webkit-mask-position: 48% 48%;
			filter: blur(0px);
		}
		50% {
			mask-position: 52% 52%;
			-webkit-mask-position: 52% 52%;
			filter: blur(1px);
		}
		75% {
			mask-position: 48% 52%;
			-webkit-mask-position: 48% 52%;
			filter: blur(0px);
		}
		100% {
			mask-position: center;
			-webkit-mask-position: center;
			filter: blur(1px);
		}
	}
</style>
