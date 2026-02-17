<script>
	import HanddrawnLink from './buttons/HanddrawnLink.svelte';
	import FlexContent from './FlexContent.svelte';
	import LogoHeading from './LogoHeading.svelte';
	import MaskedImage from './MaskedImage.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
							end: 'bottom 30%',
							scrub: 0.5
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

	function composeMailtoHref(itemName) {
		const email = 'rental@zlproduction.cz';
		const subject = encodeURIComponent(`Dostupnost ${itemName}`);
		const body = encodeURIComponent(
			`Dobrý den,
    
prosím o informace o dostupnosti vybavení:
- ${itemName}

v termínu:
dd. mm. yyyy

Prosím, zašlete cenovou nabídku.
    
Děkuji a přeji hezký den`
		);

		return `mailto:${email}?subject=${subject}&body=${body}`;
	}
</script>

<div class="wrapper">
	<LogoHeading src="/logos/equipment/{section.logo}" alt="section logo" />
	<div class="equipment-wrapper">
		{#each section.items as item, i}
			<div class="gsap-wrapper" bind:this={items[i]}>
				<FlexContent alternated={i % 2 != 0}>
					<div class="equipment-content alternated" slot="left">
						<h2>{item.heading}</h2>
						<p>{@html item.desc}</p>
						<div class="link-wrapper">
							<HanddrawnLink href={composeMailtoHref(item.heading)}>Poptat dostupnost</HanddrawnLink
							>
						</div>
					</div>
					<div class="img-wrapper" slot="right">
						<MaskedImage
							src="/equipment/{item.image}"
							alt="equipment image"
							widthPercent={60}
						/>
					</div>
				</FlexContent>
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		margin-top: 10rem;
		padding: 0 8rem;
	}

	.equipment-wrapper {
		display: flex;
		flex-direction: column;
		gap: 5rem;
		margin-top: 5rem;
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
