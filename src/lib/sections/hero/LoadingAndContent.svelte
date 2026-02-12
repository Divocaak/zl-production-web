<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	export let trigger = false;

	let loadingOverlay;
	let logo;
	let tagline;

	const text = 'Žijeme ve světe speciálních eventů';

	function animateHero() {
		const heroTimeline = gsap.timeline({
			delay: 0.2,
			ease: 'power2.out',
			onStart: () => {
				gsap.to(loadingOverlay, { opacity: 0, duration: 0.3 });
			}
		});

		heroTimeline.from(logo, { autoAlpha: 0, scale: 1, duration: 1 });
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

	// run animation once the trigger turns true
	$: if (trigger) {
		animateHero();
	}
</script>

{#if !trigger}
	<div id="loading-overlay" bind:this={loadingOverlay}>
		<div class="loading-dot"></div>
	</div>
{/if}

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
