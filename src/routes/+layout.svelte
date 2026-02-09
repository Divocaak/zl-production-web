<script>
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';

	let { children } = $props();

	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	let smoother;

	onMount(() => {
		smoother = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.2,
			effects: true,
			normalizeScroll: true
		});

		ScrollTrigger.refresh();
	});

	onDestroy(() => {
		smoother?.kill();
		ScrollTrigger.getAll().forEach((t) => t.kill());
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="smooth-wrapper">
	<div id="smooth-content">
		{@render children()}
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

	:global(html) {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
	}

	:global(:root) {
		--black: #1D1D1B;
		--white: #f6f6f6;

		--zl-red: #db0812;
		--tech-yellow: #fcc424;
		--punch-pink: #d13d77;
		--stage-blue: #124a99;

		--general-px: 3rem;
	}

	:global(body) {
		margin: 0;
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;

		background-color: var(--black);
		color: var(--white);
		margin: 0;
		overflow: hidden;
	}

	:global(html, body) {
		height: 100%;
	}

	#smooth-wrapper {
		height: 100vh;
		overflow: hidden;
	}

	#smooth-content {
		will-change: transform;
	}
</style>
