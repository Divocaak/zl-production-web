<script>
	import AdminForm from '$lib/admin/AdminForm.svelte';

	async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		window.location.href = '/admin';
	}
</script>

<button on:click={logout}>logout</button>

<AdminForm
	schemaPath="/admin/reference-schema.json"
	dataPath="/dynamic/jsons/reference.json"
	apiPath="/api/saveReference"
	saveButton="reference"
/>
<AdminForm
	schemaPath="/admin/career-schema.json"
	dataPath="/dynamic/jsons/career.json"
	apiPath="/api/saveCareer"
	saveButton="nabídky"
/>
