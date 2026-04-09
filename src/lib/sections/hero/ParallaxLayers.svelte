<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	const folders = ['mjls', 'kme', 'ppo', 'md'];
	let currentFolderIndex = 0;

	let activeLayers = getLayers(folders[0]);
	let nextLayers = [];
	let isTransitioning = false;

	let activeOpacity = 1;
	let nextOpacity = 0;

	let parallaxEl;
	let st;
	let interval;

	let fade = { v: 0 };

	function getLayers(folder) {
		return [
			`/homepage/${folder}/full.png`,
			`/homepage/${folder}/v4.png`,
			`/homepage/${folder}/v3.png`,
			`/homepage/${folder}/v2.png`,
			`/homepage/${folder}/v1.png`
		];
	}

	function preloadImages(urls) {
		urls.forEach((url) => {
			const img = new Image();
			img.src = url;
		});
	}

	onMount(() => {
		preloadImages(activeLayers);
		initScroll();

		interval = setInterval(() => {
			if (isTransitioning) return;
			currentFolderIndex = (currentFolderIndex + 1) % folders.length;
			nextLayers = getLayers(folders[currentFolderIndex]);
			preloadImages(nextLayers);
			crossfade();
		}, 5000);
	});

	onDestroy(() => {
		clearInterval(interval);
		st?.kill();
	});

	function initScroll() {
		st?.kill();

		if (!parallaxEl) return;
		const wrappers = Array.from(parallaxEl.querySelectorAll('.layer-wrapper'));
		if (!wrappers.length) return;
		const max = Math.max(wrappers.length - 1, 1);
		const depths = wrappers.map((_, i) => gsap.utils.interpolate(30, 200, Math.pow(i / max, 2)));

		let raf;
		st = ScrollTrigger.create({
			trigger: parallaxEl,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,

			onUpdate: (self) => {
				const p = self.progress;
				if (!raf) {
					raf = requestAnimationFrame(() => {
						wrappers.forEach((el, i) => {
							const depth = depths[i];
							el.style.transform = `translate3d(0, ${depth - p * 2 * depth}px, 0)`;
						});

						raf = null;
					});
				}
			}
		});
	}

	function crossfade() {
		isTransitioning = true;

		gsap.to(fade, {
			v: 1,
			duration: 1.2,
			ease: 'power2.inOut',
			onUpdate: () => {
				activeOpacity = 1 - fade.v;
				nextOpacity = fade.v;
			},
			onComplete: async () => {
				await swapLayers();

				fade.v = 0;
				activeOpacity = 1;
				nextOpacity = 0;

				isTransitioning = false;

				await tick();
				requestAnimationFrame(() => initScroll());
			}
		});
	}

	async function swapLayers() {
		activeLayers = nextLayers;
		nextLayers = [];

		await tick();
	}
</script>

<div bind:this={parallaxEl} class="parallax-wrapper">
	<div class="parallax-mask">
		<!-- ACTIVE -->
		{#each activeLayers as layer (layer)}
			<div class="layer-wrapper" style="opacity: {activeOpacity}">
				<img src={layer} class="layer" alt="active layer" />
			</div>
		{/each}

		<!-- NEXT -->
		{#if nextLayers.length}
			{#each nextLayers as layer (layer)}
				<div class="layer-wrapper" style="opacity: {nextOpacity}">
					<img src={layer} class="layer" alt="next layer" />
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.parallax-wrapper {
		position: absolute;
		inset: 0;
		height: 120vh;
		transform-style: preserve-3d;
		pointer-events: none;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.9));

		top: -100px;
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

	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.parallax-wrapper {
			top: 200px;
		}
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		.parallax-wrapper {
			top: -220px;
		}
	}

	/* iPhone 15 and smaller (≤ 430px) */
	@media (max-width: 430px) {
		.parallax-wrapper {
			top: -200px;
		}
	}
</style>
