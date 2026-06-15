<script>
	import CareerCard from '$lib/CareerCard.svelte';
	import { onMount } from 'svelte';

	let employeeOpportunities = [];
	let tempOpportunities = [];
	onMount(async () => {
		const res = await fetch('/dynamic/jsons/career.json');
		if (!res.ok) throw new Error('Failed to load career opportunities');
		const opportunities = await res.json();
		employeeOpportunities = opportunities.filter((o) => !o.temp);
		tempOpportunities = opportunities.filter((o) => o.temp);
	});
</script>

<div class="wrapper">
	{#if employeeOpportunities.length}
		<h1 class="zl-heading">Nabídka pracovních pozic</h1>
		{#each employeeOpportunities as career, i}
			<CareerCard {career} alternated={i % 2 != 0} />
		{/each}
	{/if}
	{#if tempOpportunities.length}
		<h1 class="zl-heading">Stálá nabídka brigád</h1>
		{#each tempOpportunities as career, i}
			<CareerCard {career} alternated={i % 2 !== 0} />
		{/each}
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 5rem;
		margin-top: 5rem;
		padding: 0 var(--general-px);
	}

    h1{
        text-align: center;
    }
</style>
