<script>
	import FlippingCard from '$lib/flippingCard/FlippingCard.svelte';
	import SectionCard from '$lib/flippingCard/SectionCard.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import StatsGrid from '$lib/StatsGrid.svelte';

	let logoImg;

	const cards = [
		{
			landingSrc: '/cards/pics/zl-production.jpg',
			logoSrc: '/cards/logos/production.svg',
			logoAlt: 'zl production logo',
			desc: '<span>ZL PRODUCTION</span> &mdash; organizace vlastních koncertů, festivalů a turné, stejně jako dílčí i celkové <span>produkce významných společenských akcí</span> na klíč za podpory našich dalších divizí ZL Technical Rental, ZL Studio a ZL Booking, které společně tvoří <span>komplexní řešení</span> pro jakéhokoliv klienta v rámci jedné produkce.',
			bottom:
				'Reference: Majáles Hradec Králové / Praha / Brno / Ostrava, Rock for People, RockIn, Monster Meeting, Kryštof kemp…'
		},
		{
			landingSrc: '/cards/pics/zl-events.jpg',
			logoSrc: '/cards/logos/events.svg',
			logoAlt: 'zl events logo',
			desc: '<span>ZL EVENTS</span> &mdash; zajištění specifických <span>korporátních</span>, sportovních i dalších <span>speciálních eventů</span>, jako jsou zaměstnanecké akce, firemní oslavy televizní přenosy nebo módní přehlídky. Významnou součástí naší činnosti jsou akce v <span>O2 areně</span>, O2 Universu a Fóru Karlín, kde patříme mezi <span>ověřené dodavatele</span> nejen techniky, ale i komplexních eventových řešení na klíč.',
			bottom:
				'Reference: Prague Playoffs, Česká Spořitelna, Allianz Pojišťovna, M&M Reality, Rádio Blaník'
		},
		{
			landingSrc: '/cards/pics/zl-booking.jpg',
			logoSrc: '/cards/logos/booking.svg',
			logoAlt: 'zl booking logo',
			desc: '<span>ZL BOOKING</span> &mdash; objednejte si <span>exkluzivně zastupované interprety</span> pro váš veřejný i soukromý event <span>online</span> nebo prostřednictvím našich booking agentů, kteří vám díky svým zkušenostem a kontaktům pomohou se sestavením <span>kvalitního a funkčního programu</span>.',
			bottom:
				'Výhradně zastupujeme: Kryštof, Dymytry, Martina Pártlová, Arakain, Traktor, Helenine Oči'
		},
		{
			landingSrc: '/cards/pics/zl-rental.jpg',
			logoSrc: '/cards/logos/rental.svg',
			logoAlt: 'zl rental logo',
			desc: '<span>ZL TECHNICAL RENTAL</span> &mdash; technická produkce a zajištění <span>audiovizuální techniky</span> pro eventy, špičková indoor i outdoor pódia a pronájem <span>značkového riderového</span> vybavení (zvuk, světla, stage, rigging, video, SFX) včetně realizace s využitím <span>nejmodernějších technologií</span> a vysoce profesionálního technického týmu #zlfamily.',
			bottom:
				'Reference: O2 Arena (Kryštof, Jelen, Michal David, Olympic, Millennium Explosion…), O2 Universum (Katerina Marie Tichá, Kool and the gang, Harlej 360…), The Culture, České Hrady, Mostecká Slavnost, Mělnické Vinobraní, Manowar European tour<br/><br/>Značky: Robe, Adamson, TAF, GrandMA, DiGiCo, Yamaha, Shure…'
		},
		{
			landingSrc: '/cards/pics/zl-base.jpg',
			logoSrc: '/cards/logos/base.svg',
			logoAlt: 'zl base logo',
			desc: '<span>ZL BASE</span> &mdash; 10&nbsp;000&nbsp;m<sup>²</sup> společného zázemí ZL Production, ZL Rental a ZL Studio nabízí sklad plný špičkové AV techniky, prostory pro zkoušení, kreativní studio s nejmodernějším vybavením pro stage design a programming, ideální pro vznik projektů od prvních návrhů až po kompletní přípravu a realizaci.'
		},
		{
			landingSrc: '/cards/pics/zl-studio.jpg',
			logoSrc: '/cards/logos/studio.svg',
			logoAlt: 'zl studio logo',
			desc: '<span>ZL SHOWDESIGN STUDIO</span> &mdash; kreativní prostor pro vznik návrhů a konceptů, tvorbu stage designu, programování obsahu a přípravu audiovizuálních show, ve kterém náš mladý a talentovaný tým pracuje s nejmodernějším vybavením a technologiemi, k dispozici i pro vás',
			bottom:
				'Reference: The Culture, Kateřina Marie Tichá, Jelen, Kryštof, Mikolas Josef, Panoptiko, Trautenberk, Harlej'
		}
	];
</script>

<div id="stage-is-ours" bind:this={logoImg}>
	<StatsGrid
		columns="repeat(4, 1fr)"
		maxWidth="80%"
		items={[
			{ value: 3500, label: 'odbavených eventů' },
			{ value: 99, label: 'pracovních dnů<br/>v O2&nbsp;areně' },
			{ value: 577, label: 'světel (převážně Robe)' },
			{ value: 328, label: 'reproboxů Adamson' }
		]}
	/>
	<div class="cards-wrapper">
		{#each cards as card}
			<SectionCard {...card} />
		{/each}
	</div>
</div>

<style>
	#stage-is-ours {
		min-height: 100vh;
		height: auto;
	}

	.cards-wrapper {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		justify-items: center;

		gap: calc(2 * var(--general-px));
		padding: 0 var(--general-px);
		margin-top: 2rem;
	}

	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.cards-wrapper {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* iPhone 15 and smaller (≤ 430px) */
	@media (max-width: 430px) {
		.cards-wrapper {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
