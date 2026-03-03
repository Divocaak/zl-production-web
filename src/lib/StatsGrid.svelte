<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import svg0 from '$lib/assets/splashes/0.svg?raw';
	import svg1 from '$lib/assets/splashes/1.svg?raw';
	import svg2 from '$lib/assets/splashes/2.svg?raw';
	import svg3 from '$lib/assets/splashes/3.svg?raw';

	const splashes = [svg0, svg1, svg2, svg3];
	export let items = [];
	export let columns = 'repeat(2, 1fr)';
	export let gap = '1rem';
	export let maxWidth = '500px';

	let gridSection;
	let tl;
	let floatAnim;

	onMount(() => {
		const boxEls = [...gridSection.querySelectorAll('.box')];
		const numberEls = boxEls.map((b) => b.querySelector('.number-value'));
		const svgEls = boxEls.map((b) => b.querySelector('svg'));

		tl = gsap.timeline({
			scrollTrigger: {
				trigger: gridSection,
				start: 'top 60%',
				end: 'bottom 90%',
				scrub: 0.5
			}
		});

		tl.from(boxEls, {
			scale: 0.5,
			opacity: 0,
			stagger: 0.2,
			duration: 1,
			ease: 'back.out(1.7)',
			onStart: () => {
				numberEls.forEach((el, i) => {
					const target = items[i]?.value ?? 0;
					const setter = gsap.quickSetter(el, 'textContent');

					gsap.to(
						{ v: 0 },
						{
							v: target,
							duration: 2,
							ease: 'power1.out',
							onUpdate() {
								setter(Math.floor(this.targets()[0].v));
							}
						}
					);
				});
			}
		});

		floatAnim = gsap.to(svgEls, {
			y: 5,
			repeat: -1,
			yoyo: true,
			duration: 2,
			stagger: 0.2,
			ease: 'sine.inOut',
			force3D: true
		});
	});

	onDestroy(() => {
		tl?.kill();
		floatAnim?.kill();
		ScrollTrigger.getAll().forEach((st) => st.kill());
	});
</script>

<div
	class="grid"
	bind:this={gridSection}
	style="
		--cols: {columns};
		--gap: {gap};
		--max-width: {maxWidth};
	"
>
	{#each items as item, i}
		<div class="box">
			{@html splashes[i % splashes.length]}
			<div class="number"><span class="number-value">0</span>{item.unit ? item.unit : ''}</div>
			<div class="description">{item.label}</div>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: var(--cols);
		gap: var(--gap);
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.box {
		position: relative;
		aspect-ratio: 1 / 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		overflow: hidden;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.8));
	}

	:global(.box svg) {
		position: absolute;
		inset: 0;
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
		color: var(--tech-yellow);
	}

	.number-value {
		display: inline-block;
		min-width: 2ch;
		text-align: right;
	}

	.description {
		position: relative;
		z-index: 1;
		margin-top: 0.5rem;
		font-size: 1rem;
	}
</style>
