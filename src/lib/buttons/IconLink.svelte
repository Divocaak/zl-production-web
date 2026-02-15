<script>
	import SubtleLink from './SubtleLink.svelte';

	export let href;
	export let svgPath;
	export let target = '_blank';
</script>

<SubtleLink {href} {target}>
	<img src={svgPath} alt="" aria-hidden="true" />
	<span class="label"><slot /></span>
</SubtleLink>

<style>
	img {
		width: 1.25rem;
		height: 1.25rem;
		object-fit: contain;

		/* if your SVGs are dark and you want them light on dark bg */
		filter: brightness(0) invert(1);

		padding-right: 0.75rem;
	}

	.label {
		line-height: 1;
		white-space: nowrap;
	}
</style>
