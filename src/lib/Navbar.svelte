<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	import SubtleLink from './buttons/SubtleLink.svelte';
	import splashSvgRaw from '$lib/assets/splashes/0.svg?raw';
	import menuSplashSvgRaw from '$lib/assets/splashes/2.svg?raw';

	let menuShown = false;
	const toggleMenu = () => (menuShown = !menuShown);

	let previousY = 0;
	let navVisible = false;

	let hasUserScrolled = false;
	const ACTIVATION_THRESHOLD = 40;

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

			const scrollingUp = currentY < previousY;
			const nearTop = currentY <= 10;

			navVisible = scrollingUp || nearTop;
			previousY = currentY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if navVisible}
	<nav transition:fade={{ duration: 250 }}>
		<button class="menu-button" on:click={toggleMenu}>
			<span class="splash" aria-hidden="true">
				{@html splashSvgRaw}
			</span>

			{#if !menuShown}
				<img transition:fade class="icon" src="/icons/hamburger.svg" alt="hamburger icon" />
			{:else}
				<img transition:fade class="icon" src="/icons/cross.svg" alt="close icon" />
			{/if}
		</button>
		{#if menuShown}
			<div class="small-nav-bg" transition:fade={{ duration: 200 }}>
				<span class="splash" aria-hidden="true">
					{@html menuSplashSvgRaw}
				</span>
				<div class="small-nav">
					<SubtleLink on:click={toggleMenu} href="/#about">O nás</SubtleLink>
					<SubtleLink on:click={toggleMenu} href="/#reference">Reference</SubtleLink>
					<SubtleLink on:click={toggleMenu} href="/#booking">Booking</SubtleLink>
					<SubtleLink on:click={toggleMenu} href="/#studio">Studio</SubtleLink>
					<SubtleLink on:click={toggleMenu} href="/#family">Family</SubtleLink>
					<SubtleLink on:click={toggleMenu} href="/#equipment">Technika</SubtleLink>
				</div>
			</div>
		{/if}
	</nav>
{/if}

<style>
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
	}

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

	.splash {
		position: absolute;
		inset: -20%;
		width: 140%;
		height: 140%;
		object-fit: contain;

		pointer-events: none;
		z-index: 0;

		fill: var(--zl-red);
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
	}

	.menu-button .splash {
		transform: rotate(90deg);
	}

	.menu-button .icon {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 28px;
		height: 28px;
		display: block;
	}

	.small-nav-bg {
		position: absolute;

		top: 100%;
		right: 3%;
	}

	.small-nav {
		height: 100%;

		display: flex;
		flex-direction: column;
        align-items: center;

		font-size: 2rem;
	}

	.small-nav-bg .splash {
		inset: -60%;
		width: 220%;
		height: 220%;
	}
</style>
