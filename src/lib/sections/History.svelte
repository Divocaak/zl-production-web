<script>
	import NumberBoxes from '$lib/NumberBoxes.svelte';
	import SectionWrapper from './SectionWrapper.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import FlexContent from '$lib/FlexContent.svelte';

	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let content;
	let sinceImg;

	let tl;
	onMount(() => {
		if (!content) return;

		const paragraph = content.querySelector('p');
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: content,
				start: 'top 60%',
				end: 'bottom 90%',
				scrub: 0.5
			}
		});
		tl.from(paragraph, { y: 50, autoAlpha: 0, duration: 1, ease: 'power2.out' }).from(
			sinceImg,
			{
				y: 20,
				autoAlpha: 0,
				duration: 1,
				ease: 'power2.out'
			},
			'+=3'
		);
	});

	onDestroy(() => {
		tl?.kill();
		ScrollTrigger.getAll().forEach((t) => t.kill());
	});
</script>

<SectionWrapper id="historie">
	<FlexContent>
		<div slot="left" class="content">
			<NumberBoxes />
			<img bind:this={sinceImg} class="since" src="/since.svg" alt="Since 2005" />
		</div>
		<div slot="right" class="content" bind:this={content}>
			<p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis sapien nunc, commodo et,
				interdum suscipit, sollicitudin et, dolor. Integer malesuada. Donec vitae arcu. Nullam eget
				nisl. Praesent vitae arcu tempor neque lacinia pretium. Curabitur sagittis hendrerit ante.
				Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
				nisi ut aliquid ex ea commodi consequatur? Fusce dui leo, imperdiet in, aliquam sit amet,
				feugiat eu, orci. Etiam dictum tincidunt diam. Donec vitae arcu. Duis sapien nunc, commodo
				et, interdum suscipit, sollicitudin et, dolor. Cras elementum. Nulla pulvinar eleifend sem.
				Fusce tellus odio, dapibus id fermentum quis, suscipit id erat.
			</p>
		</div>
	</FlexContent>
	<div class="wrapper"></div>
</SectionWrapper>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}

	p {
		padding: 2rem 0;
	}

	.since {
		width: 50%;
		margin: 0 auto;
	}

	img,
	p,
	.content {
		will-change: transform, opacity;
	}
</style>
