<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';

	let horizontalSection;
	let horizontalContainer;
	let tween;

	const cards = [
		{ color: '#fcc424', text: 'video 1' },
		{ color: '#d13d77', text: 'video 2' },
		{ color: '#124a99', text: 'video 3' }
	];

	const getDistance = () => {
		const containerWidth = horizontalContainer.scrollWidth;
		const viewportWidth = horizontalSection.offsetWidth;
		return Math.max(0, containerWidth - viewportWidth);
	};

	const preloadCards = () => {
		cards.forEach((card) => {
			const img = new Image();
			img.src = card.backgroundImage || '';
		});
	};

	onMount(async () => {
		await tick();
		preloadCards();

		const isMobile = window.innerWidth < 768;

		if (isMobile) return;
		requestAnimationFrame(() => {
			tween = gsap.to(horizontalContainer, {
				x: () => `-${getDistance()}px`,
				ease: 'none',
				force3D: true,
				scrollTrigger: {
					trigger: horizontalSection,
					start: 'top top',
					end: () => `+=${getDistance() + window.innerHeight}`,
					scrub: 0.5,
					pin: true,
					anticipatePin: 1,
					invalidateOnRefresh: true,
					snap: {
						snapTo: 1 / (cards.length - 1),
						duration: { min: 0.2, max: 0.5 },
						ease: 'power1.inOut'
					}
				}
			});

			ScrollTrigger.refresh();
		});
	});

	onDestroy(() => {
		tween?.scrollTrigger?.kill();
		tween?.kill();
	});
</script>

<section bind:this={horizontalSection} id="reference">
	<h2>Vybrané reference</h2>
	<div class="horizontal-container" bind:this={horizontalContainer}>
		{#each cards as card}
			<div class="card" style="background-color: {card.color}">
				{card.text}
			</div>
		{/each}
	</div>
	<HanddrawnLink href="/reference" inverted={true}>Všechny reference</HanddrawnLink>
</section>

<style>
	#reference {
		position: relative;
		width: 100%;
		height: 100vh;

		background-image: url('/reference-bg.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

		text-align: center;

		display: flex;
		flex-direction: column;
		justify-content: center;

		overflow: visible;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 1));
	}

	.horizontal-container {
		display: flex;
		gap: 2rem;
		height: 50%;

		padding: 2rem 0;

		width: max-content;

		will-change: transform;
		transform-style: preserve-3d;
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

		will-change: transform, opacity;

		transform: translateZ(0);
	}

	@media (max-width: 767px) {
		.horizontal-container {
			display: flex;
			gap: 1rem;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
			width: 100%;
			padding: 1rem 0;
		}

		.card {
			flex: 0 0 auto; /* prevent shrinking */
			aspect-ratio: 16 / 9; /* preserve ratio */
			scroll-snap-align: center;
			/* width: calc(80vw);  */
		}
	}
</style>
