<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';

	/* BUG optimalization */
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

<section bind:this={horizontalSection} id="reference">
	<h2>Vybrané reference</h2>
	<div class="horizontal-container" bind:this={horizontalContainer}>
		{#each cards as card}
			<div class="card" style="background-color: {card.color}">
				{card.text}
			</div>
		{/each}
	</div>
	<HanddrawnLink inverted={true}>Všechny reference</HanddrawnLink>
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

		overflow: hidden;
		text-align: center;

		display: flex;
		flex-direction: column;
		justify-content: center;
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
</style>
