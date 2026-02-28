<script>
	import VideoModal from '$lib/videoModal/VideoModal.svelte';

	export let videoSrc;
	export let imageThumbnailSrc;
	let open = false;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="video-trigger" on:click={() => (open = true)}>
	<div class="thumbnail-wrapper" class:hover-fx={!imageThumbnailSrc}>
		{#if imageThumbnailSrc}
			<div class="image-wrapper">
				<img src={imageThumbnailSrc} alt="video thumbnail" class:hover-fx={imageThumbnailSrc} />
			</div>
		{:else}
			<slot />
		{/if}
	</div>
	<div class="icon-wrapper">
		<img src="/icons/play.svg" alt="play icon" />
	</div>
</div>

{#if open}
	<VideoModal src={videoSrc} poster={imageThumbnailSrc} on:close={() => (open = false)} />
{/if}

<style>
	.video-trigger {
		position: relative;
		cursor: pointer;

		width: 100%;
		aspect-ratio: 16 / 9;
	}

	.hover-fx {
		transition: all 0.3s ease;
	}

	.thumbnail-wrapper .image-wrapper {
		overflow: hidden;
	}

	.thumbnail-wrapper .image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.video-trigger:hover .hover-fx {
		filter: brightness(0.4);
		transform: scale(1.05);
	}

	.icon-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 999;

		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.icon-wrapper img {
		width: 100px;
		height: auto;

		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
		transition: all 0.3s ease;
	}

	.video-trigger:hover .icon-wrapper img {
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))
			drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
		transform: scale(1.2) rotate(2deg);
	}
</style>
