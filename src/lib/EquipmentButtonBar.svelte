<script>
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let cards = [];
	export let activeIndex = 0;

	const fadeLength = 350;
	let transitioning = false;

	let containerHeight = 0;
	let sectionEl;

	let observer;

	async function activate(index) {
		if (index === activeIndex || transitioning) return;

		transitioning = true;

		if (window.__smoother) window.__smoother.paused(true);

		activeIndex = index;
		await new Promise((r) => setTimeout(r, fadeLength));

		if (window.__smoother) {
			window.__smoother.paused(false);
			window.__smoother.refresh();
		}

		transitioning = false;
	}

	onMount(() => {
		observer = new ResizeObserver((entries) => {
			for (const entry of entries) containerHeight = entry.contentRect.height;
		});

		if (sectionEl) observer.observe(sectionEl);
	});

	$: {
		if (observer && sectionEl) {
			observer.disconnect();
			observer.observe(sectionEl);
		}
	}

	onDestroy(() => {
		observer?.disconnect();
	});
</script>

<div class="buttons" data-scroll-ignore>
	{#each cards as card, i}
		<button class:active={i === activeIndex} on:click={() => activate(i)} type="button">
			<img src={card?.buttonImg ?? ''} alt="section logo button" />
		</button>
	{/each}
</div>
<div class="sections" style="height:{containerHeight}px">
	{#each cards as card, i}
		{#if i === activeIndex}
			<div
				class="section"
				in:fade={{ duration: fadeLength }}
				out:fade={{ duration: fadeLength }}
				bind:this={sectionEl}
			>
				<slot {card} />
			</div>
		{/if}
	{/each}
</div>

<style>
	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		gap: 3rem;
		position: relative;
		z-index: 2;

		margin-bottom: 4rem;
	}

	button {
		all: unset;
		cursor: pointer;

		opacity: 0.8;
		transition: all 0.35s ease;

		width: 100%;
		height: 100%;

		pointer-events: auto;
	}

	button:hover img {
		filter: drop-shadow(0 6px 12px rgba(255, 255, 255, 0.2));
		transform: scale(0.9);
	}

	button img {
		display: block;
		position: relative;
		height: 100%;
		width: 100%;

		margin: 0 auto;

		transition: all 0.35s ease;

		transform: scale(0.8);
	}
	
	button.active img {
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.7));
		transform: scale(1);
	}

	button.active {
		opacity: 1;
	}

	.sections {
		position: relative;
		width: 100%;

		transition: height 0.35s ease;
	}

	.section {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
	}

	@media (max-width: 1366px) {
		.buttons {
			margin-bottom: 1rem;
			gap: 1rem;
		}
	}
</style>
