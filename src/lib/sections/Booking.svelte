<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import SectionWrapper from './SectionWrapper.svelte';
	import FlexContent from '$lib/FlexContent.svelte';
	import MaskedImage from '$lib/MaskedImage.svelte';

	let sectionEl;
	let imgA, imgB;
	let active = 'A';
	let index = 0;
	let swapInterval;

	const images = ['/booking/krystof.jpg', '/booking/dymytry.jpg', '/booking/partlova.jpg'];

	const swapImages = () => {
		index = (index + 1) % images.length;
		const nextImg = active === 'A' ? imgB : imgA;
		const currentImg = active === 'A' ? imgA : imgB;

		nextImg.src = images[index];
		gsap.set(nextImg, { opacity: 0, scale: 1.05 });
		gsap.to(nextImg, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
		gsap.to(currentImg, { opacity: 0, duration: 0.8, ease: 'power2.out' });

		active = active === 'A' ? 'B' : 'A';
	};

	onMount(() => {
		if (!imgA || !imgB || !sectionEl) return;

		images.forEach((src) => (new Image().src = src));

		// ---------- SCROLL-TRIGGER controlling visibility ----------
		const st = ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => (swapInterval = setInterval(swapImages, 4000)),
			onLeave: () => clearInterval(swapInterval),
			onEnterBack: () => (swapInterval = setInterval(swapImages, 4000)),
			onLeaveBack: () => clearInterval(swapInterval)
		});

		// ---------- REVEAL TIMELINE ----------
		const doodles = sectionEl.querySelectorAll('.doodle');
		const textItems = sectionEl.querySelectorAll('.content, .lead');

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 50%',
				end: 'bottom 90%',
				scrub: 0.5
			}
		});
		tl.from([...doodles, ...textItems], {
			opacity: 0,
			y: 20,
			duration: 0.4,
			stagger: 0.2
		});
	});

	onDestroy(() => {
		clearInterval(swapInterval);
		ScrollTrigger.getAll().forEach((st) => st.kill());
	});
</script>

<SectionWrapper id="booking">
	<LogoHeading src="/logos/zl-booking-dark.svg" alt="booking logo" maxWidthPx="550" />
	<div class="wrapper" bind:this={sectionEl}>
		<FlexContent>
			<div slot="left" class="content">
				<p class="lead">
					Kdo bude hrát na Vaší další akci <img src="/doodles/question.svg" alt="question mark" />
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam commodo dui eget wisi.
					Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus. Donec iaculis gravida
					nulla. Phasellus faucibus molestie nisl. Sed ut perspiciatis unde omnis iste natus error
					sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
					illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed vel
					lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Etiam ligula pede,
					sagittis quis, interdum ultricies, scelerisque eu. Nemo enim ipsam voluptatem quia
					voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
					ratione voluptatem sequi nesciunt. Aliquam erat volutpat. Nulla quis diam. Mauris
					tincidunt sem sed arcu.
				</p>
				<HanddrawnLink href="https://www.zlbooking.cz/" target="_blank">Navštívit</HanddrawnLink>
			</div>

			<div slot="right" class="masked-container">
				<MaskedImage
					bind:imageEl={imgA}
					src={images[0]}
					alt="Booking band"
					parallax={true}
					floating={true}
				/>

				<MaskedImage
					bind:imageEl={imgB}
					src={images[1]}
					alt="Booking band"
					parallax={true}
					floating={true}
				/>

				<img src="/doodles/arrow.svg" class="doodle" alt="" />
				<img src="/doodles/heart.svg" class="doodle" alt="" />
			</div>
		</FlexContent>
	</div>
</SectionWrapper>

<style>
	.doodle {
		position: absolute;
		width: 120px;
		height: auto;
		pointer-events: none;

		will-change: transform, opacity;
	}

	.wrapper {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.content {
		display: flex;
		flex-direction: column;
	}

	.lead {
		font-size: var(--text-36);
		line-height: 1.4;
	}

	.lead img {
		height: 5em;
		width: auto;
		vertical-align: -1.4em;
		margin-left: -1.5em;
	}

	.masked-container {
		aspect-ratio: 1 / 1;
		position: relative;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
	}

	.masked-container > :global(.masked-container) {
		position: absolute;
		inset: 0;
	}

	.masked-container .doodle:first-of-type {
		top: 70%;
	}

	.masked-container .doodle:last-of-type {
		top: 5%;
		left: 80%;
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		.masked-container {
			max-width: 70%;
			margin: 0 auto;
		}
	}
</style>
