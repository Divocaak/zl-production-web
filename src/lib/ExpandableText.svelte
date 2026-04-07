<script>
	import { onMount, tick } from 'svelte';
	import SubtleLink from './buttons/SubtleLink.svelte';

	let open = false;

	let container;
	let inner;

	let collapsedHeight = 0;
	let expandedHeight = 0;

	let children = [];

	function measureHeights() {
		if (!inner) return;

		const nodes = Array.from(inner.children);
		children = nodes;

		// EXPANDED
		nodes.forEach((el) => (el.style.display = ''));
		inner.offsetHeight;
		expandedHeight = inner.scrollHeight;

		// COLLAPSED (first 2 only)
		nodes.forEach((el, i) => (el.style.display = i < 2 ? '' : 'none'));
		inner.offsetHeight;
		collapsedHeight = inner.scrollHeight;
	}

	function applyVerticalFade() {
		const el = children[1];
		if (!el) return;

		const gradientStyle = `linear-gradient(to bottom, black 0%, transparent 100%)`;
		el.style.webkitMaskImage = gradientStyle;
		el.style.maskImage = gradientStyle;
	}

	function resetFade() {
		const el = children[1];
		if (!el) return;

		el.style.webkitMaskImage = '';
		el.style.maskImage = '';
	}

	function applyVisibility() {
		children.forEach((el, i) => (el.style.display = i < 2 ? '' : 'none'));
		resetFade();

		if (open) return;
		applyVerticalFade();
	}

	async function openPanel() {
		if (!inner) return;

		children.forEach((el) => (el.style.display = ''));
		resetFade();
		expandedHeight = inner.scrollHeight;

		open = true;
		container.style.height = `${collapsedHeight}px`;

		await tick();
		requestAnimationFrame(() => (container.style.height = `${expandedHeight}px`));
	}

	function closePanel() {
		if (!inner) return;

		children.forEach((el) => (el.style.display = ''));
		resetFade();
		container.style.height = `${expandedHeight}px`;

		requestAnimationFrame(() => {
			container.style.height = `${collapsedHeight}px`;
			open = false;
		});
	}

	function toggle() {
		open ? closePanel() : openPanel();
	}

	function onTransitionEnd() {
		if (!container) return;
		if (open) return;
		applyVisibility();
	}

	onMount(async () => {
		await tick();
		measureHeights();
		container.style.height = `${collapsedHeight}px`;
		applyVisibility();
	});
</script>

<div class="wrapper">
	<div class="content" bind:this={container} on:transitionend={onTransitionEnd}>
		<div class="inner" bind:this={inner}>
			<slot />
		</div>
	</div>

	<div class="btn-wrapper">
		{#if !open}
			<SubtleLink on:click={toggle} style="color: var(--tech-yellow)">Celý text</SubtleLink>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.content {
		overflow: hidden;
		height: 0px;
		transition: height 320ms ease;
		will-change: height;
	}

	.inner {
		display: flex;
		flex-direction: column;
	}

	.btn-wrapper {
		padding-left: 2rem;
	}

	:global(.inner > *) {
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}

	:global(.inner > *:nth-child(2)) {
		will-change: mask-image;
	}
</style>
