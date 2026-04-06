<script>
	import FlippingCard from './FlippingCard.svelte';

	export let landingSrc;
	export let logoSrc;
	export let logoAlt;

	export let desc;
	export let bottom;
</script>

<FlippingCard>
	<div slot="inner" class="wrapper">
		<div class="bg-image" style="background-image: url('{landingSrc}');"></div>
		<div class="content logo">
			<img src={logoSrc} alt={logoAlt} />
		</div>
	</div>
	<div slot="backface" class="wrapper">
		<div class="bg-image back" style="background-image: url('{landingSrc}');"></div>
		<div class="content back">
			<p class="card-text">
				{@html desc}
			</p>
			<p class="ref">{@html bottom}</p>
		</div>
	</div>
</FlippingCard>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.bg-image {
		border-radius: calc(var(--card-border-radius) / 2);
		min-height: 400px;
		background-position: center;
		background-repeat: none;
		background-size: cover;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
	}

	.bg-image.back {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 99;
		border-radius: calc(var(--card-border-radius) / 2);
		filter: blur(3px) saturate(40%) brightness(0.4);
	}

	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 1rem;
		margin-top: 1rem;
		z-index: 999;
	}

	.logo img {
		height: 70px;
		width: auto;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));
	}

	.content.back {
		height: 90%;
	}

	:global(.card-text span) {
		color: var(--zl-red);
		font-weight: bolder;
	}
</style>
