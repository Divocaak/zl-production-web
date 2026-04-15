<script>
	import EquipmentCel from '$lib/equipment/homepage/EquipmentCel.svelte';
	import { onMount, tick } from 'svelte';
	import SectionWrapper from './SectionWrapper.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	let equipmentCards;
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
</script>


<SectionWrapper id="technika">
    <LogoHeading src="/hashtags/stage-is-ours-dark.svg" alt="#stage is ours logo"/>
    <div class="wrapper">
        {#each equipmentCards as card}
		<EquipmentCel {card} />
        {/each}
    </div>
</SectionWrapper>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		align-items: stretch;
	}

	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.wrapper {
			grid-template-columns: repeat(2, 1fr);
		}
	}
    
    /* iPhone 15 and smaller (≤ 430px) */
	@media (max-width: 430px) {
        .wrapper {
            display: flex;
            flex-direction: column;
        }
	}
</style>
