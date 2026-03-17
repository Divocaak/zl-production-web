<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';

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
			<a class="card" href="/reference/{card.key}">
				<div class="card-image" style="background-image: url({card.cardImage});"></div>
				<h3>{card.hero.label}</h3>
			</a>
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

		position: relative;
		overflow: hidden;
		cursor: pointer;

		color: var(--white);
		text-decoration: none;
	}

	.card-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		transition: all 0.35s ease;
		will-change: transform;
	}

	/* hover effect */
	.card:hover .card-image {
		transform: scale(1.05); /* grow image slightly */
		filter: brightness(0.8) blur(0.7px);
	}

	.card h3 {
		position: relative;
		z-index: 2;

		font-size: 3rem;
		text-transform: uppercase;
		font-weight: 900;
		letter-spacing: -2px;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 1));

		transition: all 0.45s ease;
	}

	.card:hover h3 {
		color: var(--tech-yellow);
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
