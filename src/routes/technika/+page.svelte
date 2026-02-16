<script>
	import EquipmentSection from '$lib/EquipmentSection.svelte';
	import { onMount, tick } from 'svelte';

	let equipment;

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
	{#each equipment as section}
		<EquipmentSection {section} />
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 10rem;
	}
</style>
