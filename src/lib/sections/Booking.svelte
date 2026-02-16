<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import SectionWrapper from './SectionWrapper.svelte';
	import FlexContent from '$lib/FlexContent.svelte';

	let sectionEl;
	let imgA, imgB;
	let scrollY = 0;
	let floatX = 0;
	let floatY = 0;
	let active = 'A';
	let index = 0;
	let swapInterval;

	const images = ['/booking/krystof.jpg', '/booking/dymytry.jpg', '/booking/partlova.jpg'];

	let setXA, setYA, setXB, setYB;

	const applyTransform = () => {
		setXA(floatX);
		setYA(scrollY + floatY);
		setXB(floatX);
		setYB(scrollY + floatY);
	};

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

		setXA = gsap.quickSetter(imgA, 'x', 'px');
		setYA = gsap.quickSetter(imgA, 'y', 'px');
		setXB = gsap.quickSetter(imgB, 'x', 'px');
		setYB = gsap.quickSetter(imgB, 'y', 'px');

		// ---------- FLOATING IMAGE ANIMATION (paused until visible) ----------
		const floatAnim = gsap.to(
			{},
			{
				duration: 12,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				paused: true,
				onUpdate: () => {
					floatY = Math.sin(gsap.ticker.time * 0.8) * 4;
					floatX = Math.cos(gsap.ticker.time * 0.6) * 3;
					applyTransform();
				}
			}
		);

		// ---------- SCROLL-TRIGGER controlling visibility ----------
		const st = ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => {
				floatAnim.play();
				swapInterval = setInterval(swapImages, 4000);
			},
			onLeave: () => {
				floatAnim.pause();
				clearInterval(swapInterval);
			},
			onEnterBack: () => {
				floatAnim.play();
				swapInterval = setInterval(swapImages, 4000);
			},
			onLeaveBack: () => {
				floatAnim.pause();
				clearInterval(swapInterval);
			},
			onUpdate: (self) => {
				scrollY = gsap.utils.interpolate(0, -80, self.progress);
				applyTransform();
			}
		});

		// ---------- REVEAL TIMELINE ----------
		const doodles = sectionEl.querySelectorAll('.doodle');
		const textItems = sectionEl.querySelectorAll('.content, .lead');

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 50%',
				end: 'bottom 90%',
				scrub: .5
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
				<div class="mask">
					<img bind:this={imgA} class="masked-image image-a" src={images[0]} alt="Booking band" />
					<img bind:this={imgB} class="masked-image image-b" src={images[1]} alt="Booking band" />
				</div>
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
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .4));
	}

	.masked-container .doodle:first-of-type {
		top: 70%;
	}

	.masked-container .doodle:last-of-type {
		top: 5%;
		left: 80%;
	}

	.mask {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;

		-webkit-mask-image: url('/splashes/2.svg');
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		-webkit-mask-size: contain;

		mask-image: url('/splashes/2.svg');
		mask-repeat: no-repeat;
		mask-position: center;
		mask-size: contain;
	}

	.masked-image {
		position: absolute;
		inset: -5%;
		width: 110%;
		height: 110%;
		object-fit: cover;
		will-change: transform, opacity;
	}

	.image-a {
		opacity: 1;
	}

	.image-b {
		opacity: 0;
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		.masked-container {
			max-width: 70%;
			margin: 0 auto;
		}
	}
</style>
