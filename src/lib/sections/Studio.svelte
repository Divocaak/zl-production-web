<script>
	import Marquee from '$lib/Marquee.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import overlaySvgRaw from '$lib/assets/splashes/2.svg?raw';
</script>

<div class="marquee-wrapper" id="studio">
	<Marquee />
	<div class="marquee-overlay">
		{@html overlaySvgRaw}
		<div class="content">
			<LogoHeading src="logos/zl-studio-dark.svg" alt="ZL Studio Logo" />
			<p>
				Nezávislost na externích dodavatelích, důkladná znalost vlastního vybavení a stálý produkční i technický tým #zlfamily nám umožňují neustále rozvíjet nové technologie, znalosti a postupy. Díky tomu nejsme omezeni množstevními nebo cenovými limity vybavení, což nám dává volnost v kreativním procesu. Pod našima rukama tak vznikají jedinečná díla - od prvotních nápadů a náčrtů, přes přesnou vizualizaci, až po finální realizaci a obsah šitý na míru živým i televizním produkcím.
			</p>
			<LogoHeading src="logos/zl-basecamp-dark.svg" alt="#ZLBaseCamp Logo" />
		</div>
	</div>
</div>

<!-- TODO resp -->
<style>
	.marquee-wrapper {
		position: relative;

		display: flex;
		flex-direction: column;
		justify-content: center;

		height: 100vh;
	}

	.marquee-overlay {
		position: absolute;
		inset: 0;

		pointer-events: none;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	:global(.marquee-overlay svg) {
		position: absolute;
		top: 0;
		left: -6%;
		width: 110%;
		height: 110%;
		z-index: 0;
		fill: var(--stage-blue);
	}

	.content {
		position: relative;
		z-index: 1;

		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
	}

	.content p {
		padding: 0 5rem;
	}
</style>
