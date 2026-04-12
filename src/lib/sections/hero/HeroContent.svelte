<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { heroIndex } from '$lib/stores/heroCycle';

	export let trigger = false;
	export let image;
	export let heading;
	export let taglines = [];
	export let hasButton = false;

	let logo;
	let taglineEl;

	let tl;
	let hasAnimated = false;

	let logoTl;
	let logoAnimated = false;

	let unsubscribe;

	function renderTagline(text) {
		if (!taglineEl) return;

		taglineEl.innerHTML = '';

		const fragment = document.createDocumentFragment();

		for (const char of text) {
			const span = document.createElement('span');
			span.textContent = char;
			fragment.appendChild(span);
		}

		taglineEl.appendChild(fragment);

		return taglineEl.querySelectorAll('span');
	}

	function animate(letters) {
		if (tl) tl.kill();

		tl = gsap.timeline();

		if (letters?.length) {
			tl.from(letters, {
				autoAlpha: 0,
				y: 10,
				stagger: 0.02,
				duration: 0.2,
				ease: 'power2.out'
			});
		}

		if (trigger && !hasAnimated) {
			hasAnimated = true;
			tl.play();
		}
	}

	function animateLogoOnce() {
		if (logoAnimated || !logo) return;

		logoAnimated = true;

		logoTl = gsap.from(logo, {
			autoAlpha: 0,
			scale: 0.8,
			duration: 1,
			ease: 'power2.out'
		});
	}

	let initialized = false;
	let isStatic = false;
	onMount(() => {
		unsubscribe = heroIndex.subscribe((i) => {
			if (!taglines.length) return;

			if (!initialized) {
				isStatic = taglines.length === 1;
				initialized = true;

				animateLogoOnce();

				const text = taglines[0];
				const letters = renderTagline(text);
				animate(letters);

				return;
			}

			if (isStatic) return;

			const text = taglines[i % taglines.length];
			const letters = renderTagline(text);
			animate(letters);
		});
	});

	onDestroy(() => {
		unsubscribe?.();
		tl?.kill();
		logoTl?.kill();
	});
</script>

<div class="hero-content" class:has-button={hasButton}>
	{#if image}
		<div class="logo-wrapper">
			<img src={image} alt="Logo" bind:this={logo} class="logo" loading="eager" />
		</div>
	{/if}
	{#if heading}
		<h1 class="zl-text heading">{heading}</h1>
	{/if}
	<p class="zl-tagline" bind:this={taglineEl}></p>
</div>

<style>
	.hero-content {
		position: absolute;
		inset: 0;

		text-align: center;
		pointer-events: none;
		z-index: 10;

		width: calc(100% - (2 * (--general-px)));
		height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 0 var(--general-px);
	}

	.hero-content.has-button {
		gap: 300px;
	}

	.logo-wrapper {
		width: 60%;
	}

	.logo {
		display: block;
		width: 100%;
		margin: 0 auto;
		filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
	}

	.heading {
		font-size: var(--text-96);
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		.logo-wrapper {
			width: 100%;
		}
	}
</style>
