<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let src;
	export let alt = '';
	export let imageEl;
	export let widthPercent = 100;

	/* effects */
	export let parallax = false;
	export let floating = false;

	/* tuning */
	export let parallaxDistance = 80;
	export let floatXStrength = 3;
	export let floatYStrength = 4;
	export let floatSpeedX = 0.6;
	export let floatSpeedY = 0.8;

	let containerEl;

	let scrollY = 0;
	let floatX = 0;
	let floatY = 0;

	let setX, setY;
	let floatAnim;
	let scrollTrigger;

	const applyTransform = () => {
		setX(floatX);
		setY(scrollY + floatY);
	};

	onMount(() => {
		if (!imageEl || !containerEl) return;

		setX = gsap.quickSetter(imageEl, 'x', 'px');
		setY = gsap.quickSetter(imageEl, 'y', 'px');

		/* ---------- FLOATING ---------- */
		if (floating) {
			floatAnim = gsap.to(
				{},
				{
					duration: 12,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut',
					paused: true,
					onUpdate: () => {
						floatY = Math.sin(gsap.ticker.time * floatSpeedY) * floatYStrength;
						floatX = Math.cos(gsap.ticker.time * floatSpeedX) * floatXStrength;
						applyTransform();
					}
				}
			);
		}

		/* ---------- PARALLAX ---------- */
		if (parallax) {
			scrollTrigger = ScrollTrigger.create({
				trigger: containerEl,
				start: 'top bottom',
				end: 'bottom top',
				onEnter: () => floating && floatAnim?.play(),
				onLeave: () => floating && floatAnim?.pause(),
				onEnterBack: () => floating && floatAnim?.play(),
				onLeaveBack: () => floating && floatAnim?.pause(),
				onUpdate: (self) => {
					scrollY = gsap.utils.interpolate(0, -parallaxDistance, self.progress);
					applyTransform();
				}
			});
		} else if (floating) {
			floatAnim.play();
		}
	});

	onDestroy(() => {
		floatAnim?.kill();
		scrollTrigger?.kill();
	});
</script>

<div class="masked-container" style="--width: {widthPercent}%" bind:this={containerEl}>
	<div class="mask">
		<img bind:this={imageEl} class="masked-image" {src} {alt} />
	</div>
	<slot />
</div>

<style>
	:root {
		--width: 100%;
	}

	.masked-container {
		aspect-ratio: 1 / 1;
		position: relative;
		width: var(--width);
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));

		margin: 0 auto;
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
		inset: 0;
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center;

		will-change: transform;
		transform: translateZ(0);
	}
</style>
