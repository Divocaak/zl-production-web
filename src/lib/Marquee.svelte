<script>
	export let images = [
		'/studio/0.jpg',
		'/studio/1.jpg',
		'/studio/2.jpg',
		'/studio/3.jpg',
		'/studio/4.jpg',
		'/studio/5.jpg',
		'/studio/6.jpg'
	];
</script>

<div class="marquee">
	<div class="track">
		{#each images as img}
			<img src={img} alt="" class="item" decoding="async" loading="eager" />
		{/each}
		{#each images as img}
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
		animation: scroll 80s linear infinite;

		will-change: transform;
		transform: translate3d(0, 0, 0);

		animation-timing-function: linear;
		image-rendering: auto;
		backface-visibility: hidden;
	}

	.item {
		flex-shrink: 0;
		/* width: 300px; */
		aspect-ratio: 16 / 9;
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
