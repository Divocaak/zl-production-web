<script>
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
	import Cursor from '$lib/Cursor.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import BackgroundTexture from '$lib/BackgroundTexture.svelte';
	import LoadingOverlay from '$lib/LoadingOverlay.svelte';
	import { loadingDone } from '$lib/stores/loading';

	let { children } = $props();

	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

	let smoother;

	onMount(async () => {
		console.log('[loader] start');

		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		const isMobile = window.innerWidth < 768;

		if (!isMobile) {
			const run = () => {
				smoother = ScrollSmoother.create({
					wrapper: '#smooth-wrapper',
					content: '#smooth-content',
					smooth: 1.2,
					effects: true,
					normalizeScroll: true,
					smoothTouch: 0.7,
					onUpdate: () => ScrollTrigger.update()
				});

				window.__smoother = smoother;

				ScrollTrigger.config({ ignoreMobileResize: true, fastScrollEnd: true });
				ScrollTrigger.defaults({ anticipatePin: 1 });
				ScrollTrigger.refresh();
			};

			if ('requestIdleCallback' in window) {
				requestIdleCallback(run, { timeout: 500 });
			} else {
				requestAnimationFrame(() => requestAnimationFrame(run));
			}
		} else {
			// mobile fallback: remove overflow hidden
			document.querySelector('#smooth-wrapper').style.overflow = 'auto';
			document.querySelector('#smooth-wrapper').style.height = 'auto';
		}

		await document.fonts?.ready;
		console.log('[loader] fonts ready');
		await waitForImagesWithProgress();
		console.log('[loader] all assets ready');
		loadingDone.set(true);
	});

	onDestroy(() => {
		smoother?.kill();
	});

	function waitForImagesWithProgress() {
		const images = Array.from(document.images);
		const total = images.length;

		let loaded = 0;

		console.log(`[loader] Found ${total} images`);

		function updateProgress() {
			loaded++;
			const percent = Math.round((loaded / total) * 100);
			console.log(`[loader] Images: ${loaded}/${total} (${percent}%)`);
		}

		return Promise.all(
			images.map((img) => {
				if (img.complete) {
					updateProgress();
					return Promise.resolve();
				}

				return new Promise((resolve) => {
					const done = () => {
						updateProgress();
						resolve();
					};

					img.addEventListener('load', done, { once: true });
					img.addEventListener('error', done, { once: true });
				});
			})
		);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- <Cursor /> -->
<LoadingOverlay trigger={$loadingDone} />
<Navbar />
<!-- TODO back btn (samostatnej layout na podstránky) -->
<div id="smooth-wrapper">
	<div id="smooth-content">
		<BackgroundTexture />
		<div id="page-content">
			{@render children()}
			<Footer />
		</div>
	</div>
</div>

<style>
	@font-face {
		font-family: 'Inter';
		src: url('/Inter-VariableFont_opsz_wght.ttf') format('truetype');
		font-weight: 100 900;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Inter';
		src: url('/Inter-Italic-VariableFont_opsz_wght.ttf') format('truetype');
		font-weight: 100 900;
		font-style: italic;
		font-display: swap;
	}

	:global(:root) {
		--ui-scale: 1;

		--black: #1d1d1b;
		--grey: #545453;
		--grey-lighter: #616160;
		--white: #f6f6f6;

		--zl-red: #db0812;
		--card-red: #580307;
		--card-back: #420205;
		--tech-yellow: #fcc424;
		--punch-pink: #d13d77;
		--stage-blue: #124a99;

		--general-px: 3rem;

		--card-border-radius: 1rem;

		--text-12: calc(clamp(0.6rem, 0.5rem + 0.2vw, 0.75rem) * var(--ui-scale));
		--text-16: calc(clamp(0.9rem, 0.8rem + 0.5vw, 1rem) * var(--ui-scale));
		--text-20: calc(clamp(1rem, 0.9rem + 0.6vw, 1.25rem) * var(--ui-scale));
		--text-24: calc(clamp(1.1rem, 1rem + 0.8vw, 1.5rem) * var(--ui-scale));
		--text-32: calc(clamp(1.3rem, 1.1rem + 1.2vw, 2rem) * var(--ui-scale));
		--text-36: calc(clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem) * var(--ui-scale));
		--text-48: calc(clamp(1.8rem, 1.4rem + 2vw, 3rem) * var(--ui-scale));
		--text-64: calc(clamp(2.2rem, 1.8rem + 2.8vw, 4rem) * var(--ui-scale));
		--text-96: calc(clamp(3rem, 2.5rem + 4vw, 6rem) * var(--ui-scale));
	}

	:global(body) {
		background-color: var(--black);
		color: var(--white);
		margin: 0;
		overflow: hidden;
	}

	:global(html, body) {
		height: 100%;
		margin: 0;
		padding: 0;

		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}

	:global(p, a) {
		font-size: var(--text-16);
		line-height: 1.4;
		letter-spacing: .125rem;
	}

	:global(.zl-text) {
		font-size: var(--text-96);
		text-transform: uppercase;
		font-weight: 900;
		letter-spacing: -0.04em;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 1));
	}

	:global(.zl-heading) {
		font-size: var(--text-36);
		text-transform: uppercase;
		transform: skew(-10deg);
		-webkit-transform: skew(-10deg);
		font-weight: 900;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
	}

	:global(.zl-tagline) {
		margin-top: 1rem;
		font-size: var(--text-24);
		letter-spacing: 0.05em;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
	}

	#page-content {
		position: relative;
		z-index: 1;
	}

	#smooth-wrapper {
		height: 100vh;
		overflow: hidden;
	}

	#smooth-content {
		will-change: transform;
		pointer-events: none;

		overflow-x: clip;
	}

	:global(#page-content *) {
		pointer-events: all;
	}

	@media (max-width: 767px) {
		:global(:root) {
			--general-px: 1rem;
		}

		:global(body) {
			overflow: auto;
		}

		#smooth-wrapper {
			overflow: hidden;
			height: auto;
		}
	}

	@media (min-width: 1920px) {
		:global(:root) {
			--ui-scale: 1.25;
		}
	}

	@media (min-width: 2560px) {
		:global(:root) {
			--ui-scale: 1.45;
		}
	}

	@media (min-width: 3840px) {
		:global(:root) {
			--ui-scale: 1.7;
		}
	}
</style>
