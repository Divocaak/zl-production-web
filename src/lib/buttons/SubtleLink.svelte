<script>
	import gsap from 'gsap';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

	gsap.registerPlugin(ScrollToPlugin);

	export let href;
	export let target = '_self';

	// height of pinned section in pixels (adjust if you have sticky header or pinned GSAP section)
	/* const pinnedOffset = 1500; */

	function handleClick(event) {
		if (href.startsWith('/#')) {
			event.preventDefault();

			const targetId = href.slice(2);
			const el = document.getElementById(targetId);

			if (!el) return;
			const top = el.getBoundingClientRect().top + window.scrollY;// - pinnedOffset;

			gsap.to(window, {
				scrollTo: { y: top },
				duration: 0.8,
				ease: 'power1.out'
			});
		}
	}
</script>

<a {href} {target} rel="noopener noreferrer" class="subtle-link" on:click={handleClick}>
	<slot />
</a>

<style>
	.subtle-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;

		color: var(--white);
		text-decoration: none;
		font-weight: 500;
		letter-spacing: 0.02em;

		opacity: 0.9;
		transition: all 0.2s ease;

		cursor: pointer;
	}

	.subtle-link:hover {
		opacity: 1;
		transform: translateY(-1px);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.subtle-link:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 3px;
	}
</style>
