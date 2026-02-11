<script>
	import { onMount, onDestroy } from 'svelte';
	import Marquee from '$lib/Marquee.svelte';
	import overlaySvgRaw from '$lib/assets/splashes/2.svg?raw';
	import LogoHeading from '$lib/LogoHeading.svelte';

	const images = [
		'/studio/0.jpg',
		'/studio/1.jpg',
		'/studio/2.jpg',
		'/studio/3.jpg',
		'/studio/4.jpg',
		'/studio/5.jpg',
		'/studio/6.jpg'
	];
</script>

<div class="marquee-wrapper">
	<Marquee speed={50} approximateItemWidth={300}>
		{#each images as img, i}
			<img src={img} class="marquee-item" alt="Studio image {i}" />
		{/each}
	</Marquee>

	<div class="marquee-overlay">
			{@html overlaySvgRaw}
		<div class="content">
			<LogoHeading src="logos/zl-studio-dark.svg" alt="ZL Studio Logo" />
            <p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis sapien nunc, commodo et,
				interdum suscipit, sollicitudin et, dolor. Integer malesuada. Donec vitae arcu. Nullam eget
				nisl. Praesent vitae arcu tempor neque lacinia pretium. Curabitur sagittis hendrerit ante.
				Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
				nisi ut aliquid ex ea commodi consequatur? Fusce dui leo, imperdiet in, aliquam sit amet,
				feugiat eu, orci. Etiam dictum tincidunt diam. Donec vitae arcu. Duis sapien nunc, commodo
				et, interdum suscipit, sollicitudin et, dolor. Cras elementum. Nulla pulvinar eleifend sem.
				Fusce tellus odio, dapibus id fermentum quis, suscipit id erat.
			</p>
			<LogoHeading src="logos/zl-basecamp-dark.svg" alt="#ZLBaseCamp Logo" />
		</div>
	</div>
</div>

<style>
	.marquee-wrapper {
		position: relative;
		/* overflow: hidden; */

		display: flex;
		flex-direction: column;
		justify-content: center;

		height: 100vh;
	}

	.marquee-item {
		aspect-ratio: 16/9;
		object-fit: cover;
		flex-shrink: 0;

		pointer-events: none;
		user-select: none;
	}

	.marquee-overlay {
		position: absolute;
		inset: 0;

		pointer-events: none;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	:global(.marquee-overlay svg) {
		position: absolute;
		top: 0;
		left: -6%;
		width: 110%;
		height: 110%;
		z-index: 0;
		fill: var(--stage-blue);

	}

	.content {
		position: relative;
		z-index: 1;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
		
	}

    .content p{
        padding: 0 5rem;
    }
</style>
