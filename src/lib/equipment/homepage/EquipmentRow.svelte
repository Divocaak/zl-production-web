<script>
	import FlexContent from '$lib/FlexContent.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import MaskedImage from '$lib/MaskedImage.svelte';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import EquipmentLogoImage from './EquipmentLogoImage.svelte';
	import ExpandableText from '$lib/ExpandableText.svelte';

	export let card;
</script>

<!-- NOTE del me later -->
<div class="logo-center-wrapper">
	<EquipmentLogoImage logo={card.logo} image={card.homepageCard.image} />
</div>
<FlexContent>
	<div slot="right" class="flex-logo-wrapper">
		<EquipmentLogoImage logo={card.logo} image={card.homepageCard.image} />
	</div>
	<div slot="left" class="texts-wrapper">
		<p class="zl-tagline">{card.homepageCard.lead}</p>
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

	.texts-wrapper .zl-tagline {
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

		.flex-logo-wrapper {
			display: none;
		}
	}
</style>
