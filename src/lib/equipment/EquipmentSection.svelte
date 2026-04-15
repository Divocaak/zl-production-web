<script>
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import FlexContent from '$lib/FlexContent.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import MaskedImage from '$lib/MaskedImage.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ExpandableText from '$lib/ExpandableText.svelte';

	export let section;

	let items = [];

	let ctx;
	onMount(() => {
		ctx = gsap.context(() => {
			items.forEach((item) => {
				const heading = item.querySelector('h2');
				const text = item.querySelector('p');
				const link = item.querySelector('.link-wrapper');
				const image = item.querySelector('.masked-image');

				gsap
					.timeline({
						scrollTrigger: {
							trigger: item,
							start: 'top 70%',
							end: 'bottom 30%'
						},
						defaults: {
							duration: 0.6,
							ease: 'power3.out'
						}
					})
					.from([heading, text, link], {
						y: 40,
						opacity: 0,
						stagger: 0.08,
						clearProps: 'all'
					})
					.from(
						image,
						{
							scale: 1.1,
							opacity: 0,
							clearProps: 'all'
						},
						0
					);
			});
		});
	});

	onDestroy(() => {
		ctx?.revert();
	});
</script>

<LogoHeading src={section.logo} alt="section logo" />
<div class="equipment-wrapper">
	<div class="section-text">
		{#each section.homepageCard.desc as txt}
			<p>{@html txt}</p>
		{/each}
	</div>
	{#each section.categories as item, i}
		<div class="gsap-wrapper" bind:this={items[i]}>
			<FlexContent alternated={i % 2 != 0}>
				<div class="equipment-content alternated" slot="left">
					<h2>{item.heading}</h2>
					{#if item.tagline}<p class="zl-tagline">{item.tagline}</p>{/if}
					{#if Array.isArray(item.desc)}
						{#each item.desc as part}
							<p>{@html part}</p>
						{/each}
					{:else}
						<p>{@html item.desc}</p>
					{/if}
					<div class="link-wrapper">
						<!-- <HanddrawnLink href="/rental">Poptat dostupnost</HanddrawnLink> -->
						<HanddrawnLink href="mailto:office@zlproduction.cz">Poptat dostupnost</HanddrawnLink>
					</div>
				</div>
				<div class="img-wrapper" slot="right">
					<MaskedImage src="/equipment/{item.image}" alt="equipment image" width="60%" />
				</div>
			</FlexContent>
		</div>
	{/each}
</div>

<style>
	.equipment-wrapper {
		display: flex;
		flex-direction: column;
		gap: 5rem;
		margin-top: 5rem;
	}

	.section-text{
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0 10%;
	}

	h2 {
		color: var(--zl-red);
		text-transform: uppercase;
	}

	:global(.equipment-content p span) {
		color: var(--zl-red);
		font-weight: bolder;
	}

	.equipment-content h2 {
		text-align: center;
	}

	.equipment-content .link-wrapper {
		text-align: center;
		margin-top: 4rem;
	}

	.equipment-content {
		will-change: transform, opacity;
	}
</style>
