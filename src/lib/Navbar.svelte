<script>
	import { onDestroy, onMount, tick } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import SubtleLink from './buttons/SubtleLink.svelte';
	import splashSvgRaw from '$lib/assets/splashes/0.svg?raw';
	import menuSplashSvgRaw from '$lib/assets/splashes/2.svg?raw';

	let menuShown = false;
	const toggleMenu = async () => {
		menuShown = !menuShown;
		await tick();
	};

	let previousY = 0;
	let navVisible = false;

	let hasUserScrolled = false;
	const ACTIVATION_THRESHOLD = 40;

	let ticking = false;

	onMount(() => {
		previousY = window.scrollY;

		const handleScroll = () => {
			const currentY = Math.max(0, window.scrollY);

			if (!hasUserScrolled) {
				if (currentY > ACTIVATION_THRESHOLD) {
					hasUserScrolled = true;
					previousY = currentY;
				}
				return;
			}

			if (!ticking) {
				requestAnimationFrame(() => {
					const scrollingUp = currentY < previousY;
					const nearTop = currentY <= 10;

					navVisible = scrollingUp || nearTop;
					previousY = currentY;
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class:visible={navVisible}>
	<button class="menu-button" on:click={toggleMenu}>
		<span class="splash" aria-hidden="true">{@html splashSvgRaw}</span>

		<img
			class="icon hamburger"
			src="/icons/hamburger.svg"
			alt="hamburger icon"
			class:visible={!menuShown}
		/>

		<img class="icon cross" src="/icons/cross.svg" alt="close icon" class:visible={menuShown} />
	</button>

	{#if menuShown}
		<div class="small-nav-bg">
			<span
				class="splash"
				aria-hidden="true"
				in:fade={{ duration: 150 }}
				out:fade={{ duration: 100 }}>{@html menuSplashSvgRaw}</span
			>
			<div class="small-nav">
				<SubtleLink on:click={toggleMenu} href="/#about">O nás</SubtleLink>
				<SubtleLink on:click={toggleMenu} href="/#reference">Reference</SubtleLink>
				<SubtleLink on:click={toggleMenu} href="/#booking">Booking</SubtleLink>
				<SubtleLink on:click={toggleMenu} href="/#studio">Studio</SubtleLink>
				<SubtleLink on:click={toggleMenu} href="/#family">Family</SubtleLink>
				<SubtleLink on:click={toggleMenu} href="/#technika">Technika</SubtleLink>
			</div>
		</div>
	{/if}
</nav>

<style>
	/* --- Navbar Container --- */
	nav {
		position: fixed;
		top: env(safe-area-inset-top);
		left: 0;
		right: 0;

		display: flex;
		align-items: center;
		justify-content: flex-end;

		width: calc(100% - 1rem);
		padding: 0.5rem;
		z-index: 1000;

		transform: translateY(-100%);
		opacity: 0;
		transition:
			transform 0.25s ease,
			opacity 0.25s ease;
		will-change: transform, opacity;
	}

	nav.visible {
		transform: translateY(0);
		opacity: 1;
	}

	/* --- Menu Button --- */
	.menu-button {
		all: unset;
		position: relative;
		cursor: pointer;
		display: grid;
		place-items: center;

		width: 56px;
		height: 56px;
		touch-action: manipulation;
	}

	.menu-button .splash {
		position: absolute;
		inset: -20%;
		width: 140%;
		height: 140%;
		object-fit: contain;
		pointer-events: none;
		z-index: 0;

		fill: var(--zl-red);
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6));

		transform: rotate(90deg);
		will-change: transform, opacity;
	}

	.menu-button .icon {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 28px;
		height: 28px;
		display: block;
		transition: opacity 0.2s ease;
		will-change: opacity;

		pointer-events: all;

		opacity: 0;
		transform: scale(0.9);
		transition: all 0.2s ease;
	}

	.menu-button .icon.visible {
		opacity: 1;
		transform: scale(1);
	}

	.menu-button:hover .icon.visible {
		transform: rotate(3deg) scale(1.15);
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
	}

	/* --- Small Nav --- */
	.small-nav-bg {
		position: absolute;
		top: 100%;
		right: 3%;
	}

	.small-nav-bg .splash {
		position: absolute;
		inset: -60%;
		width: 220%;
		height: 220%;
		fill: var(--zl-red);

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6));

		pointer-events: none;
	}

	.small-nav {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 2rem;
	}
</style>
