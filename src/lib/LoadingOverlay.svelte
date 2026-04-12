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
			onComplete: () => {
				loadingOverlay?.remove();
			}
		});
	});

	$: {
		if (trigger && tl && !hasAnimated) {
			hasAnimated = true;
			tl.play();
		}
	}

	onDestroy(() => {
		tl?.kill();
	});
</script>

<div id="loading-overlay" bind:this={loadingOverlay}>
	<div class="content-wrapper">
		<img class="text" src="/loading/text.svg" alt="loading text" />
		<img class="monkey" src="/loading/monkey.svg" alt="loading sticker" />
	</div>
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

	.content-wrapper {
		position: relative;
		width: 50%;

		display: flex;
		flex-direction: column;
		gap: 5rem;
		align-items: center;
	}

	#loading-overlay .text {
		max-width: 75%;
		animation: loadIn 2.2s ease-in-out infinite alternate;
	}

	#loading-overlay .monkey {
		max-width: 75%;
		animation: pulse 1s infinite alternate;
		will-change: transform, opacity;
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		.content-wrapper {
			width: 75%;
		}
		#loading-overlay .text {
			max-width: 100%;
		}
	}

	@keyframes pulse {
		from {
			opacity: 0.8;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes loadIn {
		0% {
			filter: blur(10px) brightness(2.2) contrast(0.5);
			opacity: 0.5;
		}

		35% {
			opacity: 1;
			filter: blur(6px) brightness(1.8) contrast(0.8);
		}

		70% {
			filter: blur(1px) brightness(1.2) contrast(1);
		}

		100% {
			filter: blur(0px) brightness(1) contrast(1);
			opacity: 1;
		}
	}
</style>
