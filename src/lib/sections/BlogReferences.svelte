<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import BlogReference from '$lib/reference/BlogReference.svelte';

	let horizontalSection;
	let horizontalContainer;
	let tween;

	let cards = [];

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
		const res = await fetch('/blog-references.json');
		const data = await res.json();
		cards = data.selectedIds
			.map((id) => data.items[id] && { key: id, ...data.items[id] })
			.filter(Boolean);

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
			<BlogReference path={card.key} img={card.cardImage} label={card.hero.label} />
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

		padding: 2rem;

		width: max-content;

		will-change: transform;
		transform-style: preserve-3d;
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
	}
</style>
