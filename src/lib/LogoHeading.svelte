<script>
	export let src;
	export let alt = 'alternative desc';
	export let maxWidthPx = 700;
	export let shadowOpacity = 0.4;
	export let href;

	export let element;
	export let target;
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{...href ? { href } : {}}
	{...target ? { target } : {}}
	class="wrapper"
>
	<img
		{src}
		{alt}
		bind:this={element}
		style="--img-max-width: {maxWidthPx}px; --shadow-opacity: {shadowOpacity}"
	/>
</svelte:element>

<style>
	img {
		display: block;
		position: relative;
		width: 100%;
		z-index: 1;

		max-width: var(--img-max-width);
		height: auto;
		margin-inline: auto;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, var(--shadow-opacity)));
	}

	.wrapper {
		text-align: center;
		width: 100%;
	}
</style>
