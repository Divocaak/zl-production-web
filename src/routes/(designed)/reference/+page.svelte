<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ReferenceMedia from '$lib/reference/ReferenceMedia.svelte';
	import ReferenceTextOnly from '$lib/reference/ReferenceTextOnly.svelte';
	import BlogReference from '$lib/reference/BlogReference.svelte';

	gsap.registerPlugin(ScrollTrigger);

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
		items.forEach((item, index) =>
			cols[index % n].push({
				...item,
				_speed: columnData[index % n]?.speed ?? 1,
				_direction: columnData[index % n]?.direction ?? 1
			})
		);
		return cols;
	}

	function updateNumColumns() {
		const width = window.innerWidth;

		if (width <= 600) numColumns = 1;
		else if (width <= 1024) numColumns = 2;
		else numColumns = 3;

		const visible = references.filter((r) => r.visible);
		if (visible.length) columns = splitIntoColumns(visible, numColumns);
	}

	function killAnimations() {
		ScrollTrigger.getAll().forEach((t) => t.kill());
		gsap.killTweensOf('.column');
	}

	async function initAnimations() {
		await tick();

		if (!wrapper) return;
		if (window.matchMedia('(pointer: coarse)').matches) return;

		killAnimations();

		const columnEls = wrapper.querySelectorAll('.column');

		let tallest = 0;
		columnEls.forEach((col) => (tallest = Math.max(tallest, col.scrollHeight)));
		wrapper.style.height = tallest * highestSpeed + 'px';

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapper,
				start: 'top top',
				end: 'bottom top',
				scrub: 0.3
			}
		});

		columnEls.forEach((col) => {
			const speed = Number(col.dataset.speed || 1);
			const direction = Number(col.dataset.direction || 1);
			const travel = (tallest - col.scrollHeight) * speed * direction;
			tl.to(col, { y: travel, ease: 'none' }, 0);
		});

		ScrollTrigger.refresh();
	}

	onMount(async () => {
		if (typeof window === 'undefined') return;
		window.addEventListener('resize', handleResize);

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
			await initAnimations();
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	});

	function handleResize() {
		updateNumColumns();
		initAnimations();
	}

	onDestroy(() => {
		if (typeof window === 'undefined') return;

		window.removeEventListener('resize', handleResize);
		killAnimations();
	});
</script>

<section id="reference-gallery">
	<div class="columns-wrapper" bind:this={wrapper}>
		{#each columns as column, i}
			<div
				class="column"
				data-speed={columnData[i]?.speed ?? 1}
				data-direction={columnData[i]?.direction ?? 1}
			>
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
