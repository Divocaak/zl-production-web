<script>
	import StatsGrid from '$lib/StatsGrid.svelte';
	import SectionWrapper from './SectionWrapper.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import FlexContent from '$lib/FlexContent.svelte';

	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import SubtleLink from '$lib/buttons/SubtleLink.svelte';
	import VideoModalButton from '$lib/videoModal/VideoModalButton.svelte';

	let content;
	let sinceImg;

	let tl;
	onMount(() => {
		if (!content) return;

		const paragraphs = content.querySelectorAll('p');
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: content,
				start: 'top 60%',
				end: 'bottom 90%',
				scrub: 0.5
			}
		});
		tl.from(paragraphs, {
			y: 50,
			autoAlpha: 0,
			duration: 1,
			ease: 'power2.out',
			stagger: 0.2
		}).from(
			sinceImg,
			{
				y: 20,
				autoAlpha: 0,
				duration: 1,
				ease: 'power2.out'
			},
			'+=3'
		);
	});

	onDestroy(() => {
		tl?.kill();
	});
</script>

<SectionWrapper id="historie">
	<FlexContent>
		<div slot="left" class="content">
			<StatsGrid
				items={[
					{ value: 20, label: 'zkušeností v oboru', unit: 'let' },
					{ value: 50, label: 'stálých zaměstnanců' },
					{ value: 3500, label: 'skladu moderní techniky', unit: 'm<sup>2</sup>' },
					{ value: 100, label: 'designového studia', unit: 'm<sup>2</sup>' }
				]}
			/>
			<img bind:this={sinceImg} class="since" src="/since.svg" alt="Since 2005" />
		</div>
		<div slot="right" class="content" bind:this={content}>
			<p>
				Před pětadvaceti lety jsme se potkali. DJ z plzeňského vysokoškolského baru a holka s
				diskotékou v Herálci. Oba s nadšením pro společenský život, zábavu, hudbu, koncerty. Každý z
				nás kromě sebe přinesl i ty správné lidi. Kamarády a rodinné příslušníky, kteří nám pomáhali
				s prvními koncerty v Plzni a na Vysočině, s turné Olympicu, Divokýho Billa, Horkýže Slíže
				nebo s produkcí Rock for People či Majálesu.
			</p>
			<p>
				Takové byly naše začátky: euforie, nadšení, kamarádství a radost z práce, která nás postupně
				začala živit a zároveň zůstala koníčkem i zábavou plnou emocí a nezapomenutelných zážitků.
				Právě tehdy, v partě náhodně potkaných nadšenců, vznikly hodnoty #zlfamily a později i malá
				rodinná firma ZL Production s.r.o.
			</p>
			<p>
				Do roku 2010 jsme fungovali jako produkční firma dvou lidí s telefonem, počítačem, spoustou
				snů, chutí je naplňovat se skvělými lidmi kolem nás. V roce 2010 jsme si pro radost pořídili
				první světla, v roce 2012 jsme k produkci přidali první halovou techniku a v roce 2015 jsme
				technicky i produkčně odbavili první O2 arenu, která je dodnes naším druhým domovem.
			</p>
			<p>
				Právě tam, stejně jako na největších open air festivalech a dalších eventech, které
				realizujeme s vlastní technikou i produkcí, si nejvíce uvědomujeme, jak velkou cestu jsme za
				těch 25 let společného života a 20 let existence firmy urazili. I když nebyla vždy
				jednoduchá ani radostná, jsme oba vděční za skvělé lidi v #zlfamily i za samotnou činnost ZL
				Production s.r.o.
			</p>
			<p>
				Svým způsobem jsme si v této práci a jejím rozvoji našli smysl života, který nás naplňuje a
				skrze který se snažíme zkvalitňovat náš obor a obohacovat ho o projekty, které by bez nás
				možná nepřinesly tolik zážitků, energie, emocí a radosti, jež jsou s naší prací spjaty.
			</p>
			<p>
				Pokud vás zajímá celý příběh, zpracovali jsme ho pro hosty oslavy 20 let ve Foru Karlín:
				<SubtleLink href="https://www.zl20.cz/" target="_blank">www.zl20.cz</SubtleLink>
			</p>
			<p>Jan Lippert a Jana (Zelenková) Lippertová</p>
		</div>
	</FlexContent>
	<VideoModalButton imageThumbnailSrc="/history/thumbnail.jpg" />
</SectionWrapper>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}

	.since {
		width: 50%;
		margin: 0 auto;
	}

	img,
	p,
	.content {
		will-change: transform, opacity;
	}
</style>
