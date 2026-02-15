<script>
	import { createEventDispatcher } from 'svelte';
	import gsap from 'gsap';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

	export let href;
	export let target = '_self';

	const dispatch = createEventDispatcher();
	let scrollTween;

	// height of pinned section in pixels (adjust if you have sticky header or pinned GSAP section)
	/* const pinnedOffset = 1500; */

	function handleClick(event) {
		event.preventDefault();
		dispatch('click', event);
		
		/* <!-- BUG links not working from other pages --> */
		if (href.startsWith('/#')) {
			const targetId = href.slice(2);
			const el = document.getElementById(targetId);

			if (!el) return;
			const top = el.getBoundingClientRect().top + window.scrollY; // - pinnedOffset;

			gsap.killTweensOf(window);

			scrollTween = gsap.to(window, {
				scrollTo: { y: top },
				duration: 0.8,
				ease: 'power1.out'
			});
		} else {
			dispatch('click', event);
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
