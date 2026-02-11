<script>
	import { onMount, onDestroy } from 'svelte';

	export let speed = 50; // pixels per second
	export let approximateItemWidth = 250;

	let container;
	let content;

	let repeatedCount = 1;
	let contentWidth = 1;

	let baseOffset = 0;
	let raf;
	let lastTs;

	// ---------- sizing ----------
	function recalc() {
		if (!container || !content) return;

		const containerWidth = container.offsetWidth || 1;
		repeatedCount = Math.max(3, Math.ceil((containerWidth * 3) / approximateItemWidth));
		contentWidth = content.scrollWidth / repeatedCount || 1;

		// reset offset to avoid jumps
		baseOffset = baseOffset % contentWidth;

		container.style.setProperty('--marquee-distance', `${contentWidth}px`);
	}

	let recalcScheduled = false;
	function scheduleRecalc() {
		if (recalcScheduled) return;
		recalcScheduled = true;
		requestAnimationFrame(() => {
			recalcScheduled = false;
			recalc();
		});
	}

	// ---------- animation ----------
	function animate(ts) {
		if (!lastTs) lastTs = ts;
		const dt = (ts - lastTs) / 1000; // seconds
		lastTs = ts;

		baseOffset = (baseOffset + speed * dt) % contentWidth;
		content.style.transform = `translateX(${-baseOffset}px)`;

		raf = requestAnimationFrame(animate);
	}

	function start() {
		if (!raf) {
			lastTs = null;
			raf = requestAnimationFrame(animate);
		}
	}

	function stop() {
		if (raf) cancelAnimationFrame(raf);
		raf = null;
	}

	// ---------- lifecycle ----------
	let ro;
	onMount(() => {
		requestAnimationFrame(() => {
			repeatedCount = Math.ceil((container.offsetWidth * 2) / approximateItemWidth);
			recalc();
			start();
		});

		// only need resize observer now
		ro = new ResizeObserver(scheduleRecalc);
		ro.observe(container);
	});

	onDestroy(() => {
		stop();
		ro?.disconnect();
	});
</script>

<div class="marquee">
	<div class="track" bind:this={container}>
		<div class="inner" bind:this={content} aria-hidden="true">
			{#each Array(repeatedCount) as _, i}
				<slot />
			{/each}
		</div>
	</div>
</div>

<style>
	.marquee {
		width: 100%;
		overflow-x: hidden;
		box-sizing: border-box;
	}

	.track {
		display: flex;
		position: relative;
		align-items: center;
	}

	.inner {
		display: flex;
		white-space: nowrap;
		will-change: transform; /* GPU-accelerated */
		transform: translateX(0);
	}
</style>
