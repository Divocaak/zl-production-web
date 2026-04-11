<script>
	import LogoHeading from "$lib/LogoHeading.svelte";
	import MaskedImage from "$lib/MaskedImage.svelte";

	export let image;
	export let logo;
</script>

<MaskedImage src={image} alt="reference image" parallax={true} floating={true}>
	<div class="logo-wrapper">
		<LogoHeading
			src={logo}
			alt="zl section logo"
			maxWidthPx="400"
			shadowOpacity="1"
			href="/technika"
		/>
	</div>
</MaskedImage>

<style>
	.logo-wrapper {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
</style>
