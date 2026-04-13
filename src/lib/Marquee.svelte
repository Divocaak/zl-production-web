<script>
	import { onMount } from 'svelte';

	export let images = [
		'/reference/studio/12.jpg',
		'/reference/studio/7.jpg',
		'/reference/studio/5.jpg',
		'/reference/studio/4.jpg',
		'/reference/studio/3.jpg',
		'/reference/studio/0.jpg',
		'/reference/studio/11.jpg'
	];

	let track;

	onMount(() => {
		const observer = new IntersectionObserver(([entry]) => {
			track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
		});

		observer.observe(track);

		return () => observer.disconnect();
	});
</script>

<div class="marquee">
	<div class="track" bind:this={track}>
		{#each images as img}
			<img src={img} alt="" class="item" decoding="async" loading="eager" />
		{/each}
		{#each [...images, ...images.slice(0, 3)] as img}
			<img src={img} alt="" class="item" decoding="async" loading="eager" />
		{/each}
	</div>
</div>

<style>
	.marquee {
		width: 100%;
		overflow: hidden;
	}

	.track {
		display: flex;
		width: max-content;
		animation: scroll 120s linear infinite;

		will-change: transform;
		transform: translate3d(0, 0, 0);

		animation-timing-function: linear;
		image-rendering: auto;
		backface-visibility: hidden;

		contain: layout paint;
	}

	.item {
		flex-shrink: 0;
		aspect-ratio: 16 / 9;
		max-width: 1000px;
		object-fit: cover;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
	}
</style>
