<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let fill;
	export let splashSvg;
	export let sectionLogo;
	export let logos = [];

	let splashEl;
	let sectionEl;
	let partnerLogoEls = [];

	let tl;
	let floatAnim;
	let setX, setY;

	// Preload images for smoother reveal
	function preloadImages() {
		if (sectionLogo) new Image().src = sectionLogo;
		logos.forEach((src) => (new Image().src = src));
	}

	onMount(() => {
		preloadImages();

		// ---------- REVEAL TIMELINE ----------
		const visibleLogos = partnerLogoEls.filter(Boolean);
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 50%',
				end: 'bottom 90%',
				scrub: true
			},
			defaults: { duration: 1, stagger: 0.5, ease: 'power3.out' }
		});
		tl.from(splashEl, { scale: 0.8, autoAlpha: 0 });
		tl.from(sectionEl, { y: 50, autoAlpha: 0 }, '-=0.4');
		tl.from(visibleLogos, { y: 20, autoAlpha: 0, stagger: 0.1 }, '-=0.5');

		// ---------- FLOATING SPLASH OPTIMIZED ----------
		setX = gsap.quickSetter(splashEl, 'x', 'px');
		setY = gsap.quickSetter(splashEl, 'y', 'px');

		// Float animation paused by default
		floatAnim = gsap.to(
			{},
			{
				duration: 3,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				onUpdate: () => {
					const t = gsap.ticker.time;
					setX(5 * Math.cos(t * 0.6));
					setY(5 * Math.sin(t * 0.8));
				}
			}
		);
	});

	onDestroy(() => {
		tl?.kill();
		floatAnim?.kill();
		ScrollTrigger.getAll().forEach((t) => t.kill());
	});
</script>

<div bind:this={sectionEl} class="section">
	<div bind:this={splashEl} class="splash" style="fill: {fill}">
		{@html splashSvg}
	</div>

	<img class="section-logo" src={sectionLogo} alt="zl section logo" loading="lazy" />
	{#each logos as logo, i}
		<img bind:this={partnerLogoEls[i]} src={logo} alt="zl partner logo" loading="lazy" />
	{/each}
</div>

<style>
	.section {
		position: relative;
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.section .splash {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) translateZ(0);
		width: 420px;
		aspect-ratio: 1 / 1;
		opacity: 0.85;
		filter: blur(0.2px);
		z-index: 0;
		pointer-events: none;
		will-change: transform;
	}

	:global(.section .splash svg) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.section img {
		position: relative;
		z-index: 10;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
		will-change: transform, opacity;
	}

	.section .section-logo {
		width: auto;
		height: 3rem;
		padding-bottom: 2rem;
	}

	.section img:not(.section-logo) {
		width: auto;
		height: 48px;
	}
</style>
