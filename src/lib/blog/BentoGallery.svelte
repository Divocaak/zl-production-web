<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let images = [];
	export let columns = 6;

	const pattern = ['lg', 'sm', 'md', 'sm', 'tall', 'sm'];
	const sizes = [];
	let cursor = 0;

	for (let i = 0; i < images.length; i++) {
		let size = pattern[i % pattern.length];
		if (size === 'lg' && columns - cursor < 3) size = 'sm';
		if ((size === 'md' || size === 'tall') && columns - cursor < 2) size = 'sm';
		sizes.push(size);

		let span = size === 'lg' ? 3 : size === 'md' || size === 'tall' ? 2 : 1;
		cursor += span;
		if (cursor >= columns) cursor = 0;
	}

	let imgEls = [];

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		imgEls.forEach((img, i) => {
			const size = sizes[i];
			let shift = 10;
			if (size === 'sm') shift = 5;
			else if (size === 'md') shift = 12;
			else if (size === 'tall') shift = 16;
			else if (size === 'lg') shift = 20;

			gsap.fromTo(
				img,
				{ y: -shift },
				{
					y: shift,
					ease: 'none',
					scrollTrigger: {
						trigger: img.parentElement,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				}
			);
		});
	});

	onDestroy(() => {
		ScrollTrigger.getAll().forEach((st) => st.kill());
	});
</script>

<div class="gallery">
	{#each images as img, i}
		<div class={`item size-${sizes[i]}`}>
			<img bind:this={imgEls[i]} src={img.src} alt={img.alt} />
		</div>
	{/each}
</div>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-auto-rows: 120px;
		gap: 0.5rem;
		grid-auto-flow: dense;

		padding: 0 10rem;
	}

	.size-lg {
		grid-column: span 3;
		grid-row: span 3;
	}
	.size-md {
		grid-column: span 2;
		grid-row: span 2;
	}
	.size-tall {
		grid-column: span 2;
		grid-row: span 3;
	}
	.size-sm {
		grid-column: span 1;
		grid-row: span 1;
	}

	.item {
		position: relative;
		overflow: hidden;
		border-radius: 0.5rem;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));
	}

	.item img {
		width: 100%;
		height: 120%;
		object-fit: cover;
		transform: translateY(0);
		will-change: transform;
	}

	@media (max-width: 900px) {
		.gallery {
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: 110px;
		}
	}

	@media (max-width: 600px) {
		.gallery {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 140px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.item img {
			transform: none !important;
			height: 100%;
		}
	}
</style>
