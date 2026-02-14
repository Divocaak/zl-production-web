<!-- TODO PAGE reference -->
<!-- 3 columns on desktop, each column with different scroll speed, mixed text references (optional picture, name, text, event label, optional year), videos and images (keep aspect ratio!) -->
<!-- TODO remove background effect (one more layout, _designed_ with and one without) -->

<script>
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	/* import TextReference from '$lib/TextReference.svelte'; */

	let columns;
	const columnData = [
		{
			items: [
				{ type: 'image', src: '/videos/thumb1.jpg', link: '/video/1' },
				{ type: 'text', content: 'Some reference text 1' },
				{ type: 'image', src: '/images/img1.jpg' }
			],
			speed: 0.3,
			direction: 1
		},
		{
			items: [
				{ type: 'image', src: '/videos/thumb2.jpg', link: '/video/2' },
				{ type: 'text', content: 'Some reference text 2' },
				{ type: 'image', src: '/images/img2.jpg' }
			],
			speed: 0.2,
			direction: -1
		},
		{
			items: [
				{ type: 'image', src: '/videos/thumb3.jpg', link: '/video/3' },
				{ type: 'text', content: 'Some reference text 3' },
				{ type: 'image', src: '/images/img3.jpg' }
			],
			speed: 0.4,
			direction: 1
		}
	];

	onMount(() => {
		const columnEls = columns.children;

		Array.from(columnEls).forEach((col, i) => {
			const { speed, direction } = columnData[i];

			gsap.to(col, {
				yPercent: direction * 100 * speed,
				ease: 'none',
				scrollTrigger: {
					trigger: col,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		});
	});

	onDestroy(() => {
		ScrollTrigger.getAll().forEach((t) => t.kill());
	});
</script>

<section class="three-columns" bind:this={columns}>
	{#each columnData as column}
		<div class="column">
			{#each column.items as item}
				{#if item.type === 'image'}
					{#if item.link}
						<a href={item.link} class="image-wrapper">
							<img src={item.src} alt="" />
							<svg class="play-icon" viewBox="0 0 64 64">
								<polygon points="16,12 52,32 16,52" fill="white" />
							</svg>
						</a>
					{:else}
						<div class="image-wrapper">
							<img src={item.src} alt="" />
						</div>
					{/if}
				{:else if item.type === 'text'}
					{item.content}
					<!-- <TextReference>{item.content}</TextReference> -->
				{/if}
			{/each}
		</div>
	{/each}
</section>

<style>
	.three-columns {
		display: flex;
		gap: 2rem;
		width: 100%;
		padding: 2rem;
		box-sizing: border-box;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9; /* keep 16/9 ratio */
		overflow: hidden;
		border-radius: 6px;
		cursor: pointer;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.3s ease;
	}

	.image-wrapper:hover img {
		transform: scale(1.05); /* subtle hover zoom */
	}

	.play-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 2rem;
		height: 2rem;
		pointer-events: none;
		opacity: 0.8;
	}

	@media (max-width: 1024px) {
		.three-columns {
			flex-direction: column;
		}

		.column {
			width: 100%;
		}
	}
</style>
