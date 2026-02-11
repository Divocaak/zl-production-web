<script>
	export let src;
	export let alt = 'alternative desc';
	export let width = '50%';
</script>

<img {src} {alt} style="width: {width}" />

<style>
	img {
		margin: 0 auto;
        position: relative;
		z-index: 1;
	}
</style>
