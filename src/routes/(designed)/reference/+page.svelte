<script>
	import ReferenceGrid from '$lib/reference/ReferenceGrid.svelte';
	import { onMount } from 'svelte';

	let references = [];

	onMount(async () => {
		const [refsRes, blogRes] = await Promise.all([
			fetch('/dynamic/jsons/reference.json'),
			fetch('/blog-references.json')
		]);

		const baseReferences = await refsRes.json();
		const secondData = await blogRes.json();

		const blogReferences = Object.entries(secondData.items).map(([id, item]) => ({
			path: id,
			img: item.cardImage,
			label: item.hero.label,
			visible: true
		}));

		const visible = baseReferences.filter((r) => r.visible);
		references = [...blogReferences, ...visible];
	});
</script>

<ReferenceGrid {references} />
