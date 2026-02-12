<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import HanddrawnLink from '$lib/buttons/HanddrawnLink.svelte';

	import splashSound from '$lib/assets/splashes/0.svg?raw';
	import splashLights from '$lib/assets/splashes/2.svg?raw';
	import splashVideo from '$lib/assets/splashes/1.svg?raw';

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		positionSplashes();
		window.addEventListener('resize', positionSplashes);

		const splashes = document.querySelectorAll('#equipment .splash');
		const columns = document.querySelectorAll('#equipment .section');
		const partnerLogos = document.querySelectorAll('#equipment .section img:not(:first-child)');
		const link = document.querySelector('#equipment HanddrawnLink');

		const tl = gsap.timeline({ paused: true, defaults: { duration: 0.6, ease: 'power3.out' } });
		tl.from(splashes, { scale: 0.8, opacity: 0, stagger: 0.2 });
		tl.from(columns, { y: 50, opacity: 0, stagger: 0.2 }, '-=0.4');
		tl.from(partnerLogos, { y: 20, opacity: 0, stagger: 0.1 }, '-=0.5');
		tl.from(link, { y: 20, opacity: 0 }, '-=0.3');

		ScrollTrigger.create({
			trigger: '#equipment',
			start: 'top 60%',
			onEnter: () => tl.play(),
			onLeaveBack: () => tl.reverse()
		});

		gsap.to('.splash', {
			y: 5,
			x: 5,
			repeat: -1,
			yoyo: true,
			duration: 3,
			ease: 'sine.inOut',
			stagger: 1
		});
	});

	function positionSplashes() {
		const sections = document.querySelectorAll('#equipment .section');
		const splashes = document.querySelectorAll('#equipment .splash');
		const wrapper = document.querySelector('#equipment .wrapper');
		const wrapperRect = wrapper.getBoundingClientRect();

		sections.forEach((section, i) => {
			const rect = section.getBoundingClientRect();
			const splash = splashes[i];

			const cx = rect.left + rect.width / 2 - wrapperRect.left;
			const cy = rect.top + rect.height / 2 - wrapperRect.top;

			gsap.set(splash, {
				left: cx,
				top: cy
			});
		});
	}
</script>

<section id="equipment">
	<div class="wrapper">
		<div class="splashes">
			<div data-for="0" class="splash splash-sound" style="fill: var(--tech-yellow)">
				{@html splashSound}
			</div>
			<div data-for="1" class="splash splash-lights" style="fill: var(--punch-pink)">
				{@html splashLights}
			</div>
			<div data-for="2" class="splash splash-video" style="fill: var(--stage-blue)">
				{@html splashVideo}
			</div>
		</div>

		<div class="section" data-idx="0">
			<img src="logos/equipment/zl-sound-dark.svg" alt="zl sound logo" />
			<img src="logos/equipment/partners/adamson.svg" alt="adamson logo" />
			<img src="logos/equipment/partners/digico.svg" alt="digico logo" />
			<img src="logos/equipment/partners/shure.svg" alt="shure logo" />
			<img src="logos/equipment/partners/yamaha.svg" alt="yamaha logo" />
		</div>

		<div class="section" data-idx="1">
			<img src="logos/equipment/zl-lights-dark.svg" alt="zl lights logo" />
			<img src="logos/equipment/partners/chamsys.svg" alt="chamsys logo" />
			<img src="logos/equipment/partners/robe.svg" alt="robe logo" />
			<img src="logos/equipment/partners/ma.svg" alt="ma logo" />
			<img src="logos/equipment/partners/astera.svg" alt="astera logo" />
		</div>

		<div class="section" data-idx="2">
			<img src="logos/equipment/zl-video-dark.svg" alt="zl video logo" />
			<img src="logos/equipment/partners/blackmagic.svg" alt="blackmagic logo" />
			<img src="logos/equipment/partners/novastar.svg" alt="novastar logo" />
		</div>
	</div>

	<HanddrawnLink href="">Rent</HanddrawnLink>
</section>

<style>
	#equipment {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;

		gap: 3rem;
	}

	.wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.splashes {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
	}

	.splash {
		position: absolute;
		width: 200%;
		height: 200%;
		transform: translate(-50%, -50%);
	}

	.section {
		position: relative;
		z-index: 10;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.section img {
		position: relative;
		z-index: 10;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.section img:first-child {
		width: auto;
		height: 3rem;
		padding-bottom: 2rem;
	}

	.section img:not(:first-child) {
		width: auto;
		height: 48px;
	}
</style>
