<script>
	import FlippingCard from '$lib/flippingCard/FlippingCard.svelte';
	import SectionCard from '$lib/flippingCard/SectionCard.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import StatsGrid from '$lib/StatsGrid.svelte';

	let logoImg;
</script>

<div id="stage-is-ours" bind:this={logoImg}>
	<LogoHeading src="/hashtags/stage-is-ours-dark.svg" alt="Stage Is Ours" />
	<StatsGrid
		columns="repeat(4, 1fr)"
		maxWidth="80%"
		items={[
			{ value: 54, label: 'Akcí v 02 Aréně' },
			{ value: 20, label: 'Majálesů' },
			{ value: 120, label: 'Stálých klientů' },
			{ value: 19, label: 'Ocenění kvality' }
		]}
	/>
	<div class="cards-wrapper">
		<SectionCard
			landingSrc="/reference/01.jpg"
			logoSrc="/logos/logo-horizontal-dark.svg"
			logoAlt="zl production logo"
			desc="Organizace vlastních <span>koncertů</span>, <span>festivalů</span>, <span>turné</span> a <span>kompletní produkce</span> významných společenských akcí pro stálé klienty."
		/>
		<SectionCard
			landingSrc="/reference/015.jpg"
			logoSrc="/logos/zl-events-dark.svg"
			logoAlt="zl events logo"
			desc="Zajištění <span>korporátních</span>, <span>sportovních</span> a dalších <span>speciálních eventů</span>, kompletní produkce akcí v <span>O2 areně</span>."
		/>
		<SectionCard
			landingSrc="/reference/06.jpg"
			logoSrc="/logos/zl-rental-dark.svg"
			logoAlt="zl rental logo"
			desc="<span>Technické zajištění</span> akcí, pronájem <span>značkového riderového vybavení</span> a odbavení <span>profesionálním technickým týmem #zlfamily</span>."
		/>
	</div>
	<div class="cards-wrapper">
		<SectionCard
			landingSrc="/reference/09.jpg"
			logoSrc="/logos/zl-backstage-dark.svg"
			logoAlt="zl backstage logo"
			desc="Více než <span>10 000 m²</span> společného zázemí ZL Production, ZL Rental a ZL Studio nabízí <span>sklad plný techniky</span>, <span>prostory pro zkoušení</span>, <span>kreativní studio</span>, místo pro vznik těch nejlepších projektů od prvních návrhů až po kompletní projekt."
		/>
		<SectionCard
			landingSrc="/reference/018.jpg"
			logoAlt="zl studio logo"
			logoSrc="/logos/zl-studio-dark.svg"
			desc="<span>Kreativní prostor</span> pro tvorbu stage designu, programování obsahu a přípravu <span>audiovizuálních show</span>, kde pracuje náš mladý a talentovaný tým s tím <span>nejmodernějším audiovizuálním vybavením</span>."
		/>
		<SectionCard
			landingSrc="/reference/018.jpg"
			logoAlt="zl booking logo"
			logoSrc="/logos/zl-booking-dark.svg"
			desc="Objednejte si námi zastupované interprety <span>Kryštof</span>, <span>Dymytry</span>, <span>Martina Pártlová</span>, <span>Arakain</span>, <span>Traktor</span>, <span>Helenine Oči</span> a další online pro váš veřejný i soukromý event."
		/>
	</div>
</div>

<style>
	#stage-is-ours {
		min-height: 100vh;
	}

	.cards-wrapper {
		display: grid;
		grid-template-columns: repeat(3, 1fr);

		gap: 2rem;
		padding: 0 var(--general-px);

		margin-top: 2rem;
	}

	.cards-wrapper.smaller {
		grid-template-columns: repeat(2, max-content);
		justify-content: center;
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		.cards-wrapper,
		.cards-wrapper.smaller {
			display: flex;
			flex-direction: column;
		}
	}
</style>
