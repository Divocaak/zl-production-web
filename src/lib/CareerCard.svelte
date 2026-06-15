<script>
	import HanddrawnLink from './buttons/HanddrawnLink.svelte';
	import FlexContent from './FlexContent.svelte';
	import MaskedImage from './MaskedImage.svelte';

	export let career;
	export let alternated;
</script>

<FlexContent {alternated}>
	<div class="equipment-content alternated" slot="left">
		<h2>{career.label}</h2>

		<p>{@html career.description}</p>
		<div class="link-wrapper">
			<HanddrawnLink href="mailto:office@zlproduction.cz">mám zájem</HanddrawnLink>
		</div>
	</div>
	<div class="img-wrapper" slot="right">
		<MaskedImage src={career.image} alt="career image" width="60%" floating={true} />
	</div>
</FlexContent>
