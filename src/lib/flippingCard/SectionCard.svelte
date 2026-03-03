<script>
	import LogoHeading from '$lib/LogoHeading.svelte';
	import FlippingCard from './FlippingCard.svelte';

	export let landingSrc;
	export let logoSrc;
	export let logoAlt;
	export let desc;
</script>

<FlippingCard>
	<div slot="inner" class="wrapper">
		<div class="bg-image" style="background-image: url('{landingSrc}');"></div>
		<div class="content">
			<LogoHeading src={logoSrc} alt={logoAlt} />
		</div>
	</div>
	<div slot="backface" class="wrapper">
		<div class="content back">
			<p class="card-text">
				{@html desc}
			</p>
		</div>
	</div>
</FlippingCard>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.bg-image {
		border-radius: calc(var(--card-border-radius) / 2);
		min-height: 400px;
		background-position: center;
		background-repeat: none;
		background-size: cover;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 1rem;
		margin-top: 1rem;
	}

	.content.back{
		height: 80%;
	}

	:global(.card-text span) {
		color: var(--zl-red);
		font-weight: bolder;
	}
</style>
