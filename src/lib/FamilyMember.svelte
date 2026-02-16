<script>
	import IconLink from './buttons/IconLink.svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	import MaskedImage from './MaskedImage.svelte';

	export let member;
	export let animal;

	let wrapper;
	let animalEl;
	let imageEl;

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: 'power3.out' },
				scrollTrigger: {
					trigger: wrapper,
					start: 'top 70%',
					end: 'bottom 85%',
					scrub: 0.2
				}
			});

			tl.from(wrapper, { autoAlpha: 0 })
				.from(
					imageEl,
					{
						scale: 1.1,
						y: 20,
						duration: 1
					},
					0
				)
				.from(
					animalEl,
					{
						x: -40,
						autoAlpha: 0,
						rotate: -20,
						duration: 0.8
					},
					0.1
				);
		}, wrapper);

		return () => ctx.revert();
	});
</script>

<div class="wrapper" bind:this={wrapper}>
	<MaskedImage bind:imageEl src="family/{member.img}" alt="member headshot">
		<img bind:this={animalEl} src="/zoo/{animal}" class="animal" alt="" />
	</MaskedImage>
	<p>{member.name}</p>
	<p>{member.position}</p>
	<p>{member.desc}</p>
	{#if member.tel}
		<IconLink href={member.tel} svgPath="icons/phone.svg">{member.tel}</IconLink>
	{/if}
	{#if member.email}
		<IconLink href={member.email} svgPath="icons/email.svg">{member.email}</IconLink>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-content: center;
		margin: 2rem;
		will-change: opacity;
	}

	.animal {
		position: absolute;
		height: 120px;
		width: auto;
		pointer-events: none;

		will-change: transform, opacity;
		top: 50%;
		left: -10%;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6));

		will-change: transform, opacity;
	}

	.wrapper p {
		margin: 0;
		text-align: center;
	}

	.wrapper p:first-of-type {
		color: var(--zl-red);
		text-transform: uppercase;
		font-weight: bold;
		font-size: var(--text-36);
		letter-spacing: 0.05em;

		margin-top: 1.5rem;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));
	}

	.wrapper p:nth-of-type(2) {
		color: var(--tech-yellow);
		text-transform: uppercase;
		font-weight: bolder;
	}

	.wrapper p:nth-of-type(3) {
		margin: 0.8rem 0;
	}
</style>
