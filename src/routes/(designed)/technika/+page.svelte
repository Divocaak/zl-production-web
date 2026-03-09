<script>
	import EquipmentButtonBar from '$lib/EquipmentButtonBar.svelte';
	import EquipmentSection from '$lib/EquipmentSection.svelte';
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
		padding: 0 8rem;
	}
</style>
