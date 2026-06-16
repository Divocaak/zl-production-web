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

	const fxAmmount = 0.04;
	const highestSpeed = 1 + fxAmmount;
	const columnData = [
		{ speed: 1 - fxAmmount, direction: 1 },
		{ speed: highestSpeed, direction: 1 },
		{ speed: 1, direction: 1 }
	];

	let columns = [];
	let numColumns = 3;

	let resizeTimeout;
	let timeline;

	function splitIntoColumns(items, n) {
		const cols = Array.from({ length: n }, () => []);

		items.forEach((item, index) => {
			const columnIndex = index % n;

			cols[columnIndex].push({
				...item,
				_speed: columnData[columnIndex]?.speed ?? 1,
				_direction: columnData[columnIndex]?.direction ?? 1
			});
		});

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

	function destroyAnimation() {
		if (timeline) {
			timeline.scrollTrigger?.kill();
			timeline.kill();
			timeline = null;
		}
	}

	function resetColumns() {
		if (!wrapper) return;

		const columnEls = wrapper.querySelectorAll('.column');

		columnEls.forEach((col) => {
			gsap.set(col, {
				clearProps: 'all'
			});
		});

		wrapper.style.height = '';
	}

	function shouldDisableAnimation() {
		return (
			window.matchMedia('(pointer: coarse)').matches ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
			numColumns === 1
		);
	}

	async function initAnimations() {
		await tick();
		if (!wrapper) return;

		destroyAnimation();
		resetColumns();
		if (shouldDisableAnimation()) return;

		const columnEls = [...wrapper.querySelectorAll('.column')];
		if (!columnEls.length) return;

		let tallest = 0;
		columnEls.forEach((col) => (tallest = Math.max(tallest, col.scrollHeight)));

		let maxTravel = 0;
		columnEls.forEach((col) => {
			const speed = Number(col.dataset.speed || 1);
			const travel = Math.abs((tallest - col.scrollHeight) * speed);
			maxTravel = Math.max(maxTravel, travel);
		});

		wrapper.style.height = `${tallest + maxTravel}px`;

		timeline = gsap.timeline({
			scrollTrigger: {
				trigger: wrapper,
				start: 'top top',
				end: 'bottom top',
				scrub: 0.3,
				invalidateOnRefresh: true
			}
		});

		columnEls.forEach((col) => {
			const speed = Number(col.dataset.speed || 1);
			const direction = Number(col.dataset.direction || 1);

			const deficit = tallest - col.scrollHeight;
			if (deficit <= 0) return;

			const travel = deficit * speed * direction;
			timeline.to(
				col,
				{
					y: travel,
					ease: 'none'
				},
				0
			);
		});

		ScrollTrigger.refresh();
	}

	function handleResize() {
		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(async () => {
			const previousColumns = numColumns;
			updateNumColumns();
			if (previousColumns !== numColumns) await tick();

			initAnimations();
		}, 150);
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

			await tick();
			await initAnimations();
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;

		window.removeEventListener('resize', handleResize);

		clearTimeout(resizeTimeout);

		destroyAnimation();
		resetColumns();
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
		padding-top: 20%;
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
