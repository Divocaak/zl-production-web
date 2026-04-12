<script>
	import splashBgRaw from '$lib/assets/splashes/3.svg?raw';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import EquipmentButtonBar from '$lib/equipment/EquipmentButtonBar.svelte';
	import EquipmentRow from '$lib/equipment/homepage/EquipmentRow.svelte';
	import { onMount, tick } from 'svelte';

	let equipmentCards;
	let activeIndex = 0;

	onMount(async () => {
		try {
			const res = await fetch('/equipment.json');
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

<!-- TODO stagsisours -->
<div class="wrapper" id="technika">
	<div class="bg-svg" style="--fill: {equipmentCards?.[activeIndex]?.homepageCard.fill ?? ''}">
		{@html splashBg}
	</div>
	<EquipmentButtonBar cards={equipmentCards} bind:activeIndex let:card>
		<EquipmentRow {card} />
	</EquipmentButtonBar>
</div>

<style>
	:root {
		--fill: var(--stage-blue);
	}

	.wrapper {
		position: relative;
		padding: 0 var(--general-px);
		min-height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.bg-svg {
		position: absolute;

		display: flex;
		align-items: center;
		justify-content: center;

		z-index: 0;
		pointer-events: none;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.7));
	}

	:global(.bg-svg svg) {
		display: block;
		width: 100%;
		height: 100%;

		pointer-events: none;

		fill: var(--fill);
		transition: fill 0.7s ease;
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		.bg-svg {
			top: -5%;
		}
	}

	/* iPhone 15 and smaller (≤ 430px) */
	@media (max-width: 430px) {
		.bg-svg {
			display: none;
		}
	}
</style>
