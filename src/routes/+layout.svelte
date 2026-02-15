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

	let { children } = $props();

	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

	let smoother;

	onMount(() => {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		const isMobile = window.innerWidth < 768;

		if (!isMobile) {
			smoother = ScrollSmoother.create({
				wrapper: '#smooth-wrapper',
				content: '#smooth-content',
				smooth: 1.2, // adjust for performance vs feel
				effects: true, // allows data-speed / data-lag on child elements
				normalizeScroll: true, // fixes inconsistent scroll
				smoothTouch: 0.7, // prevents huge lag on mobile
				onUpdate: () => ScrollTrigger.update() // keeps ScrollTriggers in sync
			});

			window.__smoother = smoother;

			ScrollTrigger.config({ ignoreMobileResize: true, fastScrollEnd: true });
			ScrollTrigger.defaults({anticipatePin: 1});
			ScrollTrigger.refresh();
		} else {
			// mobile fallback: remove overflow hidden
			document.querySelector('#smooth-wrapper').style.overflow = 'auto';
			document.querySelector('#smooth-wrapper').style.height = 'auto';
		}
	});

	onDestroy(() => {
		smoother?.kill();
		ScrollTrigger.getAll().forEach((t) => t.kill());
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- <Cursor /> -->
<Navbar />
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
		--white: #f6f6f6;

		--zl-red: #db0812;
		--tech-yellow: #fcc424;
		--punch-pink: #d13d77;
		--stage-blue: #124a99;

		--general-px: 3rem;

		/* vw = px value / 19.2 */
		/* rem = px value / 16 */
		--text-16: calc(8px + (0.926vw * 0.35));
		--text-20: calc(10px + (1.157vw * 0.25));
		--text-24: calc(12px + (1.389vw * 0.15));
		--text-32: calc(16px + (1.852vw * 0.15));
		--text-36: calc(18px + (2.083vw * 0.15));
		--text-48: calc(24px + (2.083vw * 0.15));
		--text-64: calc(32px + (3.704vw * 0.15));
		--text-96: calc(48px + (5.556vw * 0.15));
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

	:global(h2) {
		font-size: var(--text-64);
	}

	:global(p) {
		font-size: var(--text-24);
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
