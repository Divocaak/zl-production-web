<script>
	import { onMount, onDestroy } from 'svelte';

	const TRAIL_LENGTH = 10;
	const PARTICLE_COUNT = 1;
	const ALPHA_DECAY = 0.02;

	let canvas;
	let ctx;

	let mouse = { x: 0, y: 0 };
	let trail = [];
	let particles = [];

	let raf;
	let moving = false;
	let idleTimeout;

	function handleMouseMove(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;

		moving = true;

		clearTimeout(idleTimeout);
		idleTimeout = setTimeout(() => {
			moving = false; // stop adding new points
		}, 5);
	}

	function animate() {
		if (!ctx) return;

		// add current mouse to trail only if moving
		if (moving) {
			trail.unshift({ x: mouse.x, y: mouse.y, alpha: 1 });
			if (trail.length > TRAIL_LENGTH) trail.pop();
		}

		// fade trail points
		trail.forEach((p) => (p.alpha -= ALPHA_DECAY));
		trail = trail.filter((p) => p.alpha > 0);

		// clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// chalk trail
		ctx.lineCap = 'round';
		ctx.shadowBlur = 2;
		ctx.shadowColor = 'rgba(255,255,255,0.5)';

		for (let i = 0; i < trail.length - 1; i++) {
			const p1 = trail[i];
			const p2 = trail[i + 1];

			const alpha = p1.alpha * (0.4 + Math.random() * 0.6);
			const size = 2 + Math.random() * 2 * p1.alpha; // taper & jitter
			const offsetX1 = (Math.random() - 0.5) * 2;
			const offsetY1 = (Math.random() - 0.5) * 2;
			const offsetX2 = (Math.random() - 0.5) * 2;
			const offsetY2 = (Math.random() - 0.5) * 2;

			ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
			ctx.lineWidth = size;
			ctx.beginPath();
			ctx.moveTo(p1.x + offsetX1, p1.y + offsetY1);
			ctx.lineTo(p2.x + offsetX2, p2.y + offsetY2);
			ctx.stroke();

			// dust particles
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

		// update dust particles
		for (let i = particles.length - 1; i >= 0; i--) {
			const particle = particles[i];
			particle.x += particle.vx;
			particle.y += particle.vy;
			particle.alpha -= 0.01;

			if (particle.alpha <= 0) {
				particles.splice(i, 1);
				continue;
			}

			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;
			ctx.fill();
		}

		raf = requestAnimationFrame(animate);
	}

	onMount(() => {
		if (!canvas || typeof window === 'undefined') return;

		ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// only start trail when user moves the mouse
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});

		animate();
	});

	onDestroy(() => {
        if (typeof window === 'undefined') return;
		window.removeEventListener('mousemove', handleMouseMove);
		cancelAnimationFrame(raf);
	});
</script>

<canvas bind:this={canvas} class="chalk-canvas"></canvas>

<style>
	.chalk-canvas {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 999;
		mix-blend-mode: difference; /* chalk-on-dark effect */
	}
</style>
