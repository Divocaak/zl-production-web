<script>
	import ReferenceGrid from '$lib/reference/ReferenceGrid.svelte';
	import { onMount } from 'svelte';

	let references = [];

	onMount(async () => {
		const res = await fetch('/dynamic/jsons/reference.json');
		let data = await res.json();
		references = data.filter((r) => !r.visible);
	});
</script>

<ReferenceGrid {references} />
