<script>
	import EquipmentButtonBar from '$lib/equipment/EquipmentButtonBar.svelte';
	import EquipmentSection from '$lib/equipment/EquipmentSection.svelte';
	import BlogReferences from '$lib/sections/BlogReferences.svelte';
	import { onMount, tick } from 'svelte';

	let equipment;
	let activeIndex = 0;

	onMount(async () => {
		try {
			const res = await fetch('/equipment.json');
			if (!res.ok) throw new Error('Failed to load equipment');
			equipment = await res.json();
		} catch (e) {
			console.error(e);
		}

		await tick();
	});
</script>

<div class="wrapper">
	<EquipmentButtonBar cards={equipment} bind:activeIndex let:card>
		<EquipmentSection section={card} />
	</EquipmentButtonBar>
</div>

<style>
	.wrapper {
		position: relative;
		padding: 0 var(--general-px);
		z-index: 0;
	}


	/* Bigger than 1920px (ultrawide / 2K / 4K) */
	@media (min-width: 1921px) {
		.wrapper {
			min-height: 100%;
			width: 60%;
			margin: 0 auto;
		}
	}
</style>
