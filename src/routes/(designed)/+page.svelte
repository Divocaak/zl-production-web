<script>
	import Hero from '$lib/sections/Hero.svelte';
	import History from '$lib/sections/History.svelte';
	import Booking from '$lib/sections/Booking.svelte';
	import Equipment from '$lib/sections/Equipment.svelte';
	import Family from '$lib/sections/Family.svelte';
	import Studio from '$lib/sections/Studio.svelte';
	import VideoReferences from '$lib/sections/VideoReferences.svelte';
	import { onMount } from 'svelte';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { page } from '$app/stores';
	import Stageisours from '$lib/sections/Stageisours.svelte';

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

	$: visible = $page.url.searchParams.get('dev') === 'true';
</script>

<!-- <div class="dev" class:visible>HERO</div>
<Hero />
<div class="dev" class:visible>STAGE IS OURS</div> -->
<Stageisours />
<!-- <div class="dev" class:visible>REFERENCE</div>
<VideoReferences />
<div class="dev" class:visible>BOOKING</div>
<Booking />
<div class="dev" class:visible>STUDIO</div>
<Studio />
<div class="dev" class:visible>FAMILY</div>
<Family />
<div class="dev" class:visible>RENTAL</div>
<Equipment />
<div class="dev" class:visible>HISTORIE</div>
<History />
<div class="dev" class:visible>FOOTER</div> -->

<style>
	.dev {
		border-top: 1px solid red;
		width: 100%;
		position: relative;
		display: none;
	}

	.visible {
		display: block;
	}
</style>
