<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	const folders = ['mjls', 'kme', 'ppo', 'md'];

	let parallaxEl;
	let st;
	let interval;

	let wrappers = [];
	let currentFolderIndex = 0;

	let io;
	let isInView = false;

	let depths = [];
	let raf;

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
		for (let i = 0; i < urls.length; i++) {
			const img = new Image();
			img.src = urls[i];
		}
	}

	function initWrappers() {
		wrappers = Array.from(parallaxEl.querySelectorAll('.layer-wrapper'));
		const max = Math.max(wrappers.length - 1, 1);
		depths = wrappers.map((_, i) => gsap.utils.interpolate(30, 200, Math.pow(i / max, 2)));
	}

	function setFolder(folder) {
		const layers = getLayers(folder);

		for (let i = 0; i < wrappers.length; i++) {
			const img = wrappers[i].querySelector('img');
			img.src = layers[i];
		}
	}

	function initScroll() {
		let lastProgress = 0;

		st = ScrollTrigger.create({
			trigger: parallaxEl,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,

			onUpdate: (self) => {
				if (!isInView) return;
				lastProgress = self.progress;

				if (raf) return;
				raf = requestAnimationFrame(() => {
					for (let i = 0; i < wrappers.length; i++) {
						const el = wrappers[i];
						const depth = depths[i];
						el.style.transform = `translate3d(0, ${depth - lastProgress * 2 * depth}px, 0)`;
					}

					raf = null;
				});
			}
		});

		st.disable();
	}

	function crossfade() {
		if (!isInView) return;

		const nextIndex = (currentFolderIndex + 1) % folders.length;
		const nextLayers = getLayers(folders[nextIndex]);

		preloadImages(nextLayers);

		const imgs = wrappers.map((w) => w.querySelector('img'));

		const tl = gsap.timeline({
			onComplete: () => {
				currentFolderIndex = nextIndex;
				setFolder(folders[currentFolderIndex]);
			}
		});

		tl.to(wrappers, {
			opacity: 0,
			duration: 0.4,
			ease: 'power2.inOut'
		});

		tl.add(() => {
			for (let i = 0; i < nextLayers.length; i++) imgs[i].src = nextLayers[i];
		});

		tl.to(wrappers, {
			opacity: 1,
			duration: 0.4,
			ease: 'power2.inOut'
		});
	}

	function setupVisibilityObserver() {
		io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				isInView = entry.isIntersecting;

				if (isInView) {
					st.enable();
					ScrollTrigger.refresh();

					interval = setInterval(crossfade, 5000);
				} else {
					st.disable();
					clearInterval(interval);
					interval = null;

					if (raf) {
						cancelAnimationFrame(raf);
						raf = null;
					}

					gsap.killTweensOf(wrappers);
				}
			},
			{
				root: null,
				threshold: 0.1
			}
		);

		io.observe(parallaxEl);
	}

	onMount(() => {
		initWrappers();
		setFolder(folders[0]);

		initScroll();
		setupVisibilityObserver();
	});

	onDestroy(() => {
		clearInterval(interval);
		io?.disconnect();
		st?.kill();
		if (raf) cancelAnimationFrame(raf);
	});
</script>

<div bind:this={parallaxEl} class="parallax-wrapper">
	<div class="parallax-mask">
		{#each Array(5) as _, i}
			<div class="layer-wrapper">
				<img class="layer" alt="layer" />
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
		will-change: transform, opacity;
		transform: translateZ(0);
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
