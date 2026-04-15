<script>
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import EquipmentLogoImage from './EquipmentLogoImage.svelte';
	import ExpandableText from '$lib/ExpandableText.svelte';

	export let card;
</script>

<div class="wrapper">
	<div class="logo-wrapper">
		<EquipmentLogoImage logo={card.logo} image={card.homepageCard.image} />
	</div>
	<div class="texts-wrapper">
		<div class="top">
			<p class="zl-tagline">{card.homepageCard.lead}</p>
            <p>{@html card.homepageCard.desc[0]}</p>
			<!-- <ExpandableText>
				{#each card.homepageCard.desc as txt}
                <p>{@html txt}</p>
				{/each}
			</ExpandableText> -->
		</div>
		<div class="spacer"></div>
		<div class="bottom">
			<HanddrawnLink href="/technika">{card.homepageCard.button}</HanddrawnLink>
			{#if card.homepageCard.buttonBrag}<p>{card.homepageCard.buttonBrag}</p>{/if}
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.texts-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.zl-tagline {
		text-align: center;
		text-transform: uppercase;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		overflow: hidden;

		min-height: 4em;
	}

	.texts-wrapper .spacer {
		flex-grow: 1;
	}

	.texts-wrapper .bottom {
		width: 100%;
		text-align: center;
		margin-top: 2rem;
	}

	:global(.texts-wrapper p span) {
		color: var(--zl-red);
		font-weight: bolder;
	}
</style>
