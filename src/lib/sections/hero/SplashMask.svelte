<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { gsap } from 'gsap';

	import splash0 from '$lib/assets/splashes/0.svg?raw';
	import splash1 from '$lib/assets/splashes/1.svg?raw';
	import splash2 from '$lib/assets/splashes/2.svg?raw';
	import splash3 from '$lib/assets/splashes/3.svg?raw';
	import splash4 from '$lib/assets/splashes/4.svg?raw';

	/* BUG optimalization */

	const splashes = [splash0, splash1, splash2, splash3, splash4];
	const transforms = [
		{ x: -0.1, y: -0.1, scale: 1 },
		{ x: 0.6, y: 0.25, scale: 1 },
		{ x: 0.6, y: 0.1, scale: 1 },
		{ x: 0, y: -0.17, scale: 1 },
		{ x: 0.7, y: 0.5, scale: 0.5 }
	];

	export let bindMask;

	const dispatch = createEventDispatcher();

	function extractInner(svg) {
		return svg.replace(/<svg[^>]*>/, '').replace('</svg>', '');
	}

	function resizeMask(container) {
		if (!bindMask || !container) return;
		const w = container.offsetWidth;
		const h = container.offsetHeight;

		bindMask.setAttribute('viewBox', `0 0 ${w} ${h}`);
		const rect = bindMask.querySelector('#splash-mask rect');
		if (rect) {
			rect.setAttribute('width', w);
			rect.setAttribute('height', h);
		}

		const splashGroups = bindMask.querySelectorAll('.splash');
		splashGroups.forEach((g, i) => {
			const { x, y, scale } = transforms[i];
			const px = x * w;
			const py = y * h;
			g.setAttribute('transform', `translate(${px} ${py}) scale(${scale})`);
		});
	}

	onMount(() => {
		// wait for the container to be passed via prop
		let container;
		const observer = new MutationObserver(() => {
			if (bindMask?.parentNode) {
				container = bindMask.parentNode.querySelector('.parallax');
				if (container) {
					resizeMask(container);

					// animate splashes
					const splashGroups = bindMask.querySelectorAll('.splash');
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

					// notify hero that splashes are ready
					dispatch('loaded');

					observer.disconnect();
				}
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });

		const handleResize = () => resizeMask(container);
		window.addEventListener('resize', handleResize);

		onDestroy(() => {
			window.removeEventListener('resize', handleResize);
		});
	});
</script>

<svg class="mask-svg" bind:this={bindMask} preserveAspectRatio="xMidYMid slice">
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

<style>
	.mask-svg {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0;
	}
</style>
