<script>
	import FlexContent from '$lib/FlexContent.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import MaskedImage from '$lib/MaskedImage.svelte';

	import splashBgRaw from '$lib/assets/splashes/3.svg?raw';
	const splashBg = splashBgRaw.includes('preserveAspectRatio')
    ? splashBgRaw
    : splashBgRaw.replace(
        '<svg',
        '<svg preserveAspectRatio="xMidYMid slice"'
      );
</script>

<div class="wrapper">
	<div class="bg-svg">
		{@html splashBg}
	</div>
	<FlexContent>
		<div slot="right">
			<MaskedImage src="/reference/05.jpg" alt="reference image">
				<div class="logo-wrapper">
					<LogoHeading
						src="/logos/equipment/zl-sound-dark.svg"
						alt="zl sound logo"
						maxWidthPx="400"
						shadowOpacity="1"
					/>
				</div>
			</MaskedImage>
		</div>
		<div slot="left" class="texts-wrapper">
			<p class="lead">prvotřídní zvuk, který vás uchvátí</p>
			<p>
				Lorem ipsum dolor <span>Adamson VGt</span> sit amet, consectetuer adipiscing elit. Aliquam
				id dolor. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
				doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
				<span>DiGiCo</span>inventore veritatis et quasi architecto beatae vitae dicta sunt
				explicabo. Nulla pulvinar eleifend sem. Aenean vel massa quis mauris vehicula lacinia.
				Maecenas aliquet <span>LAB Gruppen PLM</span> accumsan leo. Sed convallis magna eu sem. Maecenas
				fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a
				lectus.
			</p>
		</div>
	</FlexContent>
</div>

<style>
	div {
		border: 1px solid red;
	}

	.wrapper {
		position: relative;
		padding: 0 8rem;
		overflow: visible;
	}

	:global(.bg-svg svg) {
		display: block;
		width: 100%;
		height: 100%;
		fill: var(--zl-red);
	}

	.bg-svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) translateZ(0);

        width: 100%;
		
		z-index: 0;
		pointer-events: none;
		will-change: transform;
	}

	.logo-wrapper {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.texts-wrapper .lead {
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		text-align: center;
		text-transform: uppercase;
	}

	.texts-wrapper p span {
		color: var(--zl-red);
		font-weight: bolder;
	}
</style>
