<script>
	export let widthPx = '370px';
	export let minHeightPx = '530px';
	export let minHeightPxSm = '530px';

	let card;
	let cardInner;
	let innerCard;
	let backface;

	let flipped = false;
	let isFlipping = false;

	function calculateAngle(e) {
		if (flipped || isFlipping) return;
		if (!card || !innerCard || !backface) return;

		card.classList.add('animated');

		const rect = innerCard.getBoundingClientRect();
		const x = Math.abs(rect.x - e.clientX);
		const y = Math.abs(rect.y - e.clientY);
		const halfWidth = rect.width / 2;
		const halfHeight = rect.height / 2;

		const calcAngleX = (x - halfWidth) / 12;
		const calcAngleY = (y - halfHeight) / 28;

		const perspective = `${halfWidth * 6}px`;
		card.style.perspective = perspective;
		innerCard.style.perspective = perspective;

		innerCard.style.transform = `rotateY(${-calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.04)`;
	}

	function resetCard() {
		if (isFlipping) return;
		card.classList.remove('animated');
		innerCard.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
	}

	function flipCard() {
		isFlipping = true;
		flipped = !flipped;
		resetCard();
	}

	function onFlipTransitionEnd(e) {
		if (e.target !== cardInner || e.propertyName !== 'transform') return;
		isFlipping = false;
	}
</script>

<button
	class="card"
	bind:this={card}
	on:mouseenter={calculateAngle}
	on:mousemove={calculateAngle}
	on:mouseleave={resetCard}
	on:click={flipCard}
	on:transitionend={onFlipTransitionEnd}
	style="--width:{widthPx}; --min-height:{minHeightPx}; --min-height-sm:{minHeightPxSm}"
>
	<div class="card-inner" bind:this={cardInner} class:flipped>
		<div class="inner-card" bind:this={innerCard}>
			<div class="circle">
				<img class="exclamation" src="/icons/exclamation.svg" alt="exclamation mark icon" />
			</div>
			<slot name="inner"></slot>
		</div>
		<div class="inner-card-backface" bind:this={backface}>
			<div class="circle cross"><img src="/icons/cross.svg" alt="close icon" /></div>
			<slot name="backface"></slot>
		</div>
	</div>
</button>

<style>
	:root {
		--width: 370px;
		--min-height: 530px;
		--min-height-sm: 500px;
		--card-background: var(--card-red);
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		width: 35px;
		height: 35px;
		right: 3%;
		top: 3%;
		background-color: var(--card-background);
	}

	.exclamation {
		position: absolute;
		width: 70%;
		left: 7px;
	}

	.card {
		all: unset;

		width: var(--width);
		min-height: var(--min-height);
		height: auto;
		perspective: 1000px;
		cursor: pointer;

		transform-style: preserve-3d;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .7));
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.6s ease;
	}

	.card-inner.flipped {
		transform: rotateY(180deg);
	}

	.inner-card,
	.inner-card-backface {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: var(--card-border-radius);
		overflow: hidden;
		padding: 0.75rem;
		box-sizing: border-box;
	}

	.inner-card {
		display: flex;
		flex-direction: column;
		z-index: 2;
		background-color: var(--card-background);
	}

	.inner-card-backface {
		transform: rotateY(180deg);
		background-color: var(--card-back);
	}

	@media (max-width: 1200px) {
		.card {
			height: var(--min-height-sm);
			width: 100%;
		}
	}
</style>
