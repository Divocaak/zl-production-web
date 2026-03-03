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
			desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam ante. Nam sed tellus id magna elementum tincidunt. <span>festivaly, korporáty, turné</span> Quisque tincidunt scelerisque libero. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
		/>
		<SectionCard
			landingSrc="/reference/015.jpg"
			logoSrc="/logos/zl-studio-dark.svg"
			desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam ante. Nam sed tellus id magna elementum tincidunt. Quisque tincidunt scelerisque libero. <span>návrhy, zázemí, technika, stagedesign</span> Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
		/>
		<SectionCard
			landingSrc="/reference/06.jpg"
			logoSrc="/logos/zl-basecamp-dark.svg"
			desc="Lorem ipsum <span>technika - prvotřídní</span> dolor sit amet, consectetuer adipiscing elit. Aliquam ante. Nam sed tellus id magna elementum tincidunt. Quisque tincidunt scelerisque libero. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
		/>
	</div>
	<div class="cards-wrapper smaller">
		<SectionCard
			landingSrc="/reference/09.jpg"
			logoSrc="/logos/zl-booking-dark.svg"
			desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. <span>zastupujeme CZ kapely</span> Aliquam ante. Nam sed tellus id magna elementum tincidunt. Quisque tincidunt scelerisque libero. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
		/>
		<SectionCard
			landingSrc="/reference/018.jpg"
			logoAlt="zl catering logo"
			logoSrc="/logos/zl-catering-dark.svg"
			desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. <span>catering</span> Aliquam ante. Nam sed tellus id magna elementum tincidunt. Quisque tincidunt scelerisque libero. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
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
