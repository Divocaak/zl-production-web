<script>
	import BentoGallery from '$lib/BentoGallery.svelte';
	import Hero from '$lib/sections/Hero.svelte';
	import StatsGrid from '$lib/StatsGrid.svelte';
</script>

<Hero
	logoSrc="/logos/zl-studio-dark.svg"
	tagline="Jedinečný stagedesign, obsah a prvotřídní odbavení"
/>
<div class="text">
	<p>
		<span>Nezávislost na externích dodavatelích</span>, důkladná znalost vlastního vybavení a
		<span>stálý produkční i technický tým #zlfamily</span>
		nám umožňují neustále rozvíjet nové technologie, znalosti a postupy. Díky tomu nejsme omezeni množstevními
		nebo cenovými limity vybavení, což nám dává
		<span>volnost v kreativním procesu</span>. Pod našima rukama tak vznikají jedinečná díla - od
		prvotních nápadů a náčrtů, přes přesnou vizualizaci, až po finální realizaci a obsah šitý na
		míru živým i televizním produkcím.
	</p>
	<p>
		Pro projekty připravujeme <span>vlastní návrhy scén</span> a řešení stage designu, doplněné o
		obsah ve formě videokontentu, speciálních efektů, programování osvětlení a efektů. Vítáme
		možnost řízení obsahu timecodem, což umožňuje vytváření individualizovaných show pro každý
		projekt podle specifik vyplývajících z charakteru nebo záměru akce. Kromě přípravné fáze se
		samozřejmě věnujeme také <span>kompletní realizaci</span> na místě konání a dodání všech potřebných
		služeb a materiálu.
	</p>
	<div class="stats-wrapper">
		<StatsGrid
			columns="repeat(2, 1fr)"
			maxWidth="80%"
			items={[
				{ value: 100, label: 'Kreativního prostoru', unit: 'm²' },
				{ value: 54, label: 'Realizovaných projektů' }
			]}
		/>
	</div>
	<p>
		Největší kreativní prostor nám poskytuje náš <i>druhý domov</i>, O2 arena. Realizovali jsme zde
		(od prvních návrhů až po technické řešení a odbavení) akce jako <span>Vánoce v květnu</span>
		(Kryštof), vyprodané koncerty <span>Marka Ztraceného</span>, netradiční estrádu
		<span>Kapitána Dema</span>
		a speciality jako <span>Korncert</span> Jiřího Korna či přelomovou show
		<span>světových parametrů</span>
		metalových <span>Dymytry</span>.
	</p>
	<p>
		Technologie a know-how využíváme nejen pro běžný koncertní svět, ale i pro korporátní a firemní
		eventy s kompletním designem prostoru, nejen podia.
	</p>
	<p>
		Pro tvorbu desginu a programing světel, videa a dalšího obsahu nabízíme kompletně zařízené a
		technoligicky vybavené ZLFAMILY SHOW DESIGN STUDIO.
	</p>
</div>
<BentoGallery
	images={[
		{ src: '/reference/00.jpg', alt: 'studio work' },
		{ src: '/reference/01.jpg', alt: 'studio work' },
		{ src: '/reference/02.jpg', alt: 'studio work' },
		{ src: '/reference/03.jpg', alt: 'studio work' },
		{ src: '/reference/04.jpg', alt: 'studio work' },
		{ src: '/reference/05.jpg', alt: 'studio work' },
		{ src: '/reference/06.jpg', alt: 'studio work' },
		{ src: '/reference/07.jpg', alt: 'studio work' },
		{ src: '/reference/08.jpg', alt: 'studio work' },
		{ src: '/reference/09.jpg', alt: 'studio work' },
		{ src: '/reference/010.jpg', alt: 'studio work' },
		{ src: '/reference/011.jpg', alt: 'studio work' },
		{ src: '/reference/012.jpg', alt: 'studio work' },
		{ src: '/reference/013.jpg', alt: 'studio work' },
		{ src: '/reference/014.jpg', alt: 'studio work' },
		{ src: '/reference/015.jpg', alt: 'studio work' },
		{ src: '/reference/016.jpg', alt: 'studio work' },
		{ src: '/reference/017.jpg', alt: 'studio work' },
		{ src: '/reference/018.jpg', alt: 'studio work' },
		{ src: '/reference/019.jpg', alt: 'studio work' }
	]}
/>

<style>
	.text {
		padding: 5rem 10rem;
	}
	.text p span {
		color: var(--zl-red);
		font-weight: bolder;
	}

	.stats-wrapper {
		padding: 5rem 0;
	}
</style>
