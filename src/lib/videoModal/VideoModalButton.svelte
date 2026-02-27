<script>
	import VideoModal from '$lib/videoModal/VideoModal.svelte';

	let open = false;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="video-trigger" on:click={() => (open = true)}>
	<slot />
</div>

{#if open}
	<VideoModal
		src="/videos/michal-david/michal-david_master.m3u8"
		poster="/reference/00.jpg"
		on:close={() => (open = false)}
	/>
{/if}

<style>
	.video-trigger {
		cursor: pointer;
	}
</style>
