<script>
	import Marquee from '$lib/Marquee.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import overlaySvgRaw from '$lib/assets/splashes/2.svg?raw';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
</script>

<div class="marquee-wrapper" id="studio">
	<Marquee />
	<div class="marquee-overlay">
		<div class="overlay-bg">
			{@html overlaySvgRaw}
		</div>
		<div class="content">
			<LogoHeading src="logos/zl-studio-dark.svg" alt="ZL Studio Logo" href="/studio" />
			<p>
				Moderní stage design a vizuální obsah show tvoříme ve vlastním ZL studiu - komfortním 100m2
				prostoru s nejmodernějšími technologiemi (GrandMA3, ChamSys MQ500, ZL mediaserver, kamerové
				studio) a dalším nezbytným vybavením, včetně špičkového ozvučení, LED stěny a velkoplošných
				zobrazovačů.
			</p>
			<p>
				Tvoříme, prezentujeme a nasazujeme zde digitální content, programujeme světelné scény dle
				stage designu. Ten vzniká v reálném 3D prostředí, protože disponujeme přesnými modely O2
				areny, O2 universa, hal BVV, amfiteátrů a dalších prostor.
			</p>
			<p>
				Technologickou proveditelnost okamžitě ověřujeme v reálných podmínkách. Studio je součástí
				skladu nejmodernější koncertní techniky.
			</p>
			<p>
				Reference: The Culture, Jelen (O2 arena), Kateřina Marie Tichá (O2 universum), Dymytry (02
				arena), Kryštof, Panoptiko, Česká spořitelna, Prosperity, Plzeňský Prazdroj.
			</p>
			<HanddrawnLink href="/studio">Více informací</HanddrawnLink>
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

		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(.marquee-overlay svg) {
		width: clamp(280px, 55vw, 900px);
		height: auto;

		fill: var(--stage-blue);
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.7));
	}

	.content {
		position: relative;
		z-index: 1;

		display: flex;
		flex-direction: column;
		align-items: center;

		width: clamp(280px, 50%, 900px);
		text-align: center;
		gap: 2.5rem;

		
		pointer-events: all;
	}
	
	.content p {
		padding: 0 5rem;
		margin: 0;
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
