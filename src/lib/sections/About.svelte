<script>
	import NumberBoxes from '$lib/NumberBoxes.svelte';
	import SectionWrapper from './SectionWrapper.svelte';

	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import LogoHeading from '$lib/LogoHeading.svelte';

	gsap.registerPlugin(ScrollTrigger);

	let content;

	onMount(() => {
		if (!content) return; // make sure content exists

		const headingImg = content.querySelector('img:first-of-type');
		const paragraph = content.querySelector('p');
		const sinceImg = content.querySelector('img:last-of-type');

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: headingImg,
				start: 'top center',
				toggleActions: 'play none none none'
			}
		});

		tl.from(headingImg, {
			y: -50,
			opacity: 0,
			duration: 1,
			ease: 'power2.out'
		})
		.from(paragraph, {
			y: 50,
			opacity: 0,
			duration: 1,
			ease: 'power2.out'
		}, "+=0.2")
		.from(sinceImg, {
			y: 20,
			opacity: 0,
			duration: 1,
			ease: 'power2.out'
		}); 
	});
</script>

<SectionWrapper id="about">
	<div class="wrapper">
		<NumberBoxes />
		<div class="content" bind:this={content}>
			<LogoHeading src="/hashtags/stage-is-ours-dark.svg" alt="Stage Is Ours" />
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
			<img src="/since.svg" alt="Since 2005" />
		</div>
	</div>
</SectionWrapper>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 50%;
	}

	p {
		padding: 2rem 0;
	}
</style>
