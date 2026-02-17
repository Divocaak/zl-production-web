<script>
	import SubtleLink from '$lib/buttons/SubtleLink.svelte';
	import FamilyMember from '$lib/FamilyMember.svelte';
	import { onDestroy, onMount, tick } from 'svelte';

	let family;
	let loading = true;

	let chunkSize = 4;
	function chunk(array) {
		const result = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			result.push(array.slice(i, i + chunkSize));
		}
		return result;
	}

	function updateChunkSize() {
		const width = window.innerWidth;
		if (width <= 430) chunkSize = 1;
		else if (width <= 1024) chunkSize = 2;
		else if (width <= 1366) chunkSize = 3;
		else chunkSize = 4;
	}

	onMount(async () => {
		if (typeof window === 'undefined') return;
		window.addEventListener('resize', updateChunkSize);

		try {
			const res = await fetch('/family.json');
			if (!res.ok) throw new Error('Failed to load references');
			family = await res.json();
			updateChunkSize();
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}

		await tick();
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		window.removeEventListener('resize', updateChunkSize);
	});
</script>

{#each family as section}
	{#if section.heading}
		<div class="heading-wrapper">
			<img src="/logos/{section.heading}" alt="section heading logo" />
		</div>
	{/if}
	<div class="members-wrapper">
		{#each chunk(section.members, chunkSize) as row}
			<div class="members-row">
				{#each row as member, index}
					<FamilyMember {member} animal={section.zoo[index % section.zoo.length]} />
				{/each}
			</div>
		{/each}
	</div>
{/each}

<style>
	.heading-wrapper {
		width: 100%;
		text-align: center;
		margin-top: 10rem;
	}

	.heading-wrapper img {
		width: 25%;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 1));
	}

	.members-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.members-row {
		display: grid;
		grid-template-columns: repeat(4, max-content);

		justify-content: center;
	}

	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.members-row {
			grid-template-columns: repeat(3, max-content);
		}
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
	}

	/* iPhone 15 and smaller (≤ 430px) */
	@media (max-width: 430px) {
	}
</style>
