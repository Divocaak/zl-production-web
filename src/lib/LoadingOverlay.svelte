<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';

	export let trigger = false;

	let loadingOverlay;
	let tl;
	let hasAnimated = false;

	onMount(async () => {
		await tick();
		if (!loadingOverlay) return;

		tl = gsap.timeline({ paused: true });
		tl.to(loadingOverlay, {
			autoAlpha: 0,
			duration: 1,
			ease: 'power2.out',
			force3d: true,
			onComplete: () => loadingOverlay.remove()
		});
	});

	$: if (trigger && tl && !hasAnimated) {
		hasAnimated = true;
		tl.play();
	}

	onDestroy(() => {
		tl?.kill();
	});
</script>

<div id="loading-overlay" bind:this={loadingOverlay}>
	<img src="/sticker.svg" alt="loading sticker" />
</div>

<style>
	#loading-overlay {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100vh;

		background-image: url('/bordel/bordel-soft.svg'), linear-gradient(180deg, #111, #222);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

		z-index: 9999;

		display: flex;
		align-items: center;
		justify-content: center;

		pointer-events: all;

		will-change: opacity;
		transform: translateZ(0);
	}

	#loading-overlay[style*='opacity: 0'] img {
		animation-play-state: paused;
	}

	#loading-overlay img {
		width: 25%;
		animation: pulse 1s infinite alternate;
		will-change: transform, opacity;
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
</style>
