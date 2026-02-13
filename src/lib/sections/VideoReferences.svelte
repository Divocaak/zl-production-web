<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';

	import splash0 from '$lib/assets/splashes/0.svg?raw';
	import splash2 from '$lib/assets/splashes/2.svg?raw';
	import splash3 from '$lib/assets/splashes/3.svg?raw';

	gsap.registerPlugin(ScrollTrigger);

	let horizontalSection;
	let horizontalContainer;

	const cards = [
		{ color: '#fcc424', text: 'video 1' },
		{ color: '#d13d77', text: 'video 2' },
		{ color: '#124a99', text: 'video 3' }
	];

	onMount(() => {
		const containerWidth = horizontalContainer.scrollWidth;
		const viewportWidth = horizontalSection.offsetWidth;

		const scrollTween = gsap.to(horizontalContainer, {
			x: () => -(containerWidth - viewportWidth),
			ease: 'none',
			scrollTrigger: {
				trigger: horizontalSection,
				start: 'top top',
				end: () => `+=${containerWidth - viewportWidth + window.innerHeight}`,
				scrub: 0.5,
				pin: true,
				snap: {
					snapTo: 1 / (cards.length - 1),
					duration: { min: 0.2, max: 0.5 },
					ease: 'power1.inOut'
				},
				invalidateOnRefresh: true
			}
		});
	});
</script>

<section bind:this={horizontalSection} class="horizontal-section" id="reference">
	<!-- TODO make one svg -->
	<div class="bg-wrapper">
		<div class="svg-wrapper svg0">{@html splash0}</div>
		<div class="svg-wrapper svg2">{@html splash2}</div>
		<div class="svg-wrapper svg3">{@html splash3}</div>
	</div>
	<div class="content">
		<h2>Vybrané reference</h2>
		<div class="horizontal-container" bind:this={horizontalContainer}>
			{#each cards as card}
				<div class="card" style="background-color: {card.color}">
					{card.text}
				</div>
			{/each}
		</div>
		<HanddrawnLink inverted={true}>Všechny reference</HanddrawnLink>
	</div>
</section>

<!-- TODO resp -->
<style>
	.horizontal-section {
		position: relative;
		width: 100%;
		height: 100vh;
	}

	.content {
		position: absolute;
		inset: 0;
		overflow: hidden;
		text-align: center;

		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 20;
	}

	.horizontal-container {
		display: flex;
		gap: 2rem;
		height: 50%;

		padding: 2rem 0;
	}

	.card {
		flex: 0 0 auto;
		aspect-ratio: 16/9;

		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 6px;
		user-select: none;
		touch-action: pan-x;
	}

	.bg-wrapper {
		position: absolute;
		inset: 0;
		pointer-events: none;
		
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.svg-wrapper {
		position: absolute;
		z-index: 1;

		fill: var(--zl-red);

		width: 80vw;
		height: auto;

		transform-origin: center;
	}

	:global(.svg-wrapper:nth-of-type(1)) {
		top: -20%;
		left: -25%;
		transform: scale(.8);
	}
	
	:global(.svg-wrapper:nth-of-type(2)) {
		top: -20%;
		transform: scale(.8);
	}
	
	:global(.svg-wrapper:nth-of-type(3)) {
		left: 35%;
		transform: scale(0.8) rotate(-5deg);
	}
</style>
