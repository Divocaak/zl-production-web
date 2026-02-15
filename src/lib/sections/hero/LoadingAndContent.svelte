<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import { gsap } from 'gsap';
	export let trigger = false;

	let loadingOverlay;
	let logo;
	let tagline;

	const image = '/logos/logo-horizontal-dark.svg';
	const text = 'Žijeme ve světe speciálních eventů';

	let tl;
	let hasAnimated = false;

	async function animateHero() {
		if (hasAnimated) return;
		hasAnimated = true;

		await tick();
		if (!loadingOverlay || !logo || !tagline) return;

		new Image().src = image;

		const fragment = document.createDocumentFragment();
		text.split('').forEach((char) => {
			const span = document.createElement('span');
			span.textContent = char;
			fragment.appendChild(span);
		});
		tagline.innerHTML = '';
		tagline.appendChild(fragment);
		const letters = gsap.utils.toArray(tagline.querySelectorAll('span'));

		tl = gsap.timeline({
			delay: 1,
			ease: 'power2.out'
		});

		tl.to(loadingOverlay, { autoAlpha: 0, duration: 0.3 });
		tl.from(logo, { autoAlpha: 0, scale: 0.8, duration: 1, ease: 'power2.out' });
		tl.from(letters, {
			autoAlpha: 0,
			y: 10,
			stagger: 0.05,
			duration: 0.4
		});
	}

	onDestroy(() => {
		tl?.kill();
	});

	$: if (trigger) animateHero();
</script>

<div id="loading-overlay" bind:this={loadingOverlay}>
	<img src="/sticker.svg" alt="loading sticker" />
</div>
<div class="hero-content">
	<img
		src="/logos/logo-horizontal-dark.svg"
		alt="Logo"
		bind:this={logo}
		class="logo"
		loading="eager"
	/>
	<p class="tagline" bind:this={tagline}></p>
</div>

<style>
	#loading-overlay {
		position: absolute;
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
		opacity: 1;
		transition: opacity 0.8s ease;
	}

	#loading-overlay img {
		width: 25%;
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
