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
			{ value: 3500, label: 'odbavených eventů' },
			{ value: 99, label: 'dnů v O2 Aréně' },
			{ value: 1445, label: 'Svítidel (převážně ROBE)' },
			{ value: 328, label: 'Reproboxů Adamson' }
		]}
	/>
	<div class="cards-wrapper">
		<SectionCard
			landingSrc="/reference/01.jpg"
			logoSrc="/logos/logo-horizontal-dark.svg"
			logoAlt="zl production logo"
			tagline="Organizace koncertů, festivalů, turné a produkce"
			desc="Naše původní činnost je dodnes hlavním pilířem společnosti, ve kterém se přirozeně propojují všechny naše služby. Zajišťujeme produkci projektů od ticketingu přes marketing až po catering, tvorbu programu, stage design, kreativitu ZL studia i dodání vlastního technického zajištění a plnou organizaci a koordinaci na místě.<br/><br/>Díky propojení všech složek pod jednou střechou dokážeme řídit celý projekt efektivně, flexibilně a s maximální kontrolou nad kvalitou i výsledkem s minimálním zapojení dodavatelů."
			references="Majáles, Rock for People, Monster Meeting, Kryštof Kemp, RockIn"
		/>
		<SectionCard
			landingSrc="/reference/015.jpg"
			logoSrc="/logos/zl-events-dark.svg"
			logoAlt="zl events logo"
			tagline="Realizace korporátních, společenských, sportovních a dalších akcí"
			desc="Prostředí speciálních eventů je naším přirozeným světem. Připravujeme a realizujeme nebo se podílíme produkčně či technicky na akcích všech typů od komorních setkání, televizních přenosů až po velké mezinárodní projekty v nejprestižnějších prostorách.<br/><br/>Jako specialisté na O2 arenu, O2 universum, Forum Karlín a další typické lokace dokážeme zúročit naše dlouholeté zkušenosti i komplexní portfolio služeb a dodat řešení přesně na míru každému klientovi."
			references="Prague Playoffs, Allianz, Česká spořitelna, Molson Coors, Prosperity"
		/>
		<SectionCard
			landingSrc="/reference/06.jpg"
			logoSrc="/logos/zl-rental-dark.svg"
			logoAlt="zl rental logo"
			tagline="Technické zajištění a pronájem špičkového AV vybavení"
			desc="Od roku 2010 budujeme rozsáhlé portfolio moderních technologií a vlastní tým pro odbavení hudebních produkcí a živých akcí všech velikostí včetně O2 areny. Disponujeme riderovým vybavením předních světových výrobců pro zvuk, světla, video, rigging i zastřešení.<br/><br/>Připravíme rychlé a efektivní odbavení od menších eventů až po velké koncerty a festivaly případně i s odbavením, zpracováním návrhů, designu, obsahu a programování ZL studiu. Partnerským firmám poskytujeme podporu v podobě dry-hire značkového vybavení Adamson, DiGiCo, Yamaha, Shure, Robe, GrandMA."
			references="Kryštof na Strahově, O2 arena (Jelen, Michal David, Dymytry, Jiří Korn), evropské turné Manowar, VELO stage Majáles, The Culture, České Hrady, Konopiště Blaník"
		/>
	</div>
	<div class="cards-wrapper">
		<SectionCard
			landingSrc="/reference/09.jpg"
			logoSrc="/logos/zl-backstage-dark.svg"
			logoAlt="zl backstage logo"
			tagline="Zázemí, kde v se plánují projekty a zakázky a kde se připravuje technický setup"
			desc="ZL Backstage je unikátní prostor o rozloze více než 10 000 m², který propojuje sklad techniky, produkční zázemí i kreativní část včetně ZL studia. Slouží pro přípravu, plánování, programování i řízení projektů.<br/><br/>Díky nevyčerpatelnému vlastnímu technickému vybavení na ploše 3 500 m² dokážeme okamžitě ověřovat návrhy, optimalizovat řešení a připravit každou show s maximální kvalitou, efektivitou a jistotou. Disponujeme vlastní kamionovou dopravou, špičkovým vybavením i stabilním týmem, a jsme tak schopni dodávat komplexní řešení bez závislosti na externích dodavatelích."
			references="všechny naše realizované projekty :)"
		/>
		<SectionCard
			landingSrc="/reference/018.jpg"
			logoAlt="zl studio logo"
			logoSrc="/logos/zl-studio-dark.svg"
			tagline="Kreativní prostor pro tvorbu stage designu a audiovizuálních show"
			desc="ZL studio je místem, kde vzniká vizuální a kreativní podoba našich projektů. Navrhujeme stage design, vytváříme obsah a programujeme kompletní audiovizuální show.<br/><br/>Díky propojení se skladem a technologiemi dokážeme návrhy okamžitě testovat, ladit a převádět do reálné podoby. Studio zároveň nabízíme i interpretům a jejich týmům jako prostor pro zkoušky a finální přípravu show."
			references="Jelen, Kryštof, Dymytry, Kateřina Marie Tichá, Manowar, Majáles, The Culture"
		/>
		<SectionCard
			landingSrc="/reference/018.jpg"
			logoAlt="zl booking logo"
			logoSrc="/logos/zl-booking-dark.svg"
			tagline="Zastoupení interpretů a booking pro firemní i veřejné akce"
			desc="Zastupujeme přední české i zahraniční interprety a zajišťujeme jejich booking pro různé typy akcí od firemních eventů až po velké koncerty a festivaly.<br/><br/>Díky našemu online systému si obratem ověříte dostupnost, případně najdete vhodnou alternativu bez zbytečného čekání."
			references="Kryštof, Dymytry, Martina Pártlová, Arakain, Traktor, Helenine Oči"
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
