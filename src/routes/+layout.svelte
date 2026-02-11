<script>
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import Cursor from '$lib/Cursor.svelte';

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

		gsap.to('#bg-layer-hard', {
			yPercent: -10,
			ease: 'none',
			scrollTrigger: {
				trigger: '#smooth-content',
				start: 'top top',
				end: 'bottom bottom',
				scrub: true
			}
		});

		gsap.to('#bg-layer-soft', {
			yPercent: -20,
			ease: 'none',
			scrollTrigger: {
				trigger: '#smooth-content',
				start: 'top top',
				end: 'bottom bottom',
				scrub: true
			}
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

<!-- URGENT <Cursor /> -->
<div id="smooth-wrapper">
	<div id="smooth-content">
		<div id="bg-layer-hard" style="background-image: url('/bordel/bordel-hard.svg');"></div>
		<div id="bg-layer-soft" style="background-image: url('/bordel/bordel-soft.svg');"></div>
		<div class="page-content">
			{@render children()}
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

	:global(html) {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
	}

	:global(html, body) {
		height: 100%;
	}

	:global(h2){
		font-size: var(--text-64);
	}

	#bg-layer-hard,
	#bg-layer-soft {
		position: absolute;
		inset: 0;
		z-index: 0;

		background-repeat: repeat;
		background-size: auto;
		pointer-events: none;

		transform: scale(1.05);
		transform-origin: center;
	}

	#bg-layer-hard {
		opacity: 0.3;
		mix-blend-mode: soft-light;
	}

	#bg-layer-soft {
		opacity: 0.15;
		mix-blend-mode: overlay;
	}

	.page-content {
		position: relative;
		z-index: 1;
	}

	#smooth-wrapper {
		height: 100vh;
		overflow: hidden;
	}

	#smooth-content {
		will-change: transform;
	}
</style>
