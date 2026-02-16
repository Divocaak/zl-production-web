<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import gsap from 'gsap';

	export let trigger = false;

	let logo;
	let tagline;
	let tl;
	let hasAnimated = false;

	const image = '/logos/logo-horizontal-dark.svg';
	const text = 'Žijeme ve světe speciálních eventů';

	onMount(async () => {
		await tick();
		if (!logo || !tagline) return;

		const img = new Image();
		img.src = image;

		const fragment = document.createDocumentFragment();
		for (const char of text) {
			const span = document.createElement('span');
			span.textContent = char;
			fragment.appendChild(span);
		}

		tagline.innerHTML = '';
		tagline.appendChild(fragment);

		const letters = gsap.utils.toArray(tagline.querySelectorAll('span'));

		tl = gsap.timeline({ paused: true });

		tl.from(logo, {
			autoAlpha: 0,
			scale: 0.8,
			duration: 1,
			ease: 'power2.out'
		}).from(
			letters,
			{
				autoAlpha: 0,
				y: 10,
				stagger: 0.05,
				duration: 0.4,
				ease: 'power2.out'
			},
			'-=0.4'
		);
	});

	$: if (trigger && tl && !hasAnimated) {
		hasAnimated = true;
		tl.play();
	}

	onDestroy(() => {
		tl?.kill();
	});
</script>

<div class="hero-content">
	<img
		src="{image}"
		alt="Logo"
		bind:this={logo}
		class="logo"
		loading="eager"
	/>
	<p class="tagline" bind:this={tagline}></p>
</div>

<style>
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
