<script>
	import VideoModalButton from '$lib/videoModal/VideoModalButton.svelte';
	import gsap from 'gsap';

	export let item;

	let card;
	let flipped = false;
	function toggleFlip() {
		flipped = !flipped;
		gsap.to(card, {
			rotationY: flipped ? 180 : 0,
			duration: 0.6,
			ease: 'power2.inOut'
		});
	}
</script>

{#if item.videoPath}
	<VideoModalButton videoSrc={item.videoPath} imageThumbnailSrc={item.src}></VideoModalButton>
{:else}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="card-wrapper" bind:this={card} on:click={toggleFlip}>
		<div class="card-face image-wrapper">
			<img class="image-content" src={item.src} alt="" />
		</div>
		<div class="card-face card-back">
			<div class="back-content">
				<h3>{item.label}</h3>
				<p>{item.desc}</p>
				<p class="year">{item.year}</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.image-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}

	.card-face.image-wrapper {
		z-index: 2;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: all 0.3s ease;
	}

	.image-wrapper:hover .image-content {
		transform: scale(1.05);
	}

	.card-wrapper {
		width: 100%;
		aspect-ratio: 16 / 9;
		perspective: 1000px;
		cursor: pointer;
		position: relative;
		transform-style: preserve-3d;
	}

	.card-face {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		backface-visibility: hidden;

		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.card-back {
		transform: rotateY(180deg);
		background: var(--black);
		box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.7);

		width: calc(100% - 4rem);
		text-align: center;
		padding: 0 2rem;
	}

	.back-content h3 {
		font-size: 1.2rem;
		text-transform: uppercase;
		color: var(--zl-red);
	}

	.back-content .year {
		font-weight: bolder;
		color: var(--zl-red);
	}
</style>
