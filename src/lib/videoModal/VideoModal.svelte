<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import Hls from 'hls.js';
	import Portal from 'svelte-portal';

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
		togglePlay();
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
<Portal>
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

			<button on:click={togglePlay} class="controls-hide btn play-btn">
				{#if !playing}
					<img src="/icons/play.svg" alt="play icon" />
				{:else}
					<img src="/icons/pause.svg" alt="pause icon" />
				{/if}
			</button>
			<button on:click={closeModal} class="controls-hide btn close-btn">
				<img src="/icons/close.svg" alt="close icon" />
			</button>
			<div class="controls controls-hide">
				<div class="volume-container">
					<div class="volume-wrapper">
						<button class="btn mute-btn" on:click={toggleMute}>
							{#if muted}
								<img src="/icons/sound-off.svg" alt="muted icon" />
							{:else}
								<img src="/icons/sound-on.svg" alt="with sound icon" />
							{/if}
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
				<button class="btn fullscreen-btn" on:click={toggleFullscreen}>
					<img src="/icons/fullscreen.svg" alt="fullscreen icon" />
				</button>
			</div>
		</div>
	</div>
</Portal>

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
		position: relative;
		width: min(90vw, 960px);
		border-radius: 12px;
		overflow: hidden;
	}

	video {
		width: 100%;
		height: auto;
		display: block;
		cursor: pointer;
	}

	.btn {
		all: unset;
		cursor: pointer;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 1));
		transition: all 0.25s ease;
	}

	.controls-hide {
		opacity: 0;
		transition: all 0.25s ease;
	}

	.modal:hover .controls-hide {
		opacity: 1;
	}

	.btn:hover {
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))
			drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
		transform: scale(1.2) rotate(2deg);
	}

	.play-btn:hover {
		transform: translate(-50%, -50%) scale(1.2) rotate(2deg);
	}

	.play-btn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 80px;
		height: 80px;
	}

	.close-btn {
		position: absolute;
		top: 12px;
		right: 12px;

		width: 50px;
		height: 50px;
	}

	.mute-btn,
	.fullscreen-btn {
		width: 25px;
		height: 25px;
	}

	.mute-btn {
		padding-right: 5px;
	}

	.controls {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;

		padding: 0.75rem 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;

		background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
	}

	.controls .seek {
		flex: 1;
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
