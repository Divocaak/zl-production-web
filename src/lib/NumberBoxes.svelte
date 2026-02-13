<script>
	import { onMount, onDestroy } from 'svelte';
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
	let numberEls = [];
	let svgEls = [];

	let tl;
	let floatAnim;

	onMount(() => {
		const boxEls = Array.from(gridSection.querySelectorAll('.box'));
		numberEls = boxEls.map((box) => box.querySelector('.number'));
		svgEls = boxEls.map((box) => box.querySelector('svg'));

		// ----- SCROLL-TRIGGERED TIMELINE for boxes -----
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: gridSection,
				start: 'top 60%',
				end: 'bottom 90%',
				scrub: true
			}
		});

		// Animate boxes with scale + opacity
		tl.from(boxEls, {
			scale: 0.5,
			opacity: 0,
			stagger: 0.2,
			duration: 1,
			ease: 'back.out(1.7)',
			onStart: () => {
				// ----- Start number count once boxes are in place -----
				numberEls.forEach((el, i) => {
					const number = boxes[i].number;
					const setter = gsap.quickSetter(el, 'textContent');
					gsap.to(
						{ progress: 0 },
						{
							progress: number,
							duration: 2,
							ease: 'power1.out',
							onUpdate() {
								setter(Math.floor(this.targets()[0].progress));
							}
						}
					);
				});
			}
		});

		// Floating SVG animation (looped, independent from scroll)
		floatAnim = gsap.to(svgEls, {
			y: 5,
			repeat: -1,
			yoyo: true,
			duration: 2,
			stagger: 0.2,
			ease: 'sine.inOut',
			force3D: true,
			willChange: 'transform',
		});
	});

	onDestroy(() => {
		tl?.kill();
		floatAnim?.kill();
		ScrollTrigger.getAll().forEach((st) => st.kill());
	});
</script>

<div class="grid" bind:this={gridSection}>
	{#each boxes as box}
		<div class="box">
			{@html box.svg}
			<div class="number">0</div>
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
		will-change: transform;
	}

	.number {
		position: relative;
		z-index: 1;
		font-size: 4rem;
		font-weight: bolder;
		color: var(--tech-yellow);
	}

	.description {
		position: relative;
		z-index: 1;
		margin-top: 0.5rem;
		font-size: 1rem;
	}
</style>
