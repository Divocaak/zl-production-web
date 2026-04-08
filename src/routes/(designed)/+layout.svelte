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

		/* vw = px value / 19.2 */
		/* rem = px value / 16 */
		--text-16: calc(8px + (0.926vw * 0.35rem));
		--text-20: calc(10px + (1.157vw * 0.25rem));
		--text-24: calc(12px + (1.389vw * 0.15rem));
		--text-32: calc(16px + (1.852vw * 0.15rem));
		--text-36: calc(18px + (2.083vw * 0.15rem));
		--text-48: calc(24px + (2.083vw * 0.15rem));
		--text-64: calc(32px + (3.704vw * 0.15rem));
		--text-96: calc(48px + (5.556vw * 0.15rem));
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

	:global(p) {
		font-size: var(--text-24);
	}

	:global(.zl-text) {
		font-size: 3rem;
		text-transform: uppercase;
		font-weight: 900;
		letter-spacing: -2px;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 1));
	}

	:global(.zl-heading) {
		font-size: 2rem;
		text-transform: uppercase;
		transform: skew(-10deg);
		-webkit-transform: skew(-10deg);
		font-weight: 900;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
	}

	#page-content {
		position: relative;
		z-index: 1;
	}

	#smooth-wrapper {
		height: 100vh;
		overflow: hidden;
	}

	@media (max-width: 767px) {
		:global(:root) {
			--general-px: 1rem;
		}

		:global(body) {
			overflow: auto;
		}

		#smooth-wrapper {
			overflow: auto;
			height: auto;
		}
	}

	#smooth-content {
		will-change: transform;
	}
</style>
