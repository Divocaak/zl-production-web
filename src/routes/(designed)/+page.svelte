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

<Hero
	logoSrc={'/logos/logo-horizontal-dark.svg'}
	taglines={[
		'Žijeme ve světe speciálních eventů, už 20 let.',
		'Produkčně i technicky zajišťujeme významné společenské události. ',
		'Realizujeme projekty od malých sálů přes O2 arenu až po stadiony. ',
		'Exkluzivně zastupujeme významné české a slovenské interprety.',
		'Tvoříme a odbavujeme korporátní akce, prezentace a konference.',
		'Pronajímáme nejmodernější značkovou techniku podium / zvuk / světla / video / sfx.',
		'Máme ten nejlepší tým na světě.'
	]}
	stageIsOurs={true}
	parallaxImages={[
		'/homepage/uvodky/uvod1.jpg',
		'/homepage/uvodky/uvod2.jpg',
		'/homepage/uvodky/uvod3.jpg',
		'/homepage/uvodky/uvod4.jpg',
		'/homepage/uvodky/uvod5.jpg',
		'/homepage/uvodky/uvod6.jpg',
		'/homepage/uvodky/uvod7.jpg'
	]}
/>
<StageIsOurs />
<BlogReferences />
<Studio />
<!-- <Equipment /> -->
<Booking />
<Family />
<History />
