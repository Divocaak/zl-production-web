<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import svg1 from '$lib/assets/splashes/1.svg?raw';
	import svg0 from '$lib/assets/splashes/0.svg?raw';
	import svg3 from '$lib/assets/splashes/3.svg?raw';
	import svg2 from '$lib/assets/splashes/2.svg?raw';

	const boxes = [
		{ number: 999, description: 'eventů ročně', svg: svg1 },
		{ number: 20, description: 'let zkušeností', svg: svg0 },
		{ number: 200, description: 'zaměstnanců', svg: svg3 },
		{ number: 123, description: '??', svg: svg2 }
	];

	let gridSection;

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		gsap.from('.box', {
			scrollTrigger: {
				trigger: gridSection,
				start: 'top 80%'
			},
			duration: 1,
			scale: 0.5,
			opacity: 0,
			stagger: 0.2,
			ease: 'back.out(1.7)'
		});

		boxes.forEach((box, i) => {
			const numberEl = gridSection.querySelectorAll('.number')[i];
			gsap.fromTo(
				numberEl,
				{ innerText: 0 },
				{
					innerText: box.number,
					duration: 2,
					ease: 'power1.out',
					snap: { innerText: 1 },
					scrollTrigger: {
						trigger: numberEl,
						start: 'top 90%'
					}
				}
			);
		});

		gsap.to('.box svg', {
			y: 5,
			repeat: -1,
			yoyo: true,
			duration: 2,
			stagger: 0.2,
			scrollTrigger: {
				trigger: gridSection,
				start: 'top 80%'
			}
		});
	});
</script>

<div class="grid" bind:this={gridSection}>
	{#each boxes as box}
		<div class="box">
			{@html box.svg}
			<div class="number">{box.number}</div>
			<div class="description">{box.description}</div>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

        width: 100%;
        max-width: 500px;
        gap: 1rem;
        margin: 0 auto;
	}

	.box {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		font-weight: bold;
		overflow: hidden;
	}

	:global(.box svg) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		fill: var(--zl-red);
	}

	.number {
		position: relative;
		z-index: 1;
		font-size: 2rem;
	}

	.description {
		position: relative;
		z-index: 1;
		margin-top: 0.5rem;
		font-size: 1rem;
	}
</style>
