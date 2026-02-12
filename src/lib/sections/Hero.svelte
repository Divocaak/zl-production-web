<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let loadingOverlay;
	let container;
	let maskSvg;
	let triggerHero = false;

	import splash0 from '$lib/assets/splashes/0.svg?raw';
	import splash1 from '$lib/assets/splashes/1.svg?raw';
	import splash2 from '$lib/assets/splashes/2.svg?raw';
	import splash3 from '$lib/assets/splashes/3.svg?raw';
	import splash4 from '$lib/assets/splashes/4.svg?raw';
	import LoadingAndContent from '$lib/sections/hero/LoadingAndContent.svelte';

	const splashes = [splash0, splash1, splash2, splash3, splash4];
	const transforms = [
		{ x: -0.1, y: -0.1, scale: 1 },
		{ x: 0.6, y: 0.25, scale: 1 },
		{ x: 0.6, y: 0.1, scale: 1 },
		{ x: 0, y: -0.17, scale: 1 },
		{ x: 0.7, y: 0.5, scale: 0.5 }
	];

	function resizeMask() {
		if (!maskSvg || !container) return;
		const w = container.offsetWidth;
		const h = container.offsetHeight;

		maskSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
		const rect = maskSvg.querySelector('#splash-mask rect');
		if (rect) {
			rect.setAttribute('width', w);
			rect.setAttribute('height', h);
		}

		const splashGroups = maskSvg.querySelectorAll('.splash');
		splashGroups.forEach((g, i) => {
			const { x, y, scale } = transforms[i];
			const px = x * w;
			const py = y * h;
			g.setAttribute('transform', `translate(${px} ${py}) scale(${scale})`);
		});
	}

	function extractInner(svg) {
		return svg.replace(/<svg[^>]*>/, '').replace('</svg>', '');
	}

	onMount(() => {
		resizeMask();
		window.addEventListener('resize', resizeMask);

		const layers = container.querySelectorAll('.layer');

		const ctx = gsap.context(() => {
			layers.forEach((layer, i) => {
				const t = i / (layers.length - 1);
				const depth = gsap.utils.interpolate(30, 200, t * t);

				gsap.fromTo(
					layer,
					{ y: depth },
					{
						y: -depth,
						ease: 'none',
						scrollTrigger: {
							trigger: container,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
							invalidateOnRefresh: true
						},
						modifiers: { y: (y) => Math.min(0, parseFloat(y)) + 'px' }
					}
				);
			});

			const splashGroups = maskSvg.querySelectorAll('.splash');
			splashGroups.forEach((g, i) => {
				gsap.to(g, {
					x: '+=10',
					y: '+=10',
					yoyo: true,
					repeat: -1,
					duration: 3 + i * 0.5,
					ease: 'sine.inOut'
				});
			});

			triggerHero = true;
		}, container);

		return () => {
			ctx.revert();
			window.removeEventListener('resize', resizeMask);
		};
	});
</script>

<div class="masked-parallax">
	<svg class="mask-svg" bind:this={maskSvg} preserveAspectRatio="xMidYMid slice">
		<defs>
			<mask id="splash-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
				<rect fill="black" />
				{#each splashes as splash}
					<g fill="white" class="splash">
						{@html extractInner(splash)}
					</g>
				{/each}
			</mask>
		</defs>
	</svg>

	<div bind:this={container} class="parallax masked">
		<img src="/homepage/landing/full.png" alt="" class="layer" />
		<img src="/homepage/landing/v4.png" alt="" class="layer" />
		<img src="/homepage/landing/v3.png" alt="" class="layer" />
		<img src="/homepage/landing/v2.png" alt="" class="layer" />
		<img src="/homepage/landing/v1.png" alt="" class="layer" />
	</div>

	<LoadingAndContent trigger={triggerHero} />
</div>

<style>
	.masked {
		mask: url(#splash-mask);
		-webkit-mask: url(#splash-mask);
		mask-size: 100% 100%;
		-webkit-mask-size: 100% 100%;
		mask-repeat: no-repeat;
	}

	.mask-svg {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0;
	}

	.masked-parallax {
		position: relative;
	}

	.parallax {
		position: relative;
		height: 120vh;
		overflow: hidden;
	}

	.layer {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 120%;
		object-fit: cover;
		will-change: transform;
		pointer-events: none;
		backface-visibility: hidden;
		transform: translateZ(0);
	}
</style>
