<script>
	export let path;
	export let img;
	export let label;
	export let borderRadius = 1;
</script>

<a class="card" href="/reference/{path}" style="border-radius: {borderRadius}rem;">
	<div class="card-image" style="background-image: url({img});"></div>
	<h3 class="zl-text">{label}</h3>
</a>

<style>
	.card {
		flex: 0 0 auto;
		aspect-ratio: 16/9;

		display: flex;
		align-items: center;
		justify-content: center;

		user-select: none;
		touch-action: pan-x;

		will-change: transform, opacity;

		transform: translateZ(0);

		position: relative;
		overflow: hidden;
		cursor: pointer;

		color: var(--white);
		text-decoration: none;

		pointer-events: all;
	}

	.card-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		transition: all 0.35s ease;
		will-change: transform;
	}

	.card:hover .card-image {
		transform: scale(1.05);
		filter: brightness(0.8) blur(0.7px);
	}

	.card h3 {
		position: relative;
		z-index: 2;

		transition: all 0.45s ease;

		text-align: center;
	}

	.card:hover h3 {
		color: var(--tech-yellow);
	}

	@media (max-width: 767px) {
		.card {
			flex: 0 0 auto; /* prevent shrinking */
			aspect-ratio: 16 / 9; /* preserve ratio */
			scroll-snap-align: center;
			/* width: calc(80vw);  */
		}
	}
</style>
