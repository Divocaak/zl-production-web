<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import splash0 from '$lib/assets/splashes/0.svg?raw';
	import splash1 from '$lib/assets/splashes/1.svg?raw';
	import splash2 from '$lib/assets/splashes/2.svg?raw';
	import splash3 from '$lib/assets/splashes/3.svg?raw';
	import splash4 from '$lib/assets/splashes/4.svg?raw';

	gsap.registerPlugin(ScrollTrigger);

	let loadingOverlay;
	let container;
	let maskSvg;
	let logo;
	let tagline;

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
						modifiers: {
							y: (y) => Math.min(0, parseFloat(y)) + 'px'
						}
					}
				);
			});

			// subtle splash animation
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

			const heroTimeline = gsap.timeline({
				delay: 1,
				ease: 'power2.out',
				onStart: () => {
					gsap.to(loadingOverlay, { opacity: 0, duration: 0.3 });
				}
			});

			heroTimeline.from(logo, { autoAlpha: 0, scale: 1, duration: 1 });
			const text = 'Žijeme ve světe speciálních eventů';
			tagline.innerHTML = text
				.split('')
				.map((char) => `<span>${char}</span>`)
				.join('');
			const letters = tagline.querySelectorAll('span');
			heroTimeline.from(letters, {
				opacity: 0,
				y: 10,
				stagger: 0.05, // delay between each letter
				duration: 0.4
			});
		}, container);

		return () => {
			ctx.revert();
			window.removeEventListener('resize', resizeMask);
		};
	});

	function extractInner(svg) {
		return svg.replace(/<svg[^>]*>/, '').replace('</svg>', '');
	}
</script>

<div id="loading-overlay" bind:this={loadingOverlay}>
	<div class="loading-dot"></div>
</div>

<div class="masked-parallax">
	<svg class="mask-svg" bind:this={maskSvg} preserveAspectRatio="xMidYMid slice">
		<defs>
			<mask id="splash-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
				<rect fill="black" />
				{#each splashes as splash, i}
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

	<div class="hero-content">
		<img src="/logos/logo-horizontal-dark.svg" alt="Logo" class="logo" bind:this={logo} />
		<p class="tagline" bind:this={tagline}></p>
	</div>
</div>

<div class="spacer">asdasd</div>
adasd
<div class="spacer">asdasd</div>
adasd
<div class="spacer">asdasd</div>
adasd

<style>
	#loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(180deg, #111, #222);
		z-index: 9999;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-dot {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--zl-red);
		animation: pulse 1s infinite alternate;
	}

	@keyframes pulse {
		from {
			opacity: 0.3;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1.2);
		}
	}

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

	.spacer {
		height: 1000px;
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
		top: 0;

		object-fit: cover;
		will-change: transform;
		pointer-events: none;

		backface-visibility: hidden;
		transform: translateZ(0);
	}

	.hero-content {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		pointer-events: none;
		z-index: 10;

		width: 100%;
	}

	.logo {
		display: block;
		max-width: 70%;
		width: 100%;
		margin: 0 auto;

		filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
	}

	.tagline {
		position: absolute;
		top: 120%;
		left: 50%;
		transform: translateX(-50%);

		margin-top: 1rem;
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		white-space: pre;

		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
