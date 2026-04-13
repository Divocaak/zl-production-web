<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	export let images = [];
	export let columns = 6;

	const ROW_PATTERNS = [
		[3, 3],
		[2, 2, 2],
		[3, 2, 1],
		[2, 1, 1, 2],
		[1, 1, 1, 1, 1, 1]
	];

	const HERO_PATTERNS = [
		[3, 3],
		[3, 2, 1]
	];

	function spanToSize(span) {
		if (span === 3) return 'lg';
		if (span === 2) return Math.random() > 0.7 ? 'tall' : 'md';
		return 'sm';
	}

	function generateLayout(images, columns) {
		const sizes = [];
		let i = 0;
		let rowIndex = 0;

		while (i < images.length) {
			const remaining = images.length - i;
			let pattern;

			if (rowIndex % 4 === 0 && remaining >= 2) {
				const validHero = HERO_PATTERNS.filter((p) => p.length <= remaining);
				pattern = validHero[Math.floor(Math.random() * validHero.length)];
			} else {
				const validPatterns = ROW_PATTERNS.filter((p) => p.length <= remaining);
				pattern = validPatterns[Math.floor(Math.random() * validPatterns.length)];
			}

			if (!pattern) pattern = Array(Math.min(remaining, columns)).fill(1);
			for (let span of pattern) {
				if (i >= images.length) break;
				sizes.push(spanToSize(span));
				i++;
			}

			rowIndex++;
		}

		return sizes;
	}

	let sizes = generateLayout(images, columns);
	let imgEls = [];

	$: sizes = generateLayout(images, columns);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		imgEls.forEach((img, i) => {
			const size = sizes[i];

			let shift = 10;
			if (size === 'sm') shift = 5;
			else if (size === 'md') shift = 12;
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
		grid-auto-flow: row;

		padding: 0 var(--general-px);
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

	/* Bigger than 1920px (ultrawide / 2K / 4K) */
	@media (min-width: 1921px) {
		.gallery {
			min-height: 100%;
			width: 60%;
			margin: 0 auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.item img {
			transform: none !important;
			height: 100%;
		}
	}
</style>
