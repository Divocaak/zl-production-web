<script>
	import { onMount, onDestroy } from 'svelte';
	/* TODO optimalization */

	const isLowPower =
		typeof navigator !== 'undefined' &&
		navigator.hardwareConcurrency &&
		navigator.hardwareConcurrency <= 4;

	const TRAIL_LENGTH = isLowPower ? 6 : 10;
	const PARTICLE_COUNT = isLowPower ? 0 : 1;
	const ALPHA_DECAY = 0.02;
	const MAX_PARTICLES = 300;

	let canvas;
	let ctx;

	let mouse = { x: 0, y: 0 };
	let trail = [];
	let particles = [];

	let raf = null;
	let moving = false;
	let idleTimeout;
	let handleResize;

	function handleMouseMove(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;

		moving = true;

		clearTimeout(idleTimeout);
		idleTimeout = setTimeout(() => {
			moving = false;
		}, 10);

		if (!raf) raf = requestAnimationFrame(animate);
	}

	function resize() {
		if (!canvas || !ctx) return;
		const dpr = window.devicePixelRatio || 1;

		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function animate() {
		if (!ctx) return;

		let hasWork = false;

		if (moving) {
			trail.unshift({ x: mouse.x, y: mouse.y, alpha: 1 });
			if (trail.length > TRAIL_LENGTH) trail.pop();
			hasWork = true;
		}

		// fade trail in-place (no new arrays)
		for (let i = trail.length - 1; i >= 0; i--) {
			trail[i].alpha -= ALPHA_DECAY;
			if (trail[i].alpha <= 0) trail.splice(i, 1);
		}

		if (trail.length || particles.length) {
			hasWork = true;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.lineCap = 'round';
			ctx.shadowBlur = 2;
			ctx.shadowColor = 'rgba(255,255,255,0.5)';

			for (let i = 0; i < trail.length - 1; i++) {
				const p1 = trail[i];
				const p2 = trail[i + 1];

				const alpha = p1.alpha * (0.4 + Math.random() * 0.6);
				const size = 2 + Math.random() * 2 * p1.alpha;

				const ox1 = (Math.random() - 0.5) * 2;
				const oy1 = (Math.random() - 0.5) * 2;
				const ox2 = (Math.random() - 0.5) * 2;
				const oy2 = (Math.random() - 0.5) * 2;

				ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
				ctx.lineWidth = size;
				ctx.beginPath();
				ctx.moveTo(p1.x + ox1, p1.y + oy1);
				ctx.lineTo(p2.x + ox2, p2.y + oy2);
				ctx.stroke();

				for (let j = 0; j < PARTICLE_COUNT; j++) {
					particles.push({
						x: p1.x + (Math.random() - 0.5) * 10,
						y: p1.y + (Math.random() - 0.5) * 10,
						size: Math.random() * 2 + 1,
						alpha: 0.3 + Math.random() * 0.3,
						vx: (Math.random() - 0.5) * 0.5,
						vy: -Math.random() * 1
					});
				}
			}
		}

		// cap particles
		if (particles.length > MAX_PARTICLES) {
			particles.splice(0, particles.length - MAX_PARTICLES);
		}

		// update particles
		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			p.x += p.vx;
			p.y += p.vy;
			p.alpha -= 0.01;

			if (p.alpha <= 0) {
				particles.splice(i, 1);
				continue;
			}

			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
			ctx.fill();
		}

		if (hasWork) {
			raf = requestAnimationFrame(animate);
		} else {
			raf = null; // fully stop loop when idle
		}
	}

	function handleVisibility() {
		if (document.hidden && raf) {
			cancelAnimationFrame(raf);
			raf = null;
		}
	}

	onMount(() => {
		if (!canvas || typeof window === 'undefined') return;

		ctx = canvas.getContext('2d');
		resize();

		window.addEventListener('mousemove', handleMouseMove);
		handleResize = () => resize();
		window.addEventListener('resize', handleResize);
		document.addEventListener('visibilitychange', handleVisibility);
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('resize', handleResize);
		document.removeEventListener('visibilitychange', handleVisibility);
		if (raf) cancelAnimationFrame(raf);
	});
</script>

<canvas bind:this={canvas} class="chalk-canvas"></canvas>

<style>
	.chalk-canvas {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 999;
		mix-blend-mode: difference;
	}
</style>
