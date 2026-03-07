<script>
	import splashBgRaw from '$lib/assets/splashes/3.svg?raw';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import EquipmentButtonBar from '$lib/EquipmentButtonBar.svelte';
	import EquipmentRow from '$lib/EquipmentRow.svelte';
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

	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.wrapper {
			padding: 0 1rem;
		}
	}
</style>
