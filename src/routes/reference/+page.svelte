<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ReferenceMedia from '$lib/reference/ReferenceMedia.svelte';
	import ReferenceTextOnly from '$lib/reference/ReferenceTextOnly.svelte';

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

		if (references.length) columns = splitIntoColumns(references, numColumns);
	}

	onMount(async () => {
		if (typeof window === 'undefined') return;
		window.addEventListener('resize', updateNumColumns);

		try {
			const res = await fetch('/references.json');
			if (!res.ok) throw new Error('Failed to load references');
			references = await res.json();
			updateNumColumns();
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}

		await tick();
		if (window.matchMedia('(pointer: coarse)').matches) return;

		const columnEls = wrapper.querySelectorAll('.column');

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
		ScrollTrigger.getAll().forEach((t) => t.kill());
	});
</script>

<section id="reference-gallery">
	<div class="columns-wrapper" bind:this={wrapper}>
		{#each columns as column}
			<div class="column">
				{#each column as item}
					{#if item.type === 'image'}
						<ReferenceMedia {item} />
					{:else if item.type === 'text'}
						<ReferenceTextOnly {item} />
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
