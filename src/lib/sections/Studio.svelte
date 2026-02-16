<script>
	import Marquee from '$lib/Marquee.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import overlaySvgRaw from '$lib/assets/splashes/2.svg?raw';
</script>

<div class="marquee-wrapper" id="studio">
	<Marquee />
	<div class="marquee-overlay">
		<div class="overlay-bg">
			{@html overlaySvgRaw}
		</div>
		<div class="content">
			<LogoHeading src="logos/zl-studio-dark.svg" alt="ZL Studio Logo" />
			<p>
				Nezávislost na externích dodavatelích, důkladná znalost vlastního vybavení a stálý produkční
				i technický tým #zlfamily nám umožňují neustále rozvíjet nové technologie, znalosti a
				postupy.
			</p>
			<p>
				Díky tomu nejsme omezeni množstevními nebo cenovými limity vybavení, což nám dává volnost v
				kreativním procesu.
			</p>
			<p>
				Pod našima rukama tak vznikají jedinečná díla - od prvotních nápadů a náčrtů, přes přesnou
				vizualizaci, až po finální realizaci a obsah šitý na míru živým i televizním produkcím.
			</p>
			<LogoHeading src="logos/zl-basecamp-dark.svg" alt="#ZLBaseCamp Logo" />
		</div>
	</div>
</div>

<style>
	.marquee-wrapper {
		position: relative;
		height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
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

	.overlay-bg {
		position: absolute;
		inset: 0;
		width: 120%;
		height: 120%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 0;
		pointer-events: none;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .7));
	}

	:global(.marquee-overlay svg) {
		width: 100%;
		height: 100%;
		display: block;
		fill: var(--stage-blue);
	}

	.content {
		position: relative;
		z-index: 1;

		display: flex;
		flex-direction: column;
		align-items: center;

		width: clamp(280px, 50%, 900px);
		text-align: center;
		gap: 2rem;
	}

	.content p {
		padding: 0 5rem;
	}

	@media (max-width: 1024px) {
		.content {
			width: 70%;
			gap: 1.5rem;
		}
		.content p {
			font-size: clamp(0.9rem, 1.5vw, 1.1rem);
			padding: 0 0.5rem;
		}
	}

	@media (max-width: 600px) {
		.content {
			width: 90%;
			gap: 1rem;
		}
		.content p {
			font-size: clamp(0.8rem, 2.5vw, 1rem);
			padding: 0 0.25rem;
		}
	}
</style>
