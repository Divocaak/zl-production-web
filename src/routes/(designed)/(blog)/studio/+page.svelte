<script>
	import BlogContent from '$lib/blog/BlogContent.svelte';
	import BlogReferences from '$lib/sections/BlogReferences.svelte';

	export let data;
</script>

<BlogContent {data}>
	<BlogReferences />
</BlogContent>
