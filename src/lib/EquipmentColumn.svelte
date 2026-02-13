<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let fill;
	export let splashSvg;
	export let sectionLogo;
	export let logos = [];

	gsap.registerPlugin(ScrollTrigger);

	let splashEl;
	let sectionEl;
	let partnerLogoEls = [];

	let tl;
	let floatAnim;

	onMount(() => {
		tl = gsap.timeline({ paused: true, defaults: { duration: 0.6, ease: 'power3.out' } });
		tl.from(splashEl, { scale: 0.8, opacity: 0 });
		tl.from(sectionEl, { y: 50, opacity: 0 }, '-=0.4');
		tl.from(partnerLogoEls, { y: 20, opacity: 0, stagger: 0.1 }, '-=0.5');

		ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top 70%',
			onEnter: () => tl.play(),
			onLeaveBack: () => tl.reverse()
		});

		floatAnim = gsap.to(splashEl, {
			y: 5,
			x: 5,
			repeat: -1,
			yoyo: true,
			duration: 3,
			ease: 'sine.inOut'
		});
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
	<img class="section-logo" src={sectionLogo} alt="zl section logo" />
	{#each logos as logo, i}
		<img bind:this={partnerLogoEls[i]} src={logo} alt="zl partner logo" />
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
