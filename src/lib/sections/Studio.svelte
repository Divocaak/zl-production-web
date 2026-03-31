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
			<LogoHeading src="logos/zl-studio-dark.svg" alt="ZL Studio Logo" />
			<p>
				Moderní stage design a vizuální obsah show tvoříme v ZL studiu, které je součástí našeho ZL
				Backstage v Chlumci nad CIdlinou. Na ploše více než 100 m² disponujeme kreativním prostorem
				vybaveným synchronizovanými technologiemi (Grand MA3, mediaservery Brutal Force) a dalším
				nezbytným vybavením včetně velkých zobrazovačů.
			</p>
			<p>
				V rámci přípravy zde na media serverech vytváříme a nasazujeme digitální content a zároveň
				programujeme světelný design v synchornizaci se zvukem. Celému procesu předchází detailní 3D
				návrhy, jejichž technologickou proveditelnost okamžitě ověřujeme v reálných podmínkách
				&ndash; studio je totiž přímo napojené na náš 3 500 m² sklad plný nejmodernější techniky.
			</p>
			<p>
				Toto zázemí využíváme nejen pro vlastní projekty a náš talentovaný ZL kreativní tým (Petr
				Navara, Magdaléna Bláhová, Vojta Toman, Jiří Rouček, Martin Skála…), ale poskytujeme ho také
				interpretům a jejich týmům, včetně prostoru pro zkoušky a finální doladění show.
			</p>
			<p>
				ZL studio a jeho možnosti skrze náš tým využívají festivaly jako The Culture nebo Majáles a
				interpreti Jelen, Kateřina Marie Tichá, Kryštof, Dymytry, Traktor či Panoptiko pro své
				největší show.
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
		width: 120%;
		height: 120%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 0;
		pointer-events: none;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.7));
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
