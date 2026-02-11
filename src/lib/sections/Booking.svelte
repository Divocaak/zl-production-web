<script>
	import { onDestroy, onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/HanddrawnLink.svelte';
	import LogoHeading from '$lib/LogoHeading.svelte';
	import SectionWrapper from './SectionWrapper.svelte';

	gsap.registerPlugin(ScrollTrigger);

	let maskedImage;
	let sectionEl;

	let scrollY = 0;
	let floatY = 0;
	let floatX = 0;

	let isActive = false;
	let index = 0;
	let intervalId;
	let imgA;
	let imgB;
	let active = 'A';
	const images = ['/booking/krystof.jpg', '/booking/dymytry.jpg', '/booking/partlova.jpg'];

	onMount(() => {
		if (!imgA || !imgB || !sectionEl) return;

		const setXA = gsap.quickSetter(imgA, 'x', 'px');
		const setYA = gsap.quickSetter(imgA, 'y', 'px');
		const setXB = gsap.quickSetter(imgB, 'x', 'px');
		const setYB = gsap.quickSetter(imgB, 'y', 'px');

		const applyTransform = () => {
			setXA(floatX);
			setYA(scrollY + floatY);
			setXB(floatX);
			setYB(scrollY + floatY);
		};

		ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,
			onUpdate: (self) => {
				scrollY = gsap.utils.interpolate(0, -80, self.progress);
				applyTransform();
			},
			onEnter: () => (isActive = true),
			onLeave: () => (isActive = false),
			onEnterBack: () => (isActive = true),
			onLeaveBack: () => (isActive = false)
		});

		gsap.to(
			{},
			{
				duration: 12,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				onUpdate: () => {
					floatY = Math.sin(gsap.ticker.time * 0.8) * 4;
					floatX = Math.cos(gsap.ticker.time * 0.6) * 3;
					applyTransform();
				}
			}
		);

		intervalId = setInterval(() => {
			if (!isActive) return;

			index = (index + 1) % images.length;
			const nextImg = active === 'A' ? imgB : imgA;
			const currentImg = active === 'A' ? imgA : imgB;
			nextImg.src = images[index];

			gsap.set(nextImg, { opacity: 0, scale: 1.05 });

			gsap.to(nextImg, {
				opacity: 1,
				scale: 1,
				duration: 0.8,
				ease: 'power2.out'
			});

			gsap.to(currentImg, {
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out'
			});

			active = active === 'A' ? 'B' : 'A';
		}, 4000);

		const doodles = sectionEl.querySelectorAll('.doodle');
		const textItems = sectionEl.querySelectorAll('.content, .lead');

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 70%',
				end: 'bottom 70%',
				scrub: true
			}
		});

		// Fade in logo doodle
		tl.from(doodles[0], { opacity: 0, duration: 0.3 });
		// Fade in masked image doodles with slight delay
		tl.from(doodles[1], { opacity: 0, y: 20, duration: 0.4});
		tl.from(doodles[2], { opacity: 0, y: 20, duration: .4 });

		// Fade and slide in text
		textItems.forEach((el, i) => {
			tl.from(el, { opacity: 0, y: 20, duration: 0.4 }, i * 0.2);
		});
	});

	onDestroy(() => {
		clearInterval(intervalId);
		ScrollTrigger.getAll().forEach((st) => st.kill());
	});
</script>

<SectionWrapper id="booking">
    <!-- TODO export heading with doodle marks.svg -->
	<LogoHeading src="/logos/zl-booking-dark.svg" alt="booking logo" width="25%" />
	<div class="wrapper" bind:this={sectionEl}>
		<div class="content">
			<p class="lead">
				Kdo bude hrát na Vaší další akci <img src="/doodles/question.svg" alt="question mark" />
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam commodo dui eget wisi. Fusce
				consectetuer risus a nunc. Aliquam ornare wisi eu metus. Donec iaculis gravida nulla.
				Phasellus faucibus molestie nisl. Sed ut perspiciatis unde omnis iste natus error sit
				voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
				inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed vel lectus.
				Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Etiam ligula pede, sagittis
				quis, interdum ultricies, scelerisque eu. Nemo enim ipsam voluptatem quia voluptas sit
				aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
				voluptatem sequi nesciunt. Aliquam erat volutpat. Nulla quis diam. Mauris tincidunt sem sed
				arcu.
			</p>
			<HanddrawnLink href="https://www.zlbooking.cz/" target="_blank">Navštívit</HanddrawnLink>
		</div>
		<div class="masked-container">
			<div class="mask">
				<img bind:this={imgA} class="masked-image image-a" src={images[0]} alt="Booking band" />
				<img bind:this={imgB} class="masked-image image-b" src={images[1]} alt="Booking band" />
			</div>
			<img src="/doodles/arrow.svg" class="doodle" alt="" />
			<img src="/doodles/heart.svg" class="doodle" alt="" />
		</div>
	</div>
</SectionWrapper>

<style>
	.doodle {
		position: absolute;
		width: 120px;
		height: auto;
		pointer-events: none;
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
		width: 50%;
	}

	.lead {
		font-size: 1.6rem;
		line-height: 1.4;
	}

	.lead img {
		height: 5em;
		width: auto;
		vertical-align: -1.4em;
		margin-left: -1.5em;
	}

	.masked-container {
		width: 50%;
		aspect-ratio: 1 / 1;
		position: relative;
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
</style>
