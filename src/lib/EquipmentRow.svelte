<script>
	import FlexContent from '$lib/FlexContent.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import MaskedImage from '$lib/MaskedImage.svelte';
	import HanddrawnLink from './buttons/HanddrawnLink.svelte';
	import ExpandableText from './ExpandableText.svelte';

	export let card;
</script>

<div class="logo-center-wrapper">
	<LogoHeading src={card.logo} alt="zl section logo" maxWidthPx="400" shadowOpacity="1" />
</div>
<FlexContent>
	<div slot="right">
		<MaskedImage
			src={card.homepageCard.image}
			alt="reference image"
			parallax={true}
			floating={true}
		>
			<div class="logo-wrapper">
				<LogoHeading src={card.logo} alt="zl section logo" maxWidthPx="400" shadowOpacity="1" />
			</div>
		</MaskedImage>
	</div>
	<div slot="left" class="texts-wrapper">
		<p class="lead">{card.homepageCard.lead}</p>
		<ExpandableText>
			{#each card.homepageCard.desc as txt}
				<p>{@html txt}</p>
			{/each}
		</ExpandableText>
		<div class="link">
			<HanddrawnLink href="/technika">{card.homepageCard.button}</HanddrawnLink>
			{#if card.homepageCard.buttonBrag}<p>{card.homepageCard.buttonBrag}</p>{/if}
		</div>
	</div>
</FlexContent>

<style>
	.logo-center-wrapper {
		display: none;
	}

	.logo-wrapper {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.texts-wrapper .lead {
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		text-align: center;
		text-transform: uppercase;
	}

	.link {
		width: 100%;
		text-align: center;
		margin-top: 2rem;
	}

	:global(.texts-wrapper p span) {
		color: var(--zl-red);
		font-weight: bolder;
	}

	@media (max-width: 1024px) {
		.logo-center-wrapper {
			display: block;
		}

		.logo-wrapper {
			display: none;
		}
	}
</style>
