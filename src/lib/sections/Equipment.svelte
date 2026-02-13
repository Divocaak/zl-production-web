<script>
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import EquipmentColumn from '$lib/EquipmentColumn.svelte';
	import splashSound from '$lib/assets/splashes/0.svg?raw';
	import splashLights from '$lib/assets/splashes/2.svg?raw';
	import splashVideo from '$lib/assets/splashes/1.svg?raw';
</script>

<section id="equipment">
	<div class="wrapper">
		<EquipmentColumn
			fill="var(--tech-yellow)"
			splashSvg={splashSound}
			sectionLogo="logos/equipment/zl-sound-dark.svg"
			logos={[
				'logos/equipment/partners/adamson.svg',
				'logos/equipment/partners/digico.svg',
				'logos/equipment/partners/shure.svg',
				'logos/equipment/partners/yamaha.svg'
			]}
		/>
		<EquipmentColumn
			fill="var(--punch-pink)"
			splashSvg={splashLights}
			sectionLogo="logos/equipment/zl-lights-dark.svg"
			logos={[
				'logos/equipment/partners/chamsys.svg',
				'logos/equipment/partners/robe.svg',
				'logos/equipment/partners/ma.svg',
				'logos/equipment/partners/astera.svg'
			]}
		/>
		<EquipmentColumn
			fill="var(--stage-blue)"
			splashSvg={splashVideo}
			sectionLogo="logos/equipment/zl-video-dark.svg"
			logos={['logos/equipment/partners/blackmagic.svg', 'logos/equipment/partners/novastar.svg']}
		/>
	</div>
	<div class="link">
		<HanddrawnLink href="">Rent</HanddrawnLink>
	</div>
</section>

<style>
	#equipment {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;

		gap: 3rem;
	}

	.wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.link {
		width: 100%;
		text-align: center;
	}

	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.wrapper {
			flex-direction: column;
			gap: 4rem;
		}
	}
</style>
