<script>
	import FlexContent from '$lib/FlexContent.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import MaskedImage from '$lib/MaskedImage.svelte';
	import HanddrawnLink from './buttons/HanddrawnLink.svelte';

	export let card;
</script>

<FlexContent>
	<div slot="right">
		<MaskedImage src={card.image} alt="reference image" parallax={true} floating={true}>
			<div class="logo-wrapper">
				<LogoHeading src={card.logo} alt="zl section logo" maxWidthPx="400" shadowOpacity="1" />
			</div>
		</MaskedImage>
	</div>
	<div slot="left" class="texts-wrapper">
		<p class="lead">{card.lead}</p>
		<p>{@html card.desc}</p>
		<div class="link">
			<HanddrawnLink href="/technika">vybavení</HanddrawnLink>
		</div>
	</div>
</FlexContent>

<style>
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
	}

	:global(.texts-wrapper p span) {
		color: var(--zl-red);
		font-weight: bolder;
	}
</style>
