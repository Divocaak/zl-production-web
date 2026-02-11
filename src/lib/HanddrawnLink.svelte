<script>
	export let href = '#';
	export let target = "_self";
	export let inverted = false;

	let textEl;
	let svgEl;

	const paddingX = 20;
	const paddingY = 15;
	const originalSvgWidth = 76;
	const originalSvgHeight = 36;

	$: if (textEl && svgEl) {
		const textWidth = textEl.offsetWidth + paddingX * 2;
		const textHeight = textEl.offsetHeight + paddingY * 2;

		const scaleX = textWidth / originalSvgWidth;
		const scaleY = textHeight / originalSvgHeight;

		svgEl.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;
	}
</script>

<a {href} {target} class="handdrawn-link" style="--base: {inverted ? "var(--tech-yellow)" : "var(--zl-red)"};">
	<span bind:this={textEl}><slot></slot></span>
	<svg viewBox="0 0 70 36" bind:this={svgEl}>
		<path
			d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527"
		/>
	</svg>
</a>

<style>
	:root{
		--base: var(--zl-red);
	}

	.handdrawn-link {
		position: relative;
		display: inline-block;

		font-weight: bold;
		text-decoration: none;
		text-transform: uppercase;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
		font-size: var(--text-36);
		color: var(--base);

		transition: transform 0.25s;

		text-align: center;
	}

	.handdrawn-link span {
		position: relative;
		z-index: 1;
		display: inline-block;
	}

	.handdrawn-link svg {
		position: absolute;
		width: 76px;
		height: 36px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) scale(1, 1);
		transform-origin: center center;

		fill: none;
		stroke: var(--stroke, transparent);
		stroke-linecap: round;
		stroke-width: 2px;
		stroke-dasharray: var(--offset, 69px) 278px;
		stroke-dashoffset: 361px;
		transition:
			stroke 0.25s ease var(--stroke-delay, 0s),
			stroke-dasharray 0.5s,
			transform 0.25s ease;
	}

	.handdrawn-link:hover {
		--stroke: var(--tech-yellow);
		--stroke-delay: 0.1s;
		--offset: 180px;
		transform: rotate(2deg) scale(1.05);
	}
</style>
