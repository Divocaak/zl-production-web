<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	export let trigger;

	let visible = true;
	let logo;
	let tagline;
	let timeline;

	const taglineText = 'Žijeme ve světe speciálních eventů';

	onMount(() => {
		timeline = gsap.timeline({ paused: true, ease: 'power2.out' });

		timeline.from(logo, { autoAlpha: 0, scale: 1, duration: 1 });

		const letters = tagline.querySelectorAll('span');
		timeline.from(letters, {
			opacity: 0,
			y: 10,
			stagger: 0.05,
			duration: 0.4
		});
	});

	$: if (trigger && timeline) {
		gsap.to('#loading-overlay', { autoAlpha: 0, duration: 0.3 });
		visible = false;
		timeline.play();
	}
</script>

{#if visible}
	<div id="loading-overlay">
		<div class="loading-dot"></div>
	</div>
{/if}

<div class="hero-content">
	<img src="/logos/logo-horizontal-dark.svg" alt="Logo" bind:this={logo} class="logo" />
	<p class="tagline" bind:this={tagline}>
		{#each taglineText.split('') as char}
			<span>{char}</span>
		{/each}
	</p>
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
