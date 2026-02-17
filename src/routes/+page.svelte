<script>
	import Hero from '$lib/sections/Hero.svelte';
	import About from '$lib/sections/About.svelte';
	import Booking from '$lib/sections/Booking.svelte';
	import Equipment from '$lib/sections/Equipment.svelte';
	import Family from '$lib/sections/Family.svelte';
	import Studio from '$lib/sections/Studio.svelte';
	import VideoReferences from '$lib/sections/VideoReferences.svelte';
	import { onMount } from 'svelte';
	import ScrollTrigger from 'gsap/ScrollTrigger';

	onMount(() => {
		const hash = window.location.hash;
		if (!hash) return;

		setTimeout(() => {
			const el = document.querySelector(hash);
			if (!el) return;

			if (window.__smoother) {
				window.__smoother.scrollTo(el, false);
			} else {
				el.scrollIntoView({ behavior: 'auto' });
			}
			ScrollTrigger.refresh();
		}, 0);
	});
</script>

<div style="height:100vh"></div>
<!-- <Hero />
<About />
<VideoReferences /> -->
<Booking />
<!-- <Studio />
<Family />
<Equipment /> -->
<div style="height:100vh"></div>