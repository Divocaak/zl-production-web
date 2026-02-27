<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import Hls from 'hls.js';

	export let src;
	export let poster;

	let overlay;

	const dispatch = createEventDispatcher();
	let video;
	let hls;
	let playing = false;
	let progress = 0;
	let duration = 0;
	let interval;

	function initVideo() {
		if (!video) return;

		hls?.destroy();

		if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src;
			video.load();
		} else if (Hls.isSupported()) {
			hls = new Hls({ enableWorker: true, maxBufferLength: 30 });
			hls.loadSource(src);
			hls.attachMedia(video);

			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				duration = video.duration || 0;
			});
		}

		clearInterval(interval);
		interval = setInterval(() => {
			if (video.duration) {
				progress = video.currentTime;
				duration = video.duration;
			}
		}, 100);
	}

	function togglePlay() {
		if (!video) return;
		if (video.paused) {
			video.play();
			playing = true;
		} else {
			video.pause();
			playing = false;
		}
	}

	let volume = 1;
	let lastVolume = 1;
	let muted = false;

	function formatTime(time) {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60)
			.toString()
			.padStart(2, '0');
		return `${minutes}:${seconds}`;
	}

	function changeVolume(e) {
		if (!video) return;
		video.volume = +e.target.value;
		volume = video.volume;
		lastVolume = video.volume;
		if (volume === 0) muted = true;
		else muted = false;
	}

	function toggleMute() {
		if (!video) return;
		let toMute = volume > 0;
		video.volume = volume = toMute ? 0 : lastVolume;
		muted = toMute;
	}

	function toggleFullscreen() {
		if (!video) return;
		if (!document.fullscreenElement) {
			video.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}

	function seek(e) {
		if (!video) return;
		video.currentTime = +e.target.value;
	}

	function closeModal() {
		dispatch('close');
		if (window.__smoother) window.__smoother.paused(false);
	}

	onMount(() => {
		initVideo();

		const y = window.__smoother ? window.__smoother.scrollTop() : window.scrollY;
		overlay.style.top = `${y}px`;

		if (window.__smoother) window.__smoother.paused(true);
	});

	onDestroy(() => {
		hls?.destroy();
		video?.pause();
		clearInterval(interval);
		if (window.__smoother) window.__smoother.paused(false);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div bind:this={overlay} class="overlay" on:click={closeModal}>
	<div class="modal" on:click|stopPropagation>
		<video
			bind:this={video}
			playsinline
			preload="metadata"
			{poster}
			on:click={togglePlay}
			on:loadedmetadata={() => (duration = video.duration)}
		></video>

		<div class="controls">
			<button on:click={togglePlay} class="play-btn">{playing ? '❚❚' : '▶️'}</button>
			<div class="volume-container">
				<div class="volume-wrapper">
					<button class="mute-btn" on:click={toggleMute}>
						{muted ? '🔇' : '🔊'}
					</button>
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						bind:value={volume}
						on:input={changeVolume}
						class="volume-slider"
					/>
				</div>
			</div>
			<span class="time">{formatTime(progress)}/{formatTime(duration)}</span>
			<input
				type="range"
				min="0"
				max={duration}
				step="0.1"
				bind:value={progress}
				on:input={seek}
				class="seek"
			/>
			<button on:click={toggleFullscreen}>⛶</button>
			<button on:click={closeModal}>✕</button>
		</div>
	</div>
</div>

<style>
	.overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);

		display: flex;
		justify-content: center;
		align-items: center;

		z-index: 9999;

		height: 100vh;

		overflow: hidden;
	}

	.modal {
		width: min(90vw, 960px);
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	video {
		width: 100%;
		height: auto;
		display: block;
		cursor: pointer;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: rgba(17, 17, 17, 0.95);
	}

	.controls .seek {
		flex: 1;
	}

	.controls button:last-child {
		background: none;
		border: none;
		font-size: 1.25rem;
		cursor: pointer;
	}

	.controls .time {
		font-size: 0.9rem;
		text-align: center;
	}

	.volume-container {
		position: relative;
		display: flex;
		align-items: center;
		width: auto;
		height: 40px;
	}

	.volume-wrapper {
		display: flex;
		align-items: center;
		overflow: hidden;
		width: auto;
		transition: all 0.3s ease;
	}

	.volume-slider {
		width: 0;
		height: 6px;
		border-radius: 3px;
		cursor: pointer;
		transition: all 0.3s ease;
		opacity: 0;
	}

	.volume-wrapper:hover .volume-slider {
		width: 80px;
		opacity: 1;
	}

	.mute-btn {
		background: none;
		border: none;
		font-size: 1.2rem;
		cursor: pointer;
	}

	/* global */
	input[type='range'] {
		--track-bg: var(--grey);
		--track-fill: var(--zl-red);

		-webkit-appearance: none;
		appearance: none;
		height: 4px;
		background: transparent;
		cursor: pointer;

		overflow: hidden;
		border-radius: 999px;
	}

	/* track */
	/* webkit */
	input[type='range']::-webkit-slider-runnable-track {
		height: 4px;
		background: var(--track-bg);
		border-radius: 999px;
	}

	/* firefox */
	input[type='range']::-moz-range-track {
		height: 4px;
		background: var(--track-bg);
		border-radius: 999px;
	}

	/* progress */
	/* webkit */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 0;
		height: 0;
		border: none;
		box-shadow: -1000px 0 0 1000px var(--track-fill);
	}

	/* firefox */
	input[type='range']::-moz-range-progress {
		height: 4px;
		background: var(--track-fill);
		border-radius: 999px;
	}

	/* hide thumb firefox */
	input[type='range']::-moz-range-thumb {
		width: 0;
		height: 0;
		border: none;
		background: transparent;
	}

	/* global interactions */
	input[type='range']:hover {
		--track-bg: var(--grey-lighter);
	}

	input[type='range']:active {
		--track-fill: var(--tech-yellow);
	}
</style>
