<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let bindContainer;
	export let maskId = 'splash-mask';

	const layers = [
		'/homepage/landing/full.png',
		'/homepage/landing/v4.png',
		'/homepage/landing/v3.png',
		'/homepage/landing/v2.png',
		'/homepage/landing/v1.png'
	];

	let st;

	function preloadImages(urls) {
		urls.forEach((url) => {
			const img = new Image();
			img.src = url;
		});
	}

	onMount(() => {
		if (!bindContainer) return;
		preloadImages(layers);

		const wrappers = bindContainer.querySelectorAll('.layer-wrapper');
		const depths = Array.from(wrappers).map((_, i) =>
			gsap.utils.interpolate(30, 200, Math.pow(i / (wrappers.length - 1), 2))
		);

		let raf;
		st = ScrollTrigger.create({
			trigger: bindContainer,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,
			invalidateOnRefresh: true,
			onUpdate: (self) => {
				const progress = self.progress;
				if (!raf) {
					raf = requestAnimationFrame(() => {
						wrappers.forEach((wrapper, i) => {
							const depth = depths[i];
							wrapper.style.transform = `translate3d(0, ${depth - progress * 2 * depth}px, 0)`;
						});
						raf = null;
					});
				}
			}
		});
	});

	onDestroy(() => {
		if (st) st.kill();
	});
</script>

<div
	bind:this={bindContainer}
	class="parallax masked"
	style="mask: url(#{maskId}); -webkit-mask: url(#{maskId}); mask-repeat: no-repeat; mask-size: 100% 100%; -webkit-mask-size: 100% 100%;"
>
	{#each layers as layer}
		<div class="layer-wrapper">
			<img src={layer} alt="" class="layer" loading="eager" />
		</div>
	{/each}
</div>

<style>
	.parallax {
		position: absolute;
		inset: 0;
		height: 120vh;
		overflow: hidden;
		transform-style: preserve-3d;
	}

	.layer-wrapper {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 120%;
		will-change: transform;
	}

	.layer {
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
		backface-visibility: hidden;
		transform: translateZ(0);
	}
</style>
