<script>
	import splashBgRaw from '$lib/assets/splashes/3.svg?raw';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import EquipmentRow from '$lib/EquipmentRow.svelte';
	import { onMount, tick } from 'svelte';

	import { fade } from 'svelte/transition';

	let activeIndex = 0;
	let transitioning = false;
	const fadeLength = 350;

	async function activate(index) {
		if (index === activeIndex || transitioning) return;

		transitioning = true;
		const previous = activeIndex;
		activeIndex = index;

		await new Promise((r) => setTimeout(r, fadeLength));
		transitioning = false;
	}

	let equipmentCards;

	onMount(async () => {
		try {
			const res = await fetch('/equipmentCards.json');
			if (!res.ok) throw new Error('Failed to load equipment');
			equipmentCards = await res.json();
		} catch (e) {
			console.error(e);
		}

		await tick();
	});

	const splashBg = splashBgRaw.includes('preserveAspectRatio')
		? splashBgRaw
		: splashBgRaw.replace('<svg', '<svg preserveAspectRatio="xMidYMid slice"');
</script>

<div class="wrapper" id="technika">
	<div class="bg-svg" style="--fill: {equipmentCards?.[activeIndex]?.fill ?? ''}">
		{@html splashBg}
	</div>
	<div class="buttons">
		{#each equipmentCards as card, i}
			<button class:active={i === activeIndex} on:click={activate(i)}>
				<img src={equipmentCards?.[i]?.buttonImg ?? ''} alt="section logo button" />
			</button>
		{/each}
	</div>
	<div class="sections">
		{#each equipmentCards as card, i}
			{#if i === activeIndex}
				<div class="section" in:fade={{ duration: fadeLength }} out:fade={{ duration: fadeLength }}>
					<EquipmentRow {card} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	:root {
		--fill: var(--stage-blue);
	}

	.wrapper {
		position: relative;
		padding: 0 8rem;
		min-height: 100vh;
	}

	.bg-svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) translateZ(0);

		width: 100%;

		z-index: 0;
		pointer-events: none;
		will-change: transform;

		filter: drop-shadow(0 6px 12px rgba(0,0,0,.7));
	}

	:global(.bg-svg svg) {
		display: block;
		width: 100%;
		height: 100%;

		pointer-events: none;

		fill: var(--fill);
		transition: fill 0.7s ease;
	}

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
	}

	button:hover img{
		filter: drop-shadow(0 6px 12px rgba(255,255,255,.2));
		transform: scale(.9);
	}

	button img {
		display: block;
		position: relative;
		height: 100%;
		width: 100%;

		margin: 0 auto;

		transition: all 0.35s ease;

		transform: scale(.8);
	}

	button.active img{
		filter: drop-shadow(0 6px 12px rgba(0,0,0,.7));
		transform: scale(1);
	}

	button.active {
		opacity: 1;
	}

	.sections {
		position: relative;
		min-height: 300px;
		z-index: 1;
		
		width: 100%;
	}

	.section {
		position: absolute;
		inset: 0;
		width: 100%;
	}

	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.buttons{
			margin-bottom: 1rem;
			gap: 1rem;
		}

		.wrapper{
			padding: 0 1rem;
		}
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
	}

	/* iPhone 15 and smaller (≤ 430px) */
	@media (max-width: 430px) {
	}
</style>
