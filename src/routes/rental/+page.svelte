<script>
	export let data;

	const equipment = typeof data?.equipment === 'object' ? data.equipment : { form: [], items: [] };

	let sectionIndex = 0;
	let categoryIndex = 0;

	let filters = {};

	$: sectionLabels = Array.isArray(equipment.form) ? equipment.form : [];
	$: sections = Array.isArray(equipment.items) ? equipment.items : [];
	$: section =
		sections[sectionIndex] && typeof sections[sectionIndex] === 'object'
			? sections[sectionIndex]
			: { label: '', categories: [], items: [] };

	$: categories = Array.isArray(section.categories) ? section.categories : [];
	$: category =
		Array.isArray(section.items) &&
		Number.isInteger(categoryIndex) &&
		section.items[categoryIndex] &&
		typeof section.items[categoryIndex] === 'object'
			? section.items[categoryIndex]
			: { form: {}, items: [] };
	$: form = category.form && typeof category.form === 'object' ? category.form : {};
	$: items = Array.isArray(category.items) ? category.items : [];

	/* ---------- actions ---------- */
	function resetAll() {
		sectionIndex = 0;
		categoryIndex = 0;
		filters = {};
	}

	function resetCategory() {
		categoryIndex = 0;
		filters = {};
	}

	function resetFilters() {
		filters = {};
	}

	/* ---------- filtering ---------- */
	$: filteredItems = Array.isArray(items)
		? items.filter(
				(item) =>
					item &&
					typeof item === 'object' &&
					Object.entries(filters).every(
						([key, value]) => value === undefined || item[key] === value
					)
			)
		: [];
</script>

{#if sectionLabels.length}
	<select bind:value={sectionIndex} on:change={resetCategory}>
		{#each sectionLabels as label, index}
			<option value={index}>{label}</option>
		{/each}
	</select>
{/if}

{#if categories.length}
	<select bind:value={categoryIndex} on:change={resetFilters}>
		{#each categories as label, index}
			<option value={index}>{label}</option>
		{/each}
	</select>
{/if}

{#if Object.keys(form).length}
	<form>
		{#each Object.entries(form) as [key, field]}
			<label>
				{field && typeof field.label === 'string' ? field.label : key}

				<select bind:value={filters[key]}>
					<option value={undefined}>– any –</option>

					{#each Array.isArray(field?.values) ? field.values : [] as value, index}
						<option value={typeof value === 'number' ? value : index}>
							{String(value)}
						</option>
					{/each}
				</select>
			</label>
		{/each}
	</form>
{/if}

<ul>
	{#if filteredItems.length}
		{#each filteredItems as item}
			<li>
				<strong>{item?.label ?? 'Unnamed item'}</strong>
				<ul>
					{#each Object.keys(form) as key}
						<li>
							{form[key].label ?? key}:
							{#if typeof item[key] === 'number' && Array.isArray(form[key].values)}
								{form[key].values[item[key]] ?? 'Unknown'}
							{:else}
								{item[key]}
							{/if}
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	{:else}
		<li>No results</li>
	{/if}
</ul>
