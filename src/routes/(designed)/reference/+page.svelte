<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ReferenceMedia from '$lib/reference/ReferenceMedia.svelte';
	import ReferenceTextOnly from '$lib/reference/ReferenceTextOnly.svelte';
	import BlogReference from '$lib/reference/BlogReference.svelte';

	let references = [];
	let loading = true;
	let wrapper;

	const highestSpeed = 1.25;
	const columnData = [
		{ speed: 0.75, direction: 1 },
		{ speed: highestSpeed, direction: 1 },
		{ speed: 1, direction: 1 }
	];

	let columns = [];
	let numColumns = 3;
	function splitIntoColumns(items, n) {
		const cols = Array.from({ length: n }, () => []);
		items.forEach((item, index) => {
			cols[index % n].push(item);
		});
		return cols;
	}

	function updateNumColumns() {
		const width = window.innerWidth;
		if (width <= 600) numColumns = 1;
		else if (width <= 1024) numColumns = 2;
		else numColumns = 3;

		const visibleReferences = references.filter((r) => r.visible);
		if (visibleReferences.length) {
			columns = splitIntoColumns(visibleReferences, numColumns);
		}
	}

	let columnEls = [];
	onMount(async () => {
		if (typeof window === 'undefined') return;
		window.addEventListener('resize', updateNumColumns);

		try {
			const res = await fetch('/dynamic/jsons/reference.json');
			if (!res.ok) throw new Error('Failed to load references');
			const baseReferences = await res.json();

			const res2 = await fetch('/blog-references.json');
			if (!res2.ok) throw new Error('Failed to load blog references');
			const secondData = await res2.json();

			const blogReferences = Object.entries(secondData.items).map(([id, item]) => ({
				path: id,
				img: item.cardImage,
				label: item.hero.label,
				visible: true
			}));

			references = [...blogReferences, ...baseReferences];
			updateNumColumns();
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}

		await tick();
		if (window.matchMedia('(pointer: coarse)').matches) return;

		let tallest = 0;
		columnEls.forEach((col) => {
			tallest = Math.max(tallest, col.scrollHeight);
		});
		wrapper.style.height = tallest * highestSpeed + 'px';

		columnEls.forEach((col, i) => {
			const { speed, direction } = columnData[i] ?? columnData[0];
			const distance = (tallest - col.scrollHeight) * speed * direction;

			gsap.to(col, {
				y: distance,
				ease: 'none',
				scrollTrigger: {
					trigger: wrapper,
					start: 'top top',
					end: 'bottom top',
					scrub: 0.3
				}
			});
		});
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		window.removeEventListener('resize', updateNumColumns);
	});
</script>

<section id="reference-gallery">
	<div class="columns-wrapper" bind:this={wrapper}>
		{#each columns as column, i}
			<div class="column" bind:this={columnEls[i]}>
				{#each column as item}
					{#if !item.referenceType}
						<BlogReference {...item} borderRadius="0" />
					{:else if item.referenceType === 'person'}
						<ReferenceTextOnly {item} />
					{:else}
						<ReferenceMedia {item} />
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
	#reference-gallery {
		width: 100%;
		position: relative;
	}

	.columns-wrapper {
		display: flex;
		align-items: flex-start;
		width: 100%;
		position: relative;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
		will-change: transform;
		transform: translate3d(0, 0, 0);
		pointer-events: auto;
	}

	@media (max-width: 1024px) {
		.columns-wrapper {
			flex-wrap: wrap;
		}

		.column {
			flex: 0 0 50%;
		}
	}

	@media (max-width: 600px) {
		.columns-wrapper {
			flex-direction: column;
		}

		.column {
			flex: 1 1 100%;
		}
	}
</style>
