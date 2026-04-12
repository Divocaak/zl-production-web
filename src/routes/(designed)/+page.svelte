<script>
	import Hero from '$lib/sections/Hero.svelte';
	import History from '$lib/sections/History.svelte';
	import Booking from '$lib/sections/Booking.svelte';
	import Equipment from '$lib/sections/Equipment.svelte';
	import Family from '$lib/sections/Family.svelte';
	import Studio from '$lib/sections/Studio.svelte';
	import BlogReferences from '$lib/sections/BlogReferences.svelte';
	import { onMount } from 'svelte';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { page } from '$app/stores';
	import StageIsOurs from '$lib/sections/StageIsOurs.svelte';

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

<!-- <Hero
	logoSrc={'/logos/logo-horizontal-dark.svg'}
	tagline={'Žijeme ve světe eventů, už 20 let.'}
	stageIsOurs={true}
/> -->
<StageIsOurs />
<!-- <BlogReferences />
<Studio />
<Equipment />
<Booking />
<Family />
<History />
 -->