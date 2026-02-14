<script>
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import SectionWrapper from './SectionWrapper.svelte';

	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import FlexContent from '$lib/FlexContent.svelte';

	let sectionEl;
	let contentEl;
	let zoo0, zoo1, zoo2, zoo3, zoo4, zoo5, zoo6;

	let tl;

	function preloadZooImages() {
		const sources = [
			'/zoo/lights.svg',
			'/zoo/production-alt.svg',
			'/zoo/rigging-alt.svg',
			'/zoo/sound.svg',
			'/zoo/stage.svg',
			'/zoo/video.svg',
			'/zoo/yoda.svg'
		];

		sources.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	}

	onMount(() => {
		preloadZooImages();
		gsap.set(contentEl, { autoAlpha: 0, y: 40 });
		const zooEls = [zoo0, zoo1, zoo2, zoo3, zoo4, zoo5, zoo6].filter(Boolean);
		const rotations = zooEls.map(() => gsap.utils.random(-15, 15));

		tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 50%',
				end: 'bottom 90%',
				scrub: 0.5
			}
		});

		tl.to(contentEl, {
			autoAlpha: 1,
			y: 0,
			duration: 0.8,
			ease: 'power3.out'
		});

		tl.from(zooEls, {
			scale: 0,
			autoAlpha: 0,
			y: 20,
			rotation: (i) => rotations[i],
			duration: 0.6,
			stagger: 0.3,
			ease: 'back.out(1.4)'
		});
	});

	onDestroy(() => {
		if (tl) {
			tl.scrollTrigger?.kill();
			tl.kill();
		}
	});
</script>

<SectionWrapper id="family">
	<div bind:this={sectionEl}>
		<FlexContent>
			<div slot="left" class="media">
				<img class="base" src="family.jpg" alt="#zlfamily group" />
				<img
					bind:this={zoo0}
					class="zoo"
					style="top: 0%; left: 95%;"
					src="/zoo/lights.svg"
					alt="Lights Parrot"
				/>
				<img
					bind:this={zoo1}
					class="zoo"
					style="top: 5%; left: 50%;"
					src="/zoo/production-alt.svg"
					alt="Production Octopus"
				/>
				<img
					bind:this={zoo2}
					class="zoo"
					style="top: 35%; left: -5%;"
					src="/zoo/rigging-alt.svg"
					alt="Rigging Ant"
				/>
				<img
					bind:this={zoo3}
					class="zoo"
					style="top: 90%; left: 67%; width:16%"
					src="/zoo/sound.svg"
					alt="Sound Chimp"
				/>
				<img
					bind:this={zoo4}
					class="zoo"
					style="top: 90%; left: 10%; width: 20%"
					src="/zoo/stage.svg"
					alt="Stage Rhino"
				/>
				<img
					bind:this={zoo5}
					class="zoo"
					style="top: 95%; left: 100%;"
					src="/zoo/video.svg"
					alt="Video Chameleon"
				/>
				<img
					bind:this={zoo6}
					class="zoo"
					style="top: 80%; left: 37%; width:20%"
					src="/zoo/yoda.svg"
					alt="Yoda Chimp"
				/>
			</div>

			<div slot="right" class="content" bind:this={contentEl}>
				<LogoHeading src="/logos/zl-family-dark.svg" alt="#zlfamily logo" />
				<p>
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis sapien nunc, commodo et,
					interdum suscipit, sollicitudin et, dolor. Integer malesuada. Donec vitae arcu. Nullam
					eget nisl. Praesent vitae arcu tempor neque lacinia pretium. Curabitur sagittis hendrerit
					ante. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
					laboriosam, nisi ut aliquid ex ea commodi consequatur? Fusce dui leo, imperdiet in,
					aliquam sit amet, feugiat eu, orci. Etiam dictum tincidunt diam. Donec vitae arcu. Duis
					sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Cras elementum. Nulla
					pulvinar eleifend sem. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat.
				</p>
				<HanddrawnLink href="#">Celý tým</HanddrawnLink>
			</div>
		</FlexContent>
	</div>
</SectionWrapper>

<style>
	.media {
		aspect-ratio: 16 / 9;
	}

	.media .base {
		width: 100%;
		height: auto;
		display: block;
	}

	.media .zoo {
		position: absolute;
		width: 18%;
		height: auto;
		pointer-events: none;
		transform: translate(-50%, -50%);
	}

	.media .zoo {
		transform-origin: '50% 50%';
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
		transition: transform 0.2s ease;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.media .zoo,
	.content {
		will-change: transform, opacity;
	}
</style>
