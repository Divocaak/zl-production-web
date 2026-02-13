<script>
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	export let trigger = false;

	/* BUG optimalization */

	let loadingOverlay;
	let logo;
	let tagline;

	const text = 'Žijeme ve světe speciálních eventů';

	async function animateHero() {
		await tick();

		if (!loadingOverlay || !logo || !tagline) return;

		const heroTimeline = gsap.timeline({
			delay: 0.2,
			ease: 'power2.out',
			onStart: () => {
				gsap.to(loadingOverlay, {
					opacity: 0,
					duration: 0.3
				});
			}
		});

		heroTimeline.from(logo, { autoAlpha: 0, scale: 0.8, duration: 1, ease: 'power2.out' });

		tagline.innerHTML = text
			.split('')
			.map((char) => `<span>${char}</span>`)
			.join('');
		const letters = tagline.querySelectorAll('span');

		heroTimeline.from(letters, {
			opacity: 0,
			y: 10,
			stagger: 0.05,
			duration: 0.4
		});
	}

	$: if (trigger) {
		animateHero();
	}
</script>

<div id="loading-overlay" bind:this={loadingOverlay}>
	<div class="loading-dot"></div>
</div>

<div class="hero-content">
	<img src="/logos/logo-horizontal-dark.svg" alt="Logo" bind:this={logo} class="logo" />
	<p class="tagline" bind:this={tagline}></p>
</div>

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

		pointer-events: all;
		opacity: 1;
		transition: opacity 0.8s ease;
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

	.hero-content {
		position: absolute;
		inset: 0;

		text-align: center;
		pointer-events: none;
		z-index: 10;

		width: 100%;
		height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.logo {
		display: block;
		max-width: 70%;
		width: 100%;
		margin: 0 auto;
		filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
	}

	.tagline {
		margin-top: 1rem;
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		white-space: pre;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
